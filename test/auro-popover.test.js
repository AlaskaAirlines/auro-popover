import { expect, fixture, html } from "@open-wc/testing";
import "../index";
import "./shadow-popover";

describe("auro-popover", () => {
  it("is accessible", async () => {
    const el = await fixture(html`
      <button id="button1">Test</button>
      <auro-popover for="button1"></auro-popover>
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

  it("falls back to slot trigger when for attribute set but no element with given id", async () => {
    // this test case is for frameworks like Svelte, where id could be set as a property on a custom element
    const el = await fixture(html`
      <auro-popover for="test">
        tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
    const button = el.querySelector("auro-button");

    expect(el.trigger).to.eql(button);
  });

  describe("visibility via mouse", () => {
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

  describe("visibility via keyboard", () => {
    it("toggles hidden content trigger focus and space key", async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new Event("focus"));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "escape" }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "tab" }));

      expectPopoverHidden(el);
    });

    it("toggles hidden content trigger focus and enter key", async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new Event("focus"));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "enter" }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "enter" }));

      expectPopoverShown(el);
    });
  });

  describe("visibility via touch", () => {
    it("toggles popover content on touch", async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.dispatchEvent(new MouseEvent("touchstart"));

      expectPopoverShown(el);

      el.dispatchEvent(new MouseEvent("touchstart"));

      expectPopoverHidden(el);
    });
  });
});

async function getFixture() {
  return await fixture(
    html`
      <auro-popover>
        tooltip text
        <auro-button slot="trigger">trigger text</auro-button>
      </auro-popover>
    `,
  );
}

function expectPopoverShown(el) {
  expect(el.hasAttribute("data-show")).to.equal(true);
}

function expectPopoverHidden(el) {
  expect(el.hasAttribute("data-show")).to.equal(false);
}
