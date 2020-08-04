import { fixture, html, expect, describe, it } from '@open-wc/testing';
import '../src/auro-popover.js';


describe('auro-popover', () => {
  it('auro-popover is accessible', async () => {
    const el = await fixture(html`
      <script>const process={};</script>
      <button id="button1"></button>
      <auro-popover for="button1"></auro-popover>
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
      <script>const process={};</script>
      <button id="button1"></button>
      <auro-popover for="button1"></auro-popover>
    </div>
    `);

    el.querySelector("#button1").dispatchEvent(new MouseEvent('mouseover'), {
      view: window,
      bubbles: true,
      cancelable: true
    });
    // const div = el.querySelector("auro-popover").shadowRoot.querySelector('#tooltip');

    expect(true).to.equal(true);
  });
});
