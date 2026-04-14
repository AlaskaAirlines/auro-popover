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
});

// ---------------------------------------------------------------------------
// aria-description
// ---------------------------------------------------------------------------

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

    expect(trigger.getAttribute("aria-description")).to.equal("initial tooltip text");

    // Replace the slot content with a new text node
    const newText = document.createTextNode("updated tooltip text");
    container.insertBefore(newText, container.querySelector("auro-button"));
    container.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE && n.textContent.includes("initial")) {
        n.remove();
      }
    });

    // Wait for slotchange to fire and aria-description to update
    await elementUpdated(container);

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
});

// ---------------------------------------------------------------------------
// Visibility — mouse
// ---------------------------------------------------------------------------

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

describe("auro-popover — visibility via touch", () => {
  it("toggles popover content on touch", async () => {
    const el = await getFixture();

    expectPopoverHidden(el);
    el.dispatchEvent(new MouseEvent("touchstart"));
    expectPopoverShown(el);
    el.dispatchEvent(new MouseEvent("touchstart"));
    expectPopoverHidden(el);
  });
});
