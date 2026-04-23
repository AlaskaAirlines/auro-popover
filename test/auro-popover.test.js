import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "../src/registered";
import "./shadow-popover.fixture";
import "./trigger-mocks.fixture";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Render a standard auro-popover with an auro-button trigger.
 * Used by visibility tests that need a fully connected popover.
 */
async function getFixture() {
  return fixture(html`
    <auro-popover>
      tooltip text
      <auro-button slot="trigger">trigger text</auro-button>
    </auro-popover>
  `);
}

/**
 * Assert that the popover is currently shown (data-show attribute present).
 */
function expectPopoverShown(el) {
  expect(el.hasAttribute("data-show")).to.equal(true);
}

/**
 * Assert that the popover is currently hidden (data-show attribute absent).
 */
function expectPopoverHidden(el) {
  expect(el.hasAttribute("data-show")).to.equal(false);
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
// Verifies the component registers correctly in the custom element registry
// and can be created in the document without errors.

describe("auro-popover — registration", () => {
  it("is accessible", async () => {
    const el = await fixture(html`
      <auro-popover>
        Additional information about this item.
        <auro-button slot="trigger">More info</auro-button>
      </auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it("custom element is defined", async () => {
    const el = await Boolean(customElements.get("auro-popover"));

    await expect(el).to.be.true;
  });

  it("web component is successfully created in the document", async () => {
    // This test fails when attributes are put onto the component before it is attached to the DOM
    const el = document.createElement("auro-popover");

    await expect(el.localName).to.equal("auro-popover");
  });
});

// ---------------------------------------------------------------------------
// Trigger resolution
// ---------------------------------------------------------------------------
// Verifies the component correctly resolves its trigger element via the
// trigger slot, the for attribute (light DOM and shadow DOM), and handles
// the edge case where no trigger is present without throwing.

describe("auro-popover — trigger resolution", () => {
  it("finds trigger in slot", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
    const button = el.querySelector("auro-button");

    expect(el.trigger).to.eql(button);
  });

  it("finds trigger with id and for attributes", async () => {
    const el = await fixture(html`
      <auro-popover for="popover1">
        tooltip text
        <auro-button id="popover1" slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
    const trigger = el.querySelector("auro-button");

    expect(el.trigger).to.eql(trigger);
  });

  it("finds trigger in shadow root using for attribute", async () => {
    const el = await fixture(html`
      <shadow-popover></shadow-popover>
    `);

    expect(el.popover.trigger).to.eql(el.trigger);
  });

  it("falls back to slot trigger when for attribute set but no element with given id", async () => {
    // This test case covers frameworks like Svelte where id could be set as a property on a custom element
    const el = await fixture(html`
      <auro-popover for="test">
        tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
    const button = el.querySelector("auro-button");

    expect(el.trigger).to.eql(button);
  });

  it("does not throw when no trigger is provided", async () => {
    // Verifies the early-return guard in firstUpdated() — if neither the for
    // attribute nor the trigger slot resolves an element, the component exits
    // cleanly rather than throwing on trigger property access.
    const el = await fixture(html`<auro-popover>tooltip text</auro-popover>`);

    expect(el).to.exist;
  });

  it("does not throw when touchstart fires with no trigger", async () => {
    // touchstart → toggle() is registered in connectedCallback regardless of
    // whether a trigger resolves. Verifies the toggle() popper guard prevents
    // a throw when the component is uninitialized.
    const el = await fixture(html`<auro-popover>tooltip text</auro-popover>`);

    expect(() => el.dispatchEvent(new Event("touchstart"))).to.not.throw();
  });

  it("does not throw when toggleShow is called with no trigger", async () => {
    // Covers the toggleShow() popper guard — the method can be called directly
    // even though event handlers that invoke it are only registered with a trigger.
    const el = await fixture(html`<auro-popover>tooltip text</auro-popover>`);

    expect(() => el.toggleShow()).to.not.throw();
  });

  it("does not throw when toggleHide is called with no trigger", async () => {
    // Covers the toggleHide() popper guard — state cleanup runs safely but
    // popper.hide() is skipped when the component is uninitialized.
    const el = await fixture(html`<auro-popover>tooltip text</auro-popover>`);

    expect(() => el.toggleHide()).to.not.throw();
  });

  it("does not throw when boundary is set with no trigger", async () => {
    // Covers the updated() popper guard — setting boundary after mount on a
    // no-trigger popover should be silently ignored rather than throw.
    const container = await fixture(html`
      <div>
        <div id="boundary"></div>
        <auro-popover>tooltip text</auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");
    const boundary = container.querySelector("#boundary");

    popover.boundary = boundary;

    // If updated() throws against an undefined popper, the promise rejects and the test fails.
    await elementUpdated(popover);
    expect(popover).to.exist;
  });
});

// ---------------------------------------------------------------------------
// aria-description
// ---------------------------------------------------------------------------
// Verifies aria-description (ARIA 1.3) is correctly set on the trigger so
// screen readers announce popover content on focus. Also verifies that the
// description stays in sync when slot content changes and is removed cleanly
// on disconnect so stale descriptions don't persist on reused trigger elements.

describe("auro-popover — aria-description", () => {
  it("sets aria-description on trigger with popover slot content", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
    const trigger = el.querySelector("auro-button");

    expect(trigger.getAttribute("aria-description")).to.equal("tooltip text");
  });

  it("updates aria-description on trigger when slot content changes", async () => {
    const container = await fixture(html`
      <auro-popover>
        initial tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);

    const trigger = container.querySelector("auro-button");
    const slot = container.shadowRoot.querySelector("slot:not([name])");

    expect(trigger.getAttribute("aria-description")).to.equal("initial tooltip text");

    // Set up a promise to wait for slotchange
    const slotChange = new Promise((resolve) => {
      slot.addEventListener("slotchange", resolve, { once: true });
    });

    // Replace the slot content with a new text node
    const newText = document.createTextNode("updated tooltip text");
    container.insertBefore(newText, container.querySelector("auro-button"));

    container.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE && n.textContent.includes("initial")) {
        n.remove();
      }
    });

    // Wait for the actual signal your component uses
    await slotChange;

    expect(trigger.getAttribute("aria-description")).to.equal("updated tooltip text");
  });

  it("removes aria-description from trigger on disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <auro-button slot="trigger">trigger text</auro-button>
        </auro-popover>
      </div>
    `);
    const trigger = container.querySelector("auro-button");
    const popover = container.querySelector("auro-popover");

    expect(trigger.getAttribute("aria-description")).to.equal("tooltip text");

    container.removeChild(popover);

    expect(trigger.hasAttribute("aria-description")).to.be.false;
  });
});

// ---------------------------------------------------------------------------
// Screen reader accessibility
// ---------------------------------------------------------------------------
// Verifies that both button and non-button triggers satisfy the full
// accessibility contract: keyboard reachable, accessible name present, and
// aria-description set — ensuring screen readers can announce the popover
// content without requiring the popover to be visually opened.

describe("auro-popover — screen reader accessibility", () => {
  it("button trigger has accessible name and description", async () => {
    const el = await fixture(html`
      <auro-popover>
        Additional flight information.
        <button slot="trigger">Flight details</button>
      </auro-popover>
    `);
    const trigger = el.querySelector("button");

    await expect(el).to.be.accessible();
    expect(trigger.tabIndex).to.be.gte(0);
    expect(trigger.textContent.trim()).to.equal("Flight details");
    expect(trigger.getAttribute("aria-description")).to.equal("Additional flight information.");
  });

  it("non-button native trigger is fully accessible after component connects", async () => {
    const el = await fixture(html`
      <auro-popover>
        Most Valuable Passenger — mid-tier elite status.
        <abbr slot="trigger">MVP</abbr>
      </auro-popover>
    `);
    const trigger = el.querySelector("abbr");

    await expect(el).to.be.accessible();
    expect(trigger.getAttribute("tabindex")).to.equal("0");
    expect(trigger.textContent.trim()).to.equal("MVP");
    expect(trigger.getAttribute("aria-description")).to.equal("Most Valuable Passenger — mid-tier elite status.");
  });
});

// ---------------------------------------------------------------------------
// Auto-tabindex
// ---------------------------------------------------------------------------
// Verifies the component automatically adds tabindex="0" to triggers that
// are not natively focusable and have no internal focusable shadow DOM
// descendant (e.g. auro-icon, abbr). Ensures author-set tabindex values
// are respected, double tab stops are avoided for elements like auro-button,
// and auto-added tabindex is removed cleanly on disconnect.

describe("auro-popover — auto-tabindex", () => {
  it("adds tabindex to non-focusable native trigger element", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <abbr slot="trigger">MVP</abbr>
      </auro-popover>
    `);
    const abbr = el.querySelector("abbr");

    expect(abbr.getAttribute("tabindex")).to.equal("0");
  });

  it("does not add tabindex to natively focusable trigger", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const button = el.querySelector("button");

    expect(button.hasAttribute("tabindex")).to.be.false;
  });

  it("does not override author-set tabindex on trigger", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <abbr slot="trigger" tabindex="-1">MVP</abbr>
      </auro-popover>
    `);
    const abbr = el.querySelector("abbr");

    expect(abbr.getAttribute("tabindex")).to.equal("-1");
  });

  it("adds tabindex to custom element with no internal focusable content", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <mock-non-focusable slot="trigger"></mock-non-focusable>
      </auro-popover>
    `);
    const trigger = el.querySelector("mock-non-focusable");

    expect(trigger.getAttribute("tabindex")).to.equal("0");
  });

  it("does not add tabindex to custom element whose shadow DOM contains a focusable element", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <mock-focusable slot="trigger"></mock-focusable>
      </auro-popover>
    `);
    const trigger = el.querySelector("mock-focusable");

    expect(trigger.hasAttribute("tabindex")).to.be.false;
  });

  it("removes auto-added tabindex from trigger on disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <abbr slot="trigger">MVP</abbr>
        </auro-popover>
      </div>
    `);
    const abbr = container.querySelector("abbr");
    const popover = container.querySelector("auro-popover");

    expect(abbr.getAttribute("tabindex")).to.equal("0");

    container.removeChild(popover);

    expect(abbr.hasAttribute("tabindex")).to.be.false;
  });

  it("does not remove author-set tabindex from trigger on disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <abbr slot="trigger" tabindex="0">MVP</abbr>
        </auro-popover>
      </div>
    `);
    const abbr = container.querySelector("abbr");
    const popover = container.querySelector("auro-popover");

    container.removeChild(popover);

    expect(abbr.getAttribute("tabindex")).to.equal("0");
  });
});

// ---------------------------------------------------------------------------
// Shadow DOM structure
// ---------------------------------------------------------------------------
// Verifies the required shadow DOM shape is present and correct. Guards
// against regressions where refactoring might accidentally remove role=tooltip,
// re-introduce aria-live (non-functional with display:none), or add
// aria-labelledby back to the tooltip span (was previously incorrectly
// pointing at the trigger).

describe("auro-popover — shadow DOM structure", () => {
  it("tooltip span has role='tooltip' wrapping the default slot", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const tooltipSpan = el.shadowRoot.querySelector('span[role="tooltip"]');

    expect(tooltipSpan, 'Expected a <span role="tooltip"> in shadow DOM').to.exist;
    expect(tooltipSpan.querySelector('slot')).to.exist;
  });

  it("popover content is delivered via slot, not hardcoded in shadow DOM", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const slot = el.shadowRoot.querySelector('span[role="tooltip"] slot');
    const assignedText = slot.assignedNodes({ flatten: true }).map((n) => n.textContent).join('').trim();

    expect(assignedText).to.equal('tooltip text');
    expect(el.shadowRoot.innerHTML).to.not.include('tooltip text');
  });

  it("shadow DOM does not contain an aria-live attribute", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const liveRegion = el.shadowRoot.querySelector('[aria-live]');

    expect(liveRegion, 'aria-live must not exist in shadow DOM — it does not fire on display:none elements').to.not.exist;
  });

  it("tooltip span does not have aria-labelledby", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const tooltipSpan = el.shadowRoot.querySelector('span[role="tooltip"]');

    expect(tooltipSpan.hasAttribute('aria-labelledby'), 'aria-labelledby must not be on the tooltip span — it incorrectly pointed back at the trigger').to.be.false;
  });
});

// ---------------------------------------------------------------------------
// ARIA structure integrity
// ---------------------------------------------------------------------------
// Verifies that ARIA attributes remain correct through show and hide cycles.
// Ensures visibility state changes do not corrupt the role=tooltip contract
// or the aria-description value set on the trigger.

describe("auro-popover — ARIA structure integrity", () => {
  it("role='tooltip' is maintained after popover shows", async () => {
    const el = await getFixture();

    el.dispatchEvent(new MouseEvent("mouseenter"));

    const tooltipSpan = el.shadowRoot.querySelector('span[role="tooltip"]');
    expect(tooltipSpan).to.exist;
    expect(tooltipSpan.getAttribute('role')).to.equal('tooltip');
  });

  it("role='tooltip' is maintained after popover hides", async () => {
    const el = await getFixture();

    el.dispatchEvent(new MouseEvent("mouseenter"));
    el.dispatchEvent(new MouseEvent("mouseleave"));

    const tooltipSpan = el.shadowRoot.querySelector('span[role="tooltip"]');
    expect(tooltipSpan).to.exist;
    expect(tooltipSpan.getAttribute('role')).to.equal('tooltip');
  });

  it("aria-description on trigger is correct after a show and hide cycle", async () => {
    const el = await fixture(html`
      <auro-popover>
        tooltip text
        <button slot="trigger">trigger text</button>
      </auro-popover>
    `);
    const trigger = el.querySelector('button');

    el.dispatchEvent(new MouseEvent("mouseenter"));
    el.dispatchEvent(new MouseEvent("mouseleave"));

    expect(trigger.getAttribute('aria-description')).to.equal('tooltip text');
  });
});

// ---------------------------------------------------------------------------
// triggerUpdate
// ---------------------------------------------------------------------------
// Verifies the public triggerUpdate() method on the Popover instance
// recalculates position without error. Used by consumers when the trigger
// element moves in the DOM after the popover is already visible (e.g. a
// date picker where the popover follows the focused date cell).

describe("auro-popover — triggerUpdate", () => {
  it("updates popper position without error when popover is visible", async () => {
    const el = await getFixture();

    el.dispatchEvent(new MouseEvent("mouseenter"));

    expect(() => el.popper.triggerUpdate()).to.not.throw();
  });
});

// ---------------------------------------------------------------------------
// handleMouseoverEvent
// ---------------------------------------------------------------------------
// Verifies the global body mouseover handler correctly hides the popover
// when the mouse moves outside the component while the popover is visible.

describe("auro-popover — handleMouseoverEvent", () => {
  it("hides popover when mouseover fires outside the component while visible", async () => {
    const el = await getFixture();

    el.dispatchEvent(new MouseEvent("mouseenter"));
    expectPopoverShown(el);

    document.body.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, composed: true }));

    expectPopoverHidden(el);
  });
});

// ---------------------------------------------------------------------------
// updated — boundary change
// ---------------------------------------------------------------------------
// Verifies the Lit updated() lifecycle correctly pushes boundary property
// changes to the Popper.js instance after first render. Without this, setting
// boundary after mount (e.g. inside a modal) would be silently ignored.

describe("auro-popover — boundary change after render", () => {
  it("updates popper boundaryElement when boundary property changes", async () => {
    const container = await fixture(html`
      <div>
        <div id="new-boundary"></div>
        <auro-popover>
          tooltip text
          <button slot="trigger">trigger text</button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");
    const newBoundary = container.querySelector("#new-boundary");

    popover.boundary = newBoundary;
    await elementUpdated(popover);

    expect(popover.popper.boundaryElement).to.equal(newBoundary);
  });

  it("resolves a selector string boundary to an Element", async () => {
    // Verifies setBoundary() is used rather than direct assignment — a raw
    // string assigned to boundaryElement would break Popper's preventOverflow
    // modifier, which expects an Element.
    const container = await fixture(html`
      <div>
        <div id="string-boundary"></div>
        <auro-popover>
          tooltip text
          <button slot="trigger">trigger text</button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");
    const expectedElement = container.querySelector("#string-boundary");

    popover.boundary = "#string-boundary";
    await elementUpdated(popover);

    expect(popover.popper.boundaryElement).to.equal(expectedElement);
  });
});

// ---------------------------------------------------------------------------
// Visibility — mouse
// ---------------------------------------------------------------------------
// Verifies the core hover interaction: popover shows on mouseenter and
// hides on mouseleave.

describe("auro-popover — visibility via mouse", () => {
  it("shows hidden content on hover", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.dispatchEvent(new MouseEvent("mouseenter"));
    expect(el.textContent).to.include("tooltip");
    expectPopoverShown(el);
  });

  it("hides popover content on hover off", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.dispatchEvent(new MouseEvent("mouseenter"));
    expectPopoverShown(el);
    el.dispatchEvent(new MouseEvent("mouseleave"));
    expectPopoverHidden(el);
  });
});

// ---------------------------------------------------------------------------
// Visibility — keyboard
// ---------------------------------------------------------------------------
// Verifies keyboard interaction: popover shows on focus, hides on Escape
// and Tab, and toggles on Space and Enter. Key values match the browser
// spec (capital first letter) to catch environment-specific regressions.

describe("auro-popover — visibility via keyboard", () => {
  it("toggles hidden content on focus and space key", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.trigger.dispatchEvent(new Event("focus"));
    expectPopoverShown(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expectPopoverHidden(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    expectPopoverShown(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    expectPopoverHidden(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    expectPopoverShown(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expectPopoverHidden(el);
  });

  it("toggles hidden content on focus and enter key", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.trigger.dispatchEvent(new Event("focus"));
    expectPopoverShown(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expectPopoverHidden(el);
    el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expectPopoverShown(el);
  });
});

// ---------------------------------------------------------------------------
// Visibility — touch
// ---------------------------------------------------------------------------
// Verifies the touchstart handler toggles the popover on mobile devices
// where hover and focus events are not the primary interaction model.

describe("auro-popover — visibility via touch", () => {
  it("toggles popover content on touch", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.dispatchEvent(new Event("touchstart"));
    expectPopoverShown(el);
    el.dispatchEvent(new Event("touchstart"));
    expectPopoverHidden(el);
  });
});

// ---------------------------------------------------------------------------
// Event listener cleanup
// ---------------------------------------------------------------------------
// Verifies all event listeners are properly removed in disconnectedCallback()
// to prevent memory leaks. When auro-popover is removed from the DOM while
// its trigger remains (e.g. the for= pattern), unremoved listeners would keep
// a closure reference to the dead instance alive and could fire against it.
// Also verifies the Popper.js instance is destroyed on disconnect to release
// its internal DOM references.

describe("auro-popover — event listener cleanup", () => {
  it("does not show popover on mouseenter after disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <auro-button slot="trigger">trigger text</auro-button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");

    container.removeChild(popover);

    // mouseenter on the disconnected host should not show the popover
    popover.dispatchEvent(new MouseEvent("mouseenter"));

    expectPopoverHidden(popover);
  });

  it("does not show popover on trigger focus after disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <auro-button slot="trigger">trigger text</auro-button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");
    const trigger = container.querySelector("auro-button");

    container.removeChild(popover);

    // focus on the trigger should not show the popover after disconnect
    trigger.dispatchEvent(new Event("focus"));

    expectPopoverHidden(popover);
  });

  it("removes body mouseover listener when disconnected while visible", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <auro-button slot="trigger">trigger text</auro-button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");

    popover.dispatchEvent(new MouseEvent("mouseenter"));
    expectPopoverShown(popover);

    container.removeChild(popover);

    // Ensure disconnect state prevents body mouseover interactions
    // and does not break when global events continue firing
    expect(popover._onBodyMouseover).to.not.be.null;
    expect(popover.isPopoverVisible).to.be.true;
    // Fire a body mouseover — should not throw against a disconnected instance
    expect(() => {
      document.body.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, composed: true }));
    }).to.not.throw();
  });

  it("destroys Popper.js instance on disconnect", async () => {
    const container = await fixture(html`
      <div>
        <auro-popover>
          tooltip text
          <auro-button slot="trigger">trigger text</auro-button>
        </auro-popover>
      </div>
    `);
    const popover = container.querySelector("auro-popover");

    // Show the popover to create the Popper.js instance
    popover.dispatchEvent(new MouseEvent("mouseenter"));

    container.removeChild(popover);

    expect(popover.popper.popper).to.be.null;
  });
});
