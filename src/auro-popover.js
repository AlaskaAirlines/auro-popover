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
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - Slot for entering the trigger element into the scope of the shadow DOM
 */
class AuroPopover extends LitElement {
  constructor() {
    super();
    this.placement = 'top';
    this.isModalVisible = false;
    this.isSticky = this.hasAttribute('sticky');
  }

  // function to define props used within the scope of this component
  static get properties() {

    return {
      placement:  { type: String },
      for:        { type: String },
    };
  }

  static get styles() {
    return css`
      ${styleCss},
    `;
  }

  /**
   * @private Internal method for managing buildless environment variable
   * @returns {Void} Fires an update lifecycle.
   */
  patchBuildless() {
    // patch for buildless environments
    const code = 'var process = {env: {}};',
    script = document.createElement('script');

    script.type = 'text/javascript';
    try {
      script.appendChild(document.createTextNode(code));
    } catch (err) {
      script.text = code;
    }

    return script;
  }

  firstUpdated() {
    // needs to eval before Popover instantiation
    let trigger = {};

    try {
      document.querySelector(`#${this.for}`).parentElement.appendChild(this.patchBuildless());
      trigger = document.querySelector(`#${this.for}`);
    } catch (err) {
      this.querySelector(`#${this.for}`).appendChild(this.patchBuildless());
      trigger = this.querySelector(`#${this.for}`);
    }

    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(trigger, this.popover, this.placement);

      /**
      * Hides the popover
      * @returns {Void} Fires an update lifecycle.
      */
      const toggleHide = () => {
        this.popover.removeAttribute('data-show');
        this.popper.hide();
        this.isModalVisible = false;
      },

      /**
       * Shows the popover
       * @returns {Void} Fires an update lifecycle.
       */
      toggleShow = () => {
        this.popover.setAttribute('data-show', '');
        this.popper.show();
        this.isModalVisible = true;
      },

      /**
       * Click handler on non-trigger non-popovers
       * @param {Event} event event
       * @returns {Void} Fires an update lifecycle
       */
      handleClickNonTriggerNonPopover = (event) => {
        const path = event.composedPath();

        if (this.isModalVisible && !path.includes(trigger) && !path.includes(this.popover)) {
          toggleHide();
        }
      },

      /**
       * Click handler focus-trigger
       * @param {Event} event event
       * @returns {Void} Fires an update lifecycle
       */
      handleTabWhenFocusOnTrigger = (event) => {
        if (event.key.toLowerCase() === 'tab') {
          toggleHide();
        }
      };

    if (this.isSticky) {
      trigger.addEventListener('click', toggleShow);
      trigger.addEventListener('focus', toggleShow);
    } else {
      trigger.addEventListener('mouseenter', toggleShow);
      trigger.addEventListener('mouseleave', toggleHide);
    }

    // if user tabs off of trigger, then hide the popover.
    trigger.addEventListener('keydown', handleTabWhenFocusOnTrigger);

    // e.g. for a closePopover button in the popover
    this.addEventListener('hidePopover', toggleHide);

    // if user clicks on something other than trigger or popover, close popover
    document.addEventListener('click', handleClickNonTriggerNonPopover);
  }

  /**
    * Toggles the popover's open state
    * @returns {Void} Fires an update lifecycle.
  */
  toggle() {
    if (this.popover.hasAttribute('data-show')) {
      this.popover.removeAttribute('data-show');
      this.popper.hide();
      this.isModalVisible = false;
    } else {
      this.popover.setAttribute('data-show', '');
      this.popper.show();
      this.isModalVisible = true;
    }
  }


  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <slot name="tooltip"></slot>
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
