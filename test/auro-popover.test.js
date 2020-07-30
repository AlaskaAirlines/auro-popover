import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-popover.js';

describe('auro-popover', () => {
  it('sets the CSS class on auro-popover > div element', async () => {
    const el = await fixture(html`
      <auro-popover cssclass="testClass"></auro-popover>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-popover is accessible', async () => {
    const el = await fixture(html`
      <auro-popover cssclass="testClass"></auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-popover custom element is defined', async () => {
    const el = await !!customElements.get("auro-popover");

    await expect(el).to.be.true;
  });
});
