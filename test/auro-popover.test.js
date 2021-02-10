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

  describe('auro-popover DOES have the "sticky" attribute set to true', () => {
    it('auro-popover shows when you click trigger element', async () => {
      const el = await fixture(html`
        <auro-popover for="button1" sticky>
          tooltip text
          <auro-button id="button1" slot="trigger">trigger text</auro-button>
        </auro-popover>
      `);
  
      const popover = el.shadowRoot.querySelector('#popover');
      expect(popover.hasAttribute('data-show')).to.equal(false);
  
      const trigger = el.querySelector('auro-button')
      trigger.click();
      expect(popover.hasAttribute('data-show')).to.equal(true);
    
      const tooltipSlot = el.shadowRoot.querySelector('slot').assignedNodes()[0];
      expect(tooltipSlot.textContent.includes('tooltip')).to.equal(true);
    });
  
    it('auro-popover should close when user clicks anything else that isn\'t the trigger or popover', async () => {
      const el = await fixture(html`
      <auro-popover for="button1" sticky>
        tooltip text
        <auro-button id="button1" slot="trigger">trigger text</auro-button>
      </auro-popover>
    `);
  
      const popover = el.shadowRoot.querySelector('#popover');
      expect(popover.hasAttribute('data-show')).to.equal(false);
  
      const trigger = el.querySelector('auro-button')
      trigger.click();
      expect(popover.hasAttribute('data-show')).to.equal(true);
  
      const decoy = await fixture(html`
        <button id="btnDecoy">decoy</button>
      `);
      document.querySelector('#btnDecoy').click();
      expect(popover.hasAttribute('data-show')).to.equal(false);
    });
  
    it('auro-popover should close when there is an action inside the popover to close it', async () => {
      const el = await fixture(html`
        <auro-popover for="button1" sticky>
            <button id="btnClosePopover">
                click this button to close popover
            </button>
            tooltip text
          <auro-button id="button1" slot="trigger">trigger text</auro-button>
        </auro-popover>
      `);
  
      function eventHidePopover() {
        this.dispatchEvent(new CustomEvent('hidePopover', {
          bubbles: true,
          composed: true
        }));
      }
  
      const popover = el.shadowRoot.querySelector('#popover');
      expect(popover.hasAttribute('data-show')).to.equal(false);
  
      const trigger = el.querySelector('auro-button');
      trigger.click();
      expect(popover.hasAttribute('data-show')).to.equal(true);
    
      const btnClosePopover = el.querySelector('#btnClosePopover');
      btnClosePopover.addEventListener('click', eventHidePopover)
      btnClosePopover.click();
      expect(popover.hasAttribute('data-show')).to.equal(false);
    });
  });


});
