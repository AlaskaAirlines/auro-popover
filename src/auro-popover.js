// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import {createPopper} from '@popperjs/core';

// build the component class
class AuroPopover extends LitElement {

  // function to define props used within the scope of this component
  static get properties() {
    return {
      cssClass:   { type: String },
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
    const button = document.querySelector('#' + this.for);
    if (!button) {
      console.error('[auro-popover] target property "for" invalid, DOM node not found: ', this.for, button);
    }
    const tooltip = this.shadowRoot.querySelector('#tooltip');
    const popper = createPopper(button, tooltip, {
      placement: this.placement || 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 18],
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
    
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    
    showEvents.forEach(event => {
      button.addEventListener(event, show);
    });
    
    hideEvents.forEach(event => {
      button.addEventListener(event, hide);
    });
  }


  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div class="${this.cssClass} tooltip tooltip-open util_insetLg--squish">
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
