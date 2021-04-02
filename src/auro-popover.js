// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import Popover from "./popover";

/**
 * Popover attaches to an element and displays on hover/blur.
 *
 * @attr {String} placement - Expects top/bottom - position for popover in relation to the element.
 * @attr {String} for - Defines an `id` for an element in the DOM to trigger on hover/blur.
 * @attr {boolean} addSpace - If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger..
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - Slot for entering the trigger element into the scope of the shadow DOM
 */
class AuroPopover extends LitElement {
  constructor() {
    super();

    this.privateDefaults();

    this.placement = 'top';

    // adds toggle function to root element based on touch
    this.addEventListener('touchstart', function() {
      this.toggle();
      this.setAttribute("isTouch", "true");
    });
  }

  /**
   * @private internal defaults
   * @returns {void}
   */
  privateDefaults() {
    this.isPopoverVisible = false;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      placement:  { type: String },
      for:        { type: String }
    };
  }

  static get styles() {
    return css`
      ${styleCss},
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClickHandler)
  }

  firstUpdated() {
    this.trigger = document.querySelector(`#${this.for}`);
    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    const handleShow = () => {
      this.toggleShow();
    },
    handleHide = () => {
      this.toggleHide();
    },
    handleKeyboardWhenFocusOnTrigger = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === 'tab' || key === 'escape') {
          this.toggleHide();
        }
      }

      if (key === ' ' || key === 'enter') {
        this.toggle();
      }
    },
    element = this.trigger.parentElement.nodeName === 'AURO-POPOVER' ? this : this.trigger;

    element.addEventListener('mouseenter', handleShow);
    element.addEventListener('mouseleave', handleHide);

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener('keydown', handleKeyboardWhenFocusOnTrigger);

    // handle gain/loss of focus
    this.trigger.addEventListener('focus', handleShow);
    this.trigger.addEventListener('blur', handleHide);

    // e.g. for a closePopover button in the popover
    this.addEventListener('hidePopover', handleHide);
  }

  /**
    * @private Toggles the display of the popover content
    * @returns {Void} Fires an update lifecycle.
  */
  toggle() {
    if (this.isPopoverVisible) {
      this.toggleHide();
    } else {
      this.toggleShow();
    }
  }

  /**
   * @private Hides the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleHide() {
    this.popper.hide();
    this.isPopoverVisible = false;
    this.removeAttribute('data-show');
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    this.popper.show();
    this.isPopoverVisible = true;
    this.setAttribute('data-show', true);
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg" aria-live="polite">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <slot role="tooltip"></slot>
      </div>

      <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopover);
}
