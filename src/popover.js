// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-params */

import { createPopper } from "@popperjs/core";

// build the component class
const popoverOffsetDistance = 18;
const popoverOffsetSkidding = 0;

/**
 * Whether `el` is currently in the top layer via the native popover API.
 * Gated on `showPopover` (spec-paired with `:popover-open`) plus try/catch
 * for older selector parsers that reject the unknown pseudo-class.
 * @param {Element | null | undefined} el
 * @returns {boolean}
 */
function isTopLayerOpen(el) {
  if (!el || typeof el.showPopover !== "function") {
    return false;
  }
  try {
    return el.matches(":popover-open");
  } catch {
    return false;
  }
}

export default class Popover {
  constructor(anchor, popover, placement, boundary) {
    this.anchor = anchor;
    this.popover = popover;
    this.boundaryElement = this.setBoundary(boundary);
    this.options = {
      placement,
      visibleClass: "data-show",
    };
    this.popover.classList.remove(this.options.visibleClass);
  }

  setBoundary(boundary) {
    if (typeof boundary === "string") {
      return document.querySelector(boundary) || document.body;
    }

    return boundary || document.body;
  }

  show() {
    if (this.popper) {
      this.popper.destroy();
    }

    // Promote to the top layer so the containing block is the viewport,
    // sidestepping transformed ancestors Popper's parentNode walk can't
    // reach across shadow boundaries.
    if (
      this.popover.isConnected &&
      typeof this.popover.showPopover === "function" &&
      !isTopLayerOpen(this.popover)
    ) {
      this.popover.showPopover();
    }

    this.popper = createPopper(this.anchor, this.popover, {
      tooltip: this.anchor,
      placement: this.options.placement,
      // Match the top-layer viewport containing block when the bubble is
      // promoted; otherwise leave Popper on its default to preserve legacy
      // positioning on browsers without the popover API.
      strategy:
        typeof this.popover.showPopover === "function" ? "fixed" : "absolute",
      modifiers: [
        {
          // Override Popper's offsetParent-relative reference rect with
          // viewport coords so the math agrees with the top-layer bubble's
          // viewport containing block when a transformed ancestor is reachable.
          name: "viewportReferenceForTopLayer",
          phase: "beforeRead",
          enabled: true,
          fn: ({ state }) => {
            if (!isTopLayerOpen(state.elements.popper)) {
              return;
            }
            const reference = state.elements.reference;
            if (!reference || typeof reference.getBoundingClientRect !== "function") {
              return;
            }
            const r = reference.getBoundingClientRect();
            state.rects.reference = {
              x: r.left,
              y: r.top,
              width: r.width,
              height: r.height,
            };
          },
        },
        {
          name: "offset",
          options: {
            offset: [popoverOffsetSkidding, popoverOffsetDistance],
          },
        },
        {
          name: "preventOverflow",
          options: {
            mainAxis: true,
            boundary: this.boundaryElement,
            rootBoundary: "document",
            padding: 16,
          },
        },
      ],
    });
  }

  triggerUpdate() {
    this.popper.update();
  }

  hide() {
    if (
      this.popover.isConnected &&
      typeof this.popover.hidePopover === "function" &&
      isTopLayerOpen(this.popover)
    ) {
      this.popover.hidePopover();
    }
    this.popover.classList.remove(this.options.visibleClass);
  }
}
