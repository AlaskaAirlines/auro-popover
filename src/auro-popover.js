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
    const tooltip = this.shadowRoot.querySelector('#tooltip');
    const button = document.querySelector(`#${this.for}`);
    const popper = createPopper(button, tooltip, {
        tooltip: tooltip,
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
      tooltip.setAttribute('data-show', '');
      popper.update();
    }

    function hide() {
      tooltip.removeAttribute('data-show');
      popper.update();
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
      <div id="tooltip" class="tooltip" role="tooltip">
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
