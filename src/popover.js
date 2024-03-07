// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable max-params */

import { createPopper } from '@popperjs/core/dist/esm/popper';

// build the component class
const popoverOffsetDistance = 18,
  popoverOffsetSkidding = 0;

export default class Popover {

  constructor(anchor, popover, placement, boundary) {
    this.anchor = anchor;
    this.popover = popover;
    this.boundaryElement = this.setBoundary(boundary);
    this.options = {
      placement,
      visibleClass: 'data-show'
    };
    this.popover.classList.remove(this.options.visibleClass);
  }

  setBoundary(boundary) {
    if (typeof boundary === 'string') {
      return document.querySelector(boundary) || document.body;
    }

    return boundary || document.body;
  }

  show() {
    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = createPopper(this.anchor, this.popover, {
      tooltip: this.anchor,
      placement: this.options.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [
              popoverOffsetSkidding,
              popoverOffsetDistance
            ]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            mainAxis: true,
            boundary: this.boundaryElement,
            rootBoundary: 'document',
            padding: 16,
          }
        },
      ]
    });
  }

  triggerUpdate() {
    this.popper.update();
  }

  hide() {
    this.popover.classList.remove(this.options.visibleClass);
  }
}
