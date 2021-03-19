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
 * @attr {boolean} sticky - If true, popover will persist its visibility when clicked.
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
      this.toggleShow();
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
      for:        { type: String },
      sticky:     { type: Boolean }
    };
  }

  static get styles() {
    return css`
      ${styleCss},
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.documentClickHandler = (event) => {
      const path = event.composedPath();

      // if user clicks on something other than trigger or popover, close popover
      if (this.isPopoverVisible && !path.includes(this.trigger) && !path.includes(this.popover)) {
        this.toggleHide();
      }
    };

    document.addEventListener('click', this.documentClickHandler);
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
    handleTabWhenFocusOnTrigger = (event) => {
      if (event.key.toLowerCase() === 'tab') {
        this.toggleHide();
      }
    };

    if (!this.sticky) {
      this.trigger.addEventListener('touchstart', handleShow);
    }

    if (this.sticky) {
      this.trigger.addEventListener('click', handleShow);
    } else {

      const element = this.trigger.parentElement.nodeName === 'AURO-POPOVER' ? this : this.trigger;

      element.addEventListener('mouseenter', handleShow);
      element.addEventListener('mouseleave', handleHide);
    }

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener('keydown', handleTabWhenFocusOnTrigger);

    // e.g. for a closePopover button in the popover
    this.addEventListener('hidePopover', handleHide);
  }

  /**
    * For use with `sticky` property, call method on click event
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
    this.setAttribute('data-show', '');
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <slot role="tooltip"></slot>
      </div>

      <slot name="trigger"></slot>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopover);
}
