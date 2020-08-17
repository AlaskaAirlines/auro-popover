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
 * @attr {String} placement - Expects top/bottom - default position for popover in relation to the element.
 * @attr {String} for - Defines an id for an element in the DOM to trigger on hover/blur.
 */
class AuroPopover extends LitElement {
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
    document.querySelector(`#${this.for}`).parentElement.appendChild(this.patchBuildless());

    const button = document.querySelector(`#${this.for}`),
     element = this.shadowRoot.querySelector('#popover'),
     hideEvents = [
      'mouseleave',
      'blur'
      ],
     popper = new Popover(button, element, this.placement),
     showEvents = [
      'mouseenter',
      'focus'
      ],

    /**
     * Hides the popover
     * @returns {Void} Fires an update lifecycle.
     */
    toggleHide = function() {
      element.removeAttribute('data-show');
      popper.hide();
    },

    /**
     * Shows the popover
     * @returns {Void} Fires an update lifecycle.
     */
     toggleShow = function() {
      element.setAttribute('data-show', '');
      popper.show();
    };

    showEvents.forEach((event) => {
      button.addEventListener(event, toggleShow);
    });

    hideEvents.forEach((event) => {
      button.addEventListener(event, toggleHide);
    });

  }


  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg" role="alert">
        <slot></slot>
        <div id="arrow" class="arrow" data-popper-arrow></div>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopover);
}
