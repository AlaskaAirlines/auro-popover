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

    // Stable event-listener references used across the component lifecycle.
    this._onTouchStart = null;
    this._onTriggerMouseEnter = null;
    this._onTriggerMouseLeave = null;
    this._onTriggerFocus = null;
    this._onTriggerBlur = null;
    this._onTriggerKeydown = null;
    this._onHidePopover = null;
    this._onBodyMouseover = null;
    this._onSlotChange = null;
    this._addedTabIndex = false;
  }

  /**
   * Internal Defaults.
   * @private
   * @returns {void}
   */
  _initializeDefaults() {
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
       * Position for popover in relation to the element {'top' | 'bottom'}.
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
    if (!this._onTouchStart) {
      this._onTouchStart = () => {
        this.toggle();
      };
    }
    this.addEventListener("touchstart", this._onTouchStart);
  }

  disconnectedCallback() {
    // NOTE: Teardown is one-way. This component does not currently support
    // reinitialization after being removed from the DOM.

    super.disconnectedCallback();
    this.removeEventListener("touchstart", this._onTouchStart);

    if (this.trigger) {
      // Remove listeners attached to the trigger element.
      if (this._onTriggerMouseEnter) {
        this._eventTarget.removeEventListener("mouseenter", this._onTriggerMouseEnter);
      }
      if (this._onTriggerMouseLeave) {
        this._eventTarget.removeEventListener("mouseleave", this._onTriggerMouseLeave);
      }
      if (this._onTriggerFocus) {
        this.trigger.removeEventListener("focus", this._onTriggerFocus);
      }
      if (this._onTriggerBlur) {
        this.trigger.removeEventListener("blur", this._onTriggerBlur);
      }
      if (this._onTriggerKeydown) {
        this.trigger.removeEventListener("keydown", this._onTriggerKeydown);
      }

      // Clean up aria-description and its sync listener set in firstUpdated.
      // Prevents stale descriptions if the trigger is reused after disconnect.
      if (this._onSlotChange) {
        this.shadowRoot?.querySelector("slot:not([name])")?.removeEventListener("slotchange", this._onSlotChange);
      }
      this.trigger.removeAttribute("aria-description");

      // Remove tabindex only if the component added it and the current value
      // still matches the value managed by the component. This avoids removing
      // an author-updated tabindex that was set after connection.
      if (this._addedTabIndex && this.trigger.getAttribute("tabindex") === "0") {
        this.trigger.removeAttribute("tabindex");
      }
    }

    if (this._onHidePopover) {
      this.removeEventListener("hidePopover", this._onHidePopover);
    }

    // Remove the global mouseover handler if the popover was visible when disconnected.
    if (this._onBodyMouseover) {
      document.body.removeEventListener("mouseover", this._onBodyMouseover);
    }

    // Destroy the Popper.js instance to release its internal references.
    if (this.popper?.popper && typeof this.popper.popper.destroy === "function") {
      this.popper.popper.destroy();
      this.popper.popper = null;
    }
  }

  firstUpdated() {
    /**
     * NOTE: This component is not currently designed for reinitialization.
     * All setup in firstUpdated() is assumed to run once per instance lifecycle.
     * If the element is removed and later reattached, event bindings,
     * Popper setup, and accessibility wiring will NOT be restored automatically.
     */

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

    // Guard: if neither the for attribute nor the trigger slot resolved an element,
    // there is nothing to attach to — exit cleanly rather than throwing on property access.
    if (!this.trigger) {
      return;
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
    //
    // Known limitation: custom elements with a closed shadow root (mode: 'closed') cannot
    // be inspected — shadowRoot returns null. If such an element has an internal focusable
    // descendant and a host tabIndex of -1, tabindex="0" will be added, potentially
    // creating a double tab stop. Elements using delegatesFocus avoid this because the
    // browser reflects a non-negative tabIndex on the host.
    const isNativelyFocusable = this.trigger.tabIndex >= 0;
    const hasInternalFocus = this.trigger.shadowRoot
      ? Boolean(this.trigger.shadowRoot.querySelector(
          'button, a[href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        ))
      : false;

    if (!isNativelyFocusable && !hasInternalFocus && !this.trigger.hasAttribute("tabindex")) {
      this.trigger.setAttribute("tabindex", "0");
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
    const slot = this.shadowRoot.querySelector("slot:not([name])");
    const getSlotText = () => slot.assignedNodes({ flatten: true })
      .map((n) => n.textContent ?? "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    this.trigger.setAttribute("aria-description", getSlotText());

    // Keep aria-description in sync if slot content changes after first render.
    this._onSlotChange = () => {
      this.trigger?.setAttribute("aria-description", getSlotText());
    };
    slot.addEventListener("slotchange", this._onSlotChange);

    this.auroPopover = this.shadowRoot.querySelector("#popover");
    this.popper = new Popover(
      this.trigger,
      this.auroPopover,
      this.placement,
      this.boundary,
    );

    this._onBodyMouseover = (evt) => this.handleMouseoverEvent(evt);
    this._onTriggerMouseEnter = () => { this.toggleShow(); };
    this._onTriggerMouseLeave = () => { this.toggleHide(); };
    this._onTriggerFocus = () => { this.toggleShow(); };
    this._onTriggerBlur = () => { this.toggleHide(); };
    this._onTriggerKeydown = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === "tab" || key === "escape") {
          this.toggleHide();
        }
      }

      if (key === " " || key === "enter") {
        // Prevent page scroll for Space only on non-native triggers.
        // Native elements (button, a) handle their own Space/Enter semantics.
        if (key === " " && this._addedTabIndex) {
          event.preventDefault();
        }
        this.toggle();
      }
    };
    this._onHidePopover = () => { this.toggleHide(); };

    // mouseenter/mouseleave attach to the host when the trigger is a direct
    // child of auro-popover (slotted), otherwise they attach to the trigger itself.
    this._eventTarget =
      this.trigger.parentElement.localName === this.localName
        ? this
        : this.trigger;

    this._eventTarget.addEventListener("mouseenter", this._onTriggerMouseEnter);
    this._eventTarget.addEventListener("mouseleave", this._onTriggerMouseLeave);

    // if user tabs off of trigger, then hide the popover.
    this.trigger.addEventListener("keydown", this._onTriggerKeydown);

    // handle gain/loss of focus
    this.trigger.addEventListener("focus", this._onTriggerFocus);
    this.trigger.addEventListener("blur", this._onTriggerBlur);

    // e.g. for a closePopover button in the popover
    this.addEventListener("hidePopover", this._onHidePopover);
  }

  /**
   * Toggles the display of the popover content.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggle() {
    if (!this.popper) {
      return;
    }
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
    this.isPopoverVisible = false;
    this.removeAttribute("data-show");
    if (this._onBodyMouseover) {
      document.body.removeEventListener("mouseover", this._onBodyMouseover);
    }
    if (!this.popper) {
      return;
    }
    this.popper.hide();
  }

  /**
   * Shows the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleShow() {
    if (!this.popper) {
      return;
    }
    this.popper.show();
    this.isPopoverVisible = true;
    this.setAttribute("data-show", "true");

    document.body.addEventListener("mouseover", this._onBodyMouseover);
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
    if (changedProperties.has("boundary") && this.popper) {
      // Use setBoundary() rather than assigning directly — it resolves selector
      // strings to Elements. Assigning a raw string would break Popper's
      // preventOverflow modifier, which expects an Element.
      this.popper.boundaryElement = this.popper.setBoundary(this.boundary);
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
