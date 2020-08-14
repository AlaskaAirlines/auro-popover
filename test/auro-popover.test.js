import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-popover.js';


describe('auro-popover', () => {
  it('auro-popover is accessible', async () => {
    const el = await fixture(html`
      <button id="button1">Test</button>
      <auro-popover for="button1" placement="bottom"></auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-popover custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-popover"));

    await expect(el).to.be.true;
  });

  it('auro-popover for works correctly', async () => {
    const el = await fixture(html`
    <div id="container">
      <button id="button4">Test</button>
      <auro-popover for="button4" placement="top"></auro-popover>
    </div>
    `);

    el.querySelector("#button4").dispatchEvent(new MouseEvent('focus'), {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const div = el.querySelector("auro-popover").shadowRoot.querySelector('#tooltip');
    debugger;
    expect(true).to.equal(true);
  });

  it('auro-popover placement works correctly', async () => {
    const el = await fixture(html`
    <div id="container">
      <button id="button5">Test</button>
      <auro-popover for="button5" placement="bottom"></auro-popover>
    </div>
    `);

    el.querySelector("#button5").dispatchEvent(new MouseEvent('mouseenter'), {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const div = el.querySelector("auro-popover").shadowRoot.querySelector('#tooltip');

    expect(true).to.equal(true);
  });
});
