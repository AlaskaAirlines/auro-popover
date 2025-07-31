// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable */

import { html } from "lit/static-html.js";
import { LitElement, css } from "lit";
import { createRef, ref } from 'lit/directives/ref.js';

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import AuroLibraryRuntimeUtils from '@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs';

import {AuroLayover} from "@aurodesignsystem/auro-layover/class";
import layoverVersion from './layoverVersion.js';

// Import touch detection lib
import styleCss from "./style-css.js";
import colorCss from "./color-css.js";
import tokensCss from "./tokens-css.js";

const DEFAULTS = {
  placement: 'top',
}

/** The amount of extra spacing to add when the user passes "addSpace" */
const ADD_SPACE_AMOUNT = 22;

/**
 * Popover attaches to an element and displays on hover/blur.
 *
 * @attr {boolean} disabled - If true, will disable the popover from showing on hover and focus
 * @attr {boolean} addSpace - If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger
 * @attr {boolean} removeSpace - If true, will remove top and bottom space around the appearance of the popover in relation to the trigger
 * @attr {"top"|"bottom"} placement - position for popover in relation to the element
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - The element in this slot triggers hiding and showing the popover.
 */
export class AuroPopover extends LitElement {
  constructor() {
    super();
    this._privateDefaults();
    this._setDefaults(DEFAULTS);
    this._createRefs();
  }

  /**
   * Internal Defaults.
   * @private
   * @returns {void}
   */
  _setDefaults(defaults) {
    Object.keys(defaults).forEach((key) => {
      if (this[key] === undefined) {
        this[key] = defaults[key];
      }
    });
  };

  /**
   * Creates references for the layover and arrow elements.
   * @returns {void}
   */
  _createRefs() {
    this._layoverRef = createRef();
    this._arrowRef = createRef();
  }

  /**
   * Creates versioned tags for internal use.
   * @returns {void}
   */
  _privateDefaults() {
    const versioning = new AuroDependencyVersioning();
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
    this.layoverTag = versioning.generateTag("auro-popover-layover", layoverVersion, AuroLayover);
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      placement:  { type: String },
      disabled:   { type: Boolean },
      boundary:   { type: String },
      addSpace:   { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return [
      css`${styleCss}`,
      css`${colorCss}`,
      css`${tokensCss}`
    ];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-popover"] - The name of element that you want to register to.
   *
   * @example
   * AuroPopover.register("custom-popover") // this will register this element to <custom-popover/>
   *
   */
  static register(name = "auro-popover") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroPopover);
  }

  get _layover () {
    return this._layoverRef.value;
  }

  /**
   * Toggles the display of the popover content.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggle() {
    this._layover.toggle();
  }

  /**
   * Hides the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleHide() {
    this._layover.hide();
  }

  /**
   * Shows the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleShow() {
    this._layover.show();
  }

  get _popoverOffset() {
    // If addSpace is true, we add extra space to the offset
    return this.addSpace ? 12 + ADD_SPACE_AMOUNT : 12;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <${this.layoverTag}
        ${ref(this._layoverRef)}
        behavior="tooltip"
        .placement="${this.placement}"
        inline="true"
        offset="${this._popoverOffset}"
        ?disabled="${this.disabled}"
      >
        <div slot="arrow" ${ref(this._arrowRef)} data-placement="${this.placement}" id="arrow" class="arrow"></div>
        <slot name="trigger" slot="trigger"></slot>
        <div id="popover" class="popover util_insetLg body-default" aria-live="polite" part="popover">
          <slot></slot>
        </div>
      </${this.layoverTag}>
    `;
  }
}