import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-popover.js';


describe('auro-popover', () => {
  it('auro-popover is accessible from the bottom', async () => {
    const el = await fixture(html`
      <button id="button1">Test</button>
      <auro-popover for="button1" placement="bottom"></auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-popover is accessible from the top', async () => {
    const el = await fixture(html`
      <button id="button1">Test</button>
      <auro-popover for="button1" placement="top"></auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-popover custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-popover"));

    await expect(el).to.be.true;
  });
});
