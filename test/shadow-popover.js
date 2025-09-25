import "../src/registered";
import { html, LitElement } from "lit-element";

class ShadowPopover extends LitElement {
  get popover() {
    return this.shadowRoot.querySelector("auro-popover");
  }

  get trigger() {
    return this.shadowRoot.querySelector("button");
  }

  render() {
    return html`
      <auro-popover for="shadowTest">
        Popover text
        <button id="shadowTest" slot="trigger">Details</button>
      </auro-popover>
    `;
  }
}

customElements.define("shadow-popover", ShadowPopover);
