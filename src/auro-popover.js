// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import {createPopper} from '@popperjs/core';

// build the component class
const POPOVER_OFFSET_MIN = 0;
const POPOVER_OFFSET_MAX = 18;

class AuroPopover extends LitElement {

  // function to define props used within the scope of this component
  static get properties() {
    return {
      placement:  { type: String },
      for:        { type: String },
      tooltip:    { type: Object }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  firstUpdated() {
    const button = document.querySelector(`#${this.for}`),
      popper = createPopper(button, tooltip, {
        tooltip = this.shadowRoot.querySelector('#tooltip'),
        placement: this.placement,
        modifiers: [
        {
          name: 'offset',
          options: {
            offset: [POPOVER_OFFSET_MIN,POPOVER_OFFSET_MAX],
          },
        },
      ],
    });

    function show() {
      popper.update();
      tooltip.setAttribute('data-show', '');
    }

    function hide() {
      popper.update();
      tooltip.removeAttribute('data-show');
    }

    const showEvents = ['mouseenter', 'focus'],
     hideEvents = ['mouseleave','blur'];

    showEvents.forEach((event) => {
      button.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
      button.addEventListener(event, hide);
    });
  }


  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="tooltip tooltip-open util_insetLg--squish">
        <div id="tooltip" role="tooltip">
          <slot></slot>
          <div id="arrow" data-popper-arrow></div>
        </div>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopover);
}
