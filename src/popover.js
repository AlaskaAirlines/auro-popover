// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { createPopper } from '@popperjs/core';

// build the component class
const POPOVER_OFFSET_MAX = 18,
 POPOVER_OFFSET_MIN = 0;

export default class Popover {

    constructor(anchor, popover, placement) {
        this.anchor = anchor;
        this.popover = popover;
        this.options = {placement,
            visibleClass: 'data-show'};
        this.popover.classList.remove(this.options.visibleClass);
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
                        POPOVER_OFFSET_MIN,
                        POPOVER_OFFSET_MAX
                    ]
                }
            }
        ]
        })
    }

    triggerUpdate() {
        this.popper.update();
    }

    hide() {
        this.popover.classList.remove(this.options.visibleClass);
    }
}
