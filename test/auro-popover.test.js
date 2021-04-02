import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-popover.js';

describe('auro-popover', () => {
  it('is accessible', async () => {
    const el = await fixture(html`
      <button id="button1">Test</button>
      <auro-popover for="button1"></auro-popover>
    `);

    await expect(el).to.be.accessible();
  });

  it('custom element is defined', async () => {
    const el = await Boolean(customElements.get("auro-popover"));

    await expect(el).to.be.true;
  });

  describe('visibility via mouse', () => {
    it('shows hidden content on hover', async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.dispatchEvent(new MouseEvent('mouseenter'));

      expect(el.textContent).to.include('tooltip');

      expectPopoverShown(el);
    })

    it('hides popover content on hover off', async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.dispatchEvent(new MouseEvent('mouseenter'));

      expectPopoverShown(el);

      el.dispatchEvent(new MouseEvent('mouseleave'));

      expectPopoverHidden(el);
    })
  })

  describe('visibility via keyboard', () => {
    it ('toggles hidden content trigger focus and space key', async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new Event('focus'));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'escape' }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'tab' }));

      expectPopoverHidden(el);
    })

    it ('toggles hidden content trigger focus and enter key', async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new Event('focus'));

      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));

      expectPopoverHidden(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));

      expectPopoverShown(el);
    })
  })

  describe('visibility via touch', () => {
    it('toggles popover content on touch', async () => {
      const el = await getFixture();

      expectPopoverHidden(el);

      el.dispatchEvent(new MouseEvent('touchstart'));

      expectPopoverShown(el);

      el.dispatchEvent(new MouseEvent('touchstart'));

      expectPopoverHidden(el);
    })
  })
});

async function getFixture() {
  return await fixture (
    html`
      <auro-popover for="popover1">
        tooltip text
        <auro-button id="popover1" slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
}

function expectPopoverShown(el) {
  expect(el.hasAttribute('data-show')).to.equal(true);
}

function expectPopoverHidden(el) {
  expect(el.hasAttribute('data-show')).to.equal(false);
}
