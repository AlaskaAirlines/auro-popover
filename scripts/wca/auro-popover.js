import { AuroPopover } from "../../src/auro-popover.js";

/**
 * Popover attaches to an element and displays on hover/blur.
 */
class AuroPopoverWCA extends AuroPopover {}

if (!customElements.get("auro-popover")) {
  customElements.define("auro-popover", AuroPopoverWCA);
}
