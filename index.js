import { AuroPopover } from './src/auro-popover';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
 const registerComponent = (name = 'custom-popover') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends AuroPopover {});
  }
}

export { registerComponent }
