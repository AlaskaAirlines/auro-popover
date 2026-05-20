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
    this.isPopoverVisible = false;

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
      placement: { type: String },

      /**
       * Removes top and bottom space around the appearance of the popover in relation to the trigger.
       */
      removeSpace: {
        type: Boolean,
        reflect: true
      },

      /**
       * Whether the popover is currently visible. Reflected as the `data-show`
       * attribute so host-level CSS selectors (e.g. `:host([data-show])`) work.
       * Also drives `aria-hidden` on the popover div in the template.
       * @private
       */
      isPopoverVisible: {
        type: Boolean,
        reflect: true,
        attribute: 'data-show',
        converter: {
          fromAttribute: (value) => value !== null,
          toAttribute: (value) => (value ? 'true' : null),
        },
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

    // Prevent screen readers from announcing the custom element host as "group".
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "none");
    }

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
        this.trigger.removeEventListener("focusin", this._onTriggerFocus);
      }
      if (this._onTriggerBlur) {
        this.trigger.removeEventListener("focusout", this._onTriggerBlur);
      }
      if (this._onTriggerKeydown) {
        this.trigger.removeEventListener("keydown", this._onTriggerKeydown);
      }

      // Clean up aria-description and its sync listener set in firstUpdated.
      // Prevents stale descriptions if the trigger is reused after disconnect.
      if (this._onSlotChange) {
        this.shadowRoot?.querySelector("slot:not([name])")?.removeEventListener("slotchange", this._onSlotChange);
      }
      // Remove aria-description from every element that received it in
      // firstUpdated (focusable descendants or the trigger itself).
      for (const target of (this._ariaDescriptionTargets || [this.trigger])) {
        target.removeAttribute("aria-description");
      }

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
    // Set up aria-description so screen readers announce popover content on focus.
    this._setupAccessibility();

    // Set up Popper instance, event listeners, and keyboard/mouse handlers.
    this._setupEventListeners();

    // If the component was initialized with data-show / isPopoverVisible
    // already true, the updated() lifecycle won't fire for that property
    // because it didn't change during this cycle. Sync Popper state now.
    if (this.isPopoverVisible && this.popper) {
      if (this.disabled) {
        this.isPopoverVisible = false;
      } else {
        this.popper.show();
        document.body.addEventListener("mouseover", this._onBodyMouseover);
      }
    }
  }

  /**
   * Initializes the Popper instance and attaches all event listeners
   * for mouse, keyboard, and focus interactions on the trigger.
   * @private
   * @returns {void}
   */
  _setupEventListeners() {
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
    this._onTriggerBlur = (event) => {
      // Only hide if focus leaves the trigger and popover entirely, not
      // when moving between focusable children within the trigger or into
      // interactive content inside the popover.
      // Node.contains() does not cross shadow boundaries, so we walk
      // up through shadow hosts to detect targets inside a descendant
      // custom element's shadow root.
      let target = event.relatedTarget;
      let inside = false;

      while (target) {
        if (this.trigger.contains(target) || this.contains(target)) {
          inside = true;
          break;
        }
        const root = target.getRootNode();
        target = root instanceof ShadowRoot ? root.host : null;
      }

      if (!inside) {
        this.toggleHide();
      }
    };
    this._onTriggerKeydown = (event) => {
      const key = event.key.toLowerCase();

      if (this.isPopoverVisible) {
        if (key === "tab" || key === "escape") {
          this.toggleHide();
        }
      }

      if (key === " " || key === "enter") {
        // Only toggle from the trigger element itself, not from interactive
        // descendants inside a wrapper trigger. focusin/focusout bubble, so
        // keydown events from children (e.g. a link inside <div slot="trigger">)
        // also arrive here; letting them through would interfere with the
        // descendant's native activation (Enter on a link, Space on a button).
        if (event.target !== this.trigger && !this._addedTabIndex) {
          return;
        }

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

    // handle gain/loss of focus — use focusin/focusout so events bubble
    // from focusable descendants inside wrapper triggers (e.g. <div><a>).
    this.trigger.addEventListener("focusin", this._onTriggerFocus);
    this.trigger.addEventListener("focusout", this._onTriggerBlur);

    // e.g. for a closePopover button in the popover
    this.addEventListener("hidePopover", this._onHidePopover);
  }

  /**
   * Sets up auto-tabindex and aria-description on the trigger element.
   *
   * Auto-tabindex: ensures non-focusable triggers are keyboard accessible.
   * Covers native elements (e.g. <abbr>, <span>) and custom elements whose
   * shadow DOM contains no focusable descendant (e.g. auro-icon).
   *
   * We skip elements that are already accessible via the tab order:
   * - Natively focusable elements (tabIndex >= 0): <button>, <a href>, <input>, etc.
   * - Custom elements whose shadow DOM contains a focusable descendant (e.g. auro-button
   *   has an inner <button>) — adding tabindex to the host would create a double tab stop.
   * - Elements where the author has explicitly set tabindex — their intent is respected.
   *
   * Known limitation: custom elements with a closed shadow root (mode: 'closed') cannot
   * be inspected — shadowRoot returns null. If such an element has an internal focusable
   * descendant and a host tabIndex of -1, tabindex="0" will be added, potentially
   * creating a double tab stop. Elements using delegatesFocus avoid this because the
   * browser reflects a non-negative tabIndex on the host.
   *
   * aria-description (ARIA 1.3): embeds the popover content string directly on
   * the trigger so screen readers announce it on focus. Preferred over
   * aria-describedby (cross-shadow ID lookup fails) and aria-live (display:none
   * removes the region from the accessibility tree).
   *
   * @private
   * @returns {void}
   */
  _setupAccessibility() {
    const isNativelyFocusable = this.trigger.tabIndex >= 0;
    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex^="-"]), [contenteditable]:not([contenteditable="false"]), summary, iframe, audio[controls], video[controls]';

    // CSS selectors alone can match elements removed from the tab order
    // (e.g. <button tabindex="-1">) or hidden/inert descendants. Verify
    // actual keyboard reachability before treating a match as focusable.
    // closest() does not cross shadow boundaries, so we also walk up
    // through shadow hosts to catch hidden/inert ancestors in the light DOM.
    const isReachable = (el) => {
      if (el.tabIndex < 0) return false;
      let node = el;
      while (node) {
        if (node.closest('[hidden], [inert]')) return false;
        const root = node.getRootNode();
        node = root instanceof ShadowRoot ? root.host : null;
      }
      return true;
    };

    // Check light DOM children for focusable elements.
    let hasInternalFocus = [...this.trigger.querySelectorAll(focusableSelector)].some(isReachable);

    // Also check light DOM custom element descendants whose shadow DOM
    // contains focusable content. querySelector cannot reach into shadow
    // roots, so custom elements like auro-button inside a wrapper trigger
    // would otherwise be missed (e.g. <div><auro-button></auro-button></div>).
    if (!hasInternalFocus) {
      const descendants = this.trigger.querySelectorAll('*');

      for (const child of descendants) {
        if (child.localName.includes('-') && (child.tabIndex >= 0 ||
            (child.shadowRoot && [...child.shadowRoot.querySelectorAll(focusableSelector)].some(isReachable)))) {
          hasInternalFocus = true;
          break;
        }
      }
    }

    // For custom elements used directly as the trigger (not wrapped),
    // also check the trigger's own shadow DOM for focusable descendants.
    // If the shadow root is inaccessible (closed mode or not yet upgraded),
    // we cannot inspect it — the element will receive tabindex if it is not
    // otherwise focusable. This is a known limitation documented above.
    if (!hasInternalFocus && this.trigger.localName.includes('-') && this.trigger.shadowRoot) {
      hasInternalFocus = [...this.trigger.shadowRoot.querySelectorAll(focusableSelector)].some(isReachable);
    }

    if (!isNativelyFocusable && !hasInternalFocus && !this.trigger.hasAttribute("tabindex")) {
      this.trigger.setAttribute("tabindex", "0");
      this._addedTabIndex = true;
    }

    // Set up aria-description on the appropriate focusable element(s).
    // NOTE: aria-description is defined in the ARIA 1.3 spec. It is well-supported
    // in modern browsers and screen readers (Chrome 92+, Firefox 92+, Safari 15.4+)
    // but may be unfamiliar — do not replace with aria-describedby.
    const slot = this.shadowRoot.querySelector("slot:not([name])");
    const getSlotText = () => slot.assignedNodes({ flatten: true })
      .map((n) => n.textContent ?? "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    // Determine which elements should receive aria-description.
    // When the trigger is a non-focusable wrapper around focusable content
    // (e.g. <div><a href="#">link</a></div>), the description must go on
    // every element that can actually receive focus so screen readers announce it.
    this._ariaDescriptionTargets = [];

    if (!isNativelyFocusable && hasInternalFocus) {
      // Gather all keyboard-reachable light DOM descendants.
      const nativeMatches = [...this.trigger.querySelectorAll(focusableSelector)].filter(isReachable);

      this._ariaDescriptionTargets.push(...nativeMatches);

      // Check custom element descendants whose shadow DOM is focusable.
      const allDescendants = this.trigger.querySelectorAll('*');

      for (const child of allDescendants) {
        if (!child.localName.includes('-')) continue;
        // Skip if already matched by the native selector (e.g. has tabindex attribute).
        if (nativeMatches.includes(child)) continue;

        if (child.tabIndex >= 0) {
          // Host is keyboard-reachable (delegatesFocus or explicit tabindex).
          this._ariaDescriptionTargets.push(child);
        } else if (child.shadowRoot) {
          // Host is not keyboard-reachable; focus goes to internal elements.
          // Set description directly on the shadow DOM focusable controls.
          const shadowFocusable = [...child.shadowRoot.querySelectorAll(focusableSelector)].filter(isReachable);

          for (const el of shadowFocusable) {
            this._ariaDescriptionTargets.push(el);
          }
        }
      }

      if (this._ariaDescriptionTargets.length === 0) {
        // The trigger itself is a custom element with focusable shadow content
        // (e.g. mock-focusable, auro-button used directly as trigger).
        // Light DOM searches found nothing; add the shadow focusable controls
        // so the description is announced when focus lands inside the shadow root.
        if (this.trigger.localName.includes('-') && this.trigger.shadowRoot) {
          const shadowFocusable = [...this.trigger.shadowRoot.querySelectorAll(focusableSelector)].filter(isReachable);

          this._ariaDescriptionTargets.push(...shadowFocusable);
        }

        // Final fallback: if no focusable targets were discovered, put the
        // description on the trigger host itself.
        if (this._ariaDescriptionTargets.length === 0) {
          this._ariaDescriptionTargets.push(this.trigger);
        }
      }
    } else {
      this._ariaDescriptionTargets.push(this.trigger);
    }

    const description = getSlotText();

    for (const target of this._ariaDescriptionTargets) {
      target.setAttribute("aria-description", description);
    }

    // Keep aria-description in sync if slot content changes after first render.
    this._onSlotChange = () => {
      const text = getSlotText();

      for (const target of this._ariaDescriptionTargets) {
        target?.setAttribute("aria-description", text);
      }
    };
    slot.addEventListener("slotchange", this._onSlotChange);
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
  }

  /**
   * Shows the popover.
   * @private
   * @returns {void} Fires an update lifecycle.
   */
  toggleShow() {
    if (!this.popper || this.disabled) {
      return;
    }
    this.isPopoverVisible = true;
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

    // Sync Popper positioning and body listeners whenever visibility changes.
    // This runs after Lit has reflected the data-show attribute to the host,
    // so the CSS that controls .popover display is already applied and Popper
    // can measure a visible element. Centralising the side effects here also
    // guards against external data-show / isPopoverVisible changes that would
    // otherwise bypass toggleShow()/toggleHide().
    if (changedProperties.has("isPopoverVisible") && this.popper) {
      if (this.isPopoverVisible) {
        // Reject visibility when disabled — force back to false so the next
        // updated() cycle runs the hide/cleanup path instead.
        if (this.disabled) {
          this.isPopoverVisible = false;
          return;
        }
        this.popper.show();
        document.body.addEventListener("mouseover", this._onBodyMouseover);
      } else {
        if (this._onBodyMouseover) {
          document.body.removeEventListener("mouseover", this._onBodyMouseover);
        }
        this.popper.hide();
      }
    }

    // If disabled becomes true while the popover is visible, force-hide so
    // aria-hidden, the body mouseover listener, and Popper stay in sync with
    // the CSS that hides the popover via :host([disabled]).
    if (changedProperties.has("disabled") && this.disabled && this.isPopoverVisible) {
      this.isPopoverVisible = false;
    }
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <div
      id="popover"
      class="popover util_insetLg body-default"
      part="popover"
      role="tooltip"
      aria-hidden="${this.isPopoverVisible ? 'false' : 'true'}">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <slot></slot>
      </div>

      <span role="presentation">
        <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
      </span>
    `;
  }
}
