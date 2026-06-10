// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-params */

import { createPopper } from "@popperjs/core";

// build the component class
const popoverOffsetDistance = 18;
const popoverOffsetSkidding = 0;

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

    // Promote the bubble to the top layer before Popper measures. Top-layer
    // items have viewport as their containing block regardless of any
    // transformed ancestor — without this, Popper's parentNode walk stops at
    // the first shadow boundary it can't cross and falls back to viewport
    // origin, while the browser anchors the bubble to a transformed ancestor
    // it found via the flat tree. The mismatch is what shifted the bubble in
    // auro-drawer (issue #130).
    if (
      this.popover.isConnected &&
      typeof this.popover.showPopover === "function" &&
      !this.popover.matches(":popover-open")
    ) {
      this.popover.showPopover();
    }

    this.popper = createPopper(this.anchor, this.popover, {
      tooltip: this.anchor,
      placement: this.options.placement,
      // The bubble is in the top layer (see showPopover above), so its
      // containing block is the viewport regardless of any ancestor's
      // transform. `strategy: "fixed"` makes Popper write viewport-relative
      // coordinates to match.
      strategy: "fixed",
      modifiers: [
        {
          // Popper computes the reference rect in the popper's offsetParent
          // coords; when the popper has a transformed ancestor it can reach
          // via parentNode, that ancestor becomes the offsetParent — but the
          // top-layer bubble's actual containing block is the viewport, not
          // that ancestor. Override the reference rect to viewport coords so
          // popperOffsets writes coordinates the browser will interpret the
          // same way. Skipped when :popover-open is unavailable so older
          // browsers fall back to today's behavior.
          name: "viewportReferenceForTopLayer",
          phase: "beforeRead",
          enabled: true,
          fn: ({ state }) => {
            const popper = state.elements.popper;
            if (
              typeof popper.matches !== "function" ||
              !popper.matches(":popover-open")
            ) {
              return;
            }
            const r = state.elements.reference.getBoundingClientRect();
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
      this.popover.matches(":popover-open")
    ) {
      this.popover.hidePopover();
    }
    this.popover.classList.remove(this.options.visibleClass);
  }
}
