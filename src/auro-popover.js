// Copyright (c) 2025 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";
import { css, html, LitElement } from "lit";
import Popover from "./popover.js";

import colorCss from "./styles/color.scss";
import styleCss from "./styles/style.scss";
import tokensCss from "./styles/tokens.scss";

/**
 * The `auro-popover` element attaches to another element and displays on hover.
 * @customElement auro-popover
 *
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - The element in this slot triggers hiding and showing the popover.
 */
export class AuroPopover extends LitElement {
  constructor() {
    super();

    this.placement = "top";
  }

  /**
   * Internal Defaults.
   * @private
   * @returns {void}
   */
  _initializeDefaults() {
    // this.placement = "top";
    this.isPopoverVisible = false;
    this.runtimeUtils = new AuroLibraryRuntimeUtils();
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      /** 
       * Adds additional top and bottom space around the appearance of the popover in relation to the trigger.
       */
      addSpace: { 
        type: Boolean, 
        reflect: true 
      },

      /** 
       * The element to use as the boundary for the popover. Can be a query selector or an HTML element.
       * @type {string | object}
       */
      boundary: { type: String },

      /** 
       * Disables the popover from showing on hover and focus.
       */
      disabled: { 
        type: Boolean,
        reflect: true
      },

      /** 
       * Directly associates the popover with a trigger element with the given ID. In most cases, this should not be necessary and set `slot="trigger"` on the element instead.
       */
      for: { 
        type: String,
        reflect: true
      },

      /**
       * Position for popover in relation to the element.
       * @type {'top' | 'bottom'}
       * @default 'top'
       */
      placement: { type: String},

      /** 
       * Removes top and bottom space around the appearance of the popover in relation to the trigger.
       */
      removeSpace: { 
        type: Boolean, 
        reflect: true 
      },
    };
  }

  static get styles() {
    return [css`${styleCss}`, css`${colorCss}`, css`${tokensCss}`];
  }

  /**
   * This will register this element with the browser.
   * @param {string} [name="auro-popover"] - The name of the element that you want to register.
   *
   * @example
   * AuroPopover.register("custom-popover") // this will register this element to <custom-popover/>
   *
   */
  static register(name = "auro-popover") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroPopover);
  }

  connectedCallback() {
    super.connectedCallback();

    this._initializeDefaults();

    // adds toggle function to root element based on touch
    this.addEventListener("touchstart", function () {
      this.toggle();
      this.setAttribute("isTouch", "true");
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.documentClickHandler);

    // Clean up aria-description set on the trigger in firstUpdated.
    // Prevents a stale description persisting if the trigger element is reused.
    this.trigger?.removeAttribute('aria-description');

    // Remove tabindex only if the component added it — don't remove what the author set.
    if (this._addedTabIndex) {
      this.trigger?.removeAttribute('tabindex');
    }
  }

  firstUpdated() {
    // Add the tag name as an attribute if it is different than the component name
    this.runtimeUtils.handleComponentTagRename(this, "auro-popover");

    if (this.for) {
      this.trigger =
        document.querySelector(`#${this.for}`) ||
        this.getRootNode().querySelector(`#${this.for}`);
    }

    if (!this.trigger) {
      [this.trigger] = this.shadowRoot
        .querySelector('slot[name="trigger"]')
        .assignedElements();
    }

    // If the trigger is not keyboard accessible, make it focusable automatically.
    // This covers native elements (e.g. <abbr>, <span>) and custom elements whose
    // shadow DOM contains no focusable descendant (e.g. auro-icon).
    //
    // We skip elements that are already accessible via the tab order:
    // - Natively focusable elements (tabIndex >= 0): <button>, <a href>, <input>, etc.
    // - Custom elements whose shadow DOM contains a focusable descendant (e.g. auro-button
    //   has an inner <button>) — adding tabindex to the host would create a double tab stop.
    // - Elements where the author has explicitly set tabindex — their intent is respected.
    const isNativelyFocusable = this.trigger.tabIndex >= 0;
    const hasInternalFocus = this.trigger.shadowRoot
      ? Boolean(this.trigger.shadowRoot.querySelector(
          'button, a[href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        ))
      : false;

    if (!isNativelyFocusable && !hasInternalFocus && !this.trigger.hasAttribute('tabindex')) {
      this.trigger.setAttribute('tabindex', '0');
      this._addedTabIndex = true;
    }

    // Announce popover content to screen readers via aria-description (ARIA 1.3).
    //
    // Why not aria-describedby?
    // The trigger (e.g. auro-button) is in light DOM; the popover content lives
    // inside auro-popover's shadow DOM. aria-describedby ID lookup is scoped to
    // the same shadow root, so cross-shadow references silently fail.
    //
    // Why not aria-live?
    // The popover is hidden with display:none, which removes it from the
    // accessibility tree entirely — aria-live never fires. Persistent live regions
    // in document.body hit VoiceOver's content deduplication: identical text
    // announced to the same region is suppressed on repeat visits.
    //
    // aria-description embeds the string directly on the trigger element with no
    // ID lookup. VoiceOver recomputes it fresh on every focus event, so content
    // is announced consistently regardless of prior visits.
    //
    // NOTE: aria-description is defined in the ARIA 1.3 spec. It is well-supported
    // in modern browsers and screen readers (Chrome 92+, Firefox 92+, Safari 15.4+)
    // but may be unfamiliar — do not replace with aria-describedby.
    const slot = this.shadowRoot.querySelector('slot:not([name])');
    const text = slot.assignedNodes({ flatten: true }).map((n) => n.textContent).join('').trim();
    this.trigger.setAttribute('aria-description', text);

    this.auroPopover = this.shadowRoot.querySelector("#popover");
    this.popper = new Popover(
      this.trigger,
      this.auroPopover,
      this.placement,
      this.boundary,
    );

    const handleShow = () => {
      this.toggleShow();
    };
    const handleHide = () => {
      this.toggleHide();
    };
    const handleKeyboardWhenFocusOnTrigger = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === "tab" || key === "escape") {
          this.toggleHide();
        }
      }

      if (key === " " || key === "enter") {
        this.toggle();
      }
    };
    const element =
      this.trigger.parentElement.nodeName === "AURO-POPOVER"
        ? this
        : this.trigger;

    element.addEventListener("mouseenter", handleShow);
    element.addEventListener("mouseleave", handleHide);

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener("keydown", handleKeyboardWhenFocusOnTrigger);

    // handle gain/loss of focus
    this.trigger.addEventListener("focus", handleShow);
    this.trigger.addEventListener("blur", handleHide);

    // e.g. for a closePopover button in the popover
    this.addEventListener("hidePopover", handleHide);
  }

  /**
   * Toggles the display of the popover content.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggle() {
    if (this.isPopoverVisible) {
      this.toggleHide();
    } else {
      this.toggleShow();
    }
  }

  /**
   * Hides the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleHide() {
    this.popper.hide();
    this.isPopoverVisible = false;
    this.removeAttribute("data-show");
    document
      .querySelector("body")
      .removeEventListener("mouseover", this.mouseoverHandler);
  }

  /**
   * Shows the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleShow() {
    this.popper.show();
    this.isPopoverVisible = true;
    this.setAttribute("data-show", true);

    this.mouseoverHandler = (evt) => this.handleMouseoverEvent(evt);

    document
      .querySelector("body")
      .addEventListener("mouseover", this.mouseoverHandler);
  }

  /**
   * Hides the popover when hovering outside of the popover or it's trigger.
   * @private
   * @param {Event} evt - The event object.
   * @returns {void}
   */
  handleMouseoverEvent(evt) {
    if (this.isPopoverVisible && !evt.composedPath().includes(this)) {
      this.toggleHide();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("boundary")) {
      this.popper.boundaryElement = this.boundary;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div id="popover" class="popover util_insetLg body-default" part="popover">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <span role="tooltip"><slot></slot></span>
      </div>

      <span>
        <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
      </span>
    `;
  }
}
