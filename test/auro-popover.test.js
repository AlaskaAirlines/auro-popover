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

  describe('when "sticky" attribute set to true', () => {
    it('toggles popover when you click trigger element', async () => {
      const el = await getStickyFixture();
      expectPopoverHidden(el);

      el.trigger.click();
      expectPopoverShown(el);

      expect(el.textContent).to.include('tooltip');

      el.trigger.click();
      expectPopoverHidden(el);
    });

    it('closes when user clicks anything else that isn\'t the trigger or popover', async () => {
      const el = await getStickyFixture();
      expectPopoverHidden(el);

      el.trigger.click();
      expectPopoverShown(el);

      const decoy = await fixture(html`
        <button id="btnDecoy">decoy</button>
      `);

      decoy.click();
      expectPopoverHidden(el);
    });

    it('closes when there is an action inside the popover to close it', async () => {
      const el = await getStickyFixture(true);
      const btnClosePopover = el.querySelector('#btnClosePopover');
      btnClosePopover.addEventListener('click', () => { el.toggle(); });

      expectPopoverHidden(el);

      el.trigger.click();
      expectPopoverShown(el);

      btnClosePopover.click();
      expectPopoverHidden(el);
    });

    it('hides on tab key', async () => {
      const el = await getStickyFixture();

      el.trigger.click();
      expectPopoverShown(el);

      el.trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      expectPopoverHidden(el);
    });

    it('hides on hidePopover event', async () => {
      const el = await getStickyFixture(true);
      const btnClosePopover = el.querySelector('#btnClosePopover');
      btnClosePopover.addEventListener('click', function() {
        this.dispatchEvent(new CustomEvent('hidePopover', {
          bubbles: true,
          composed: true
        }));
      });

      el.trigger.click();
      expectPopoverShown(el);

      btnClosePopover.click();
      expectPopoverHidden(el);
    });

    it('toggles shown state', async () => {
      const el = await getStickyFixture();

      el.toggle();
      expectPopoverShown(el);

      el.toggle();
      expectPopoverHidden(el);
    });
  });
});

async function getStickyFixture(includeCloseButton = false) {
  return await fixture(html`
    <auro-popover for="button1" sticky>
      ${includeCloseButton ? html`<button id="btnClosePopover">
        click this button to close popover
      </button>` : null}
      tooltip text
      <auro-button id="button1" slot="trigger">trigger text</auro-button>
    </auro-popover>
  `);
}

function expectPopoverShown(el) {
  expect(el.hasAttribute('data-show')).to.equal(true);
}

function expectPopoverHidden(el) {
  expect(el.hasAttribute('data-show')).to.equal(false);
}
