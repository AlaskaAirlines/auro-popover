// MockFocusable: a custom element whose shadow DOM contains a focusable <button>.
// Used to verify that the popover component does not add tabindex to elements
// that already have keyboard-accessible content in their shadow DOM.
class MockFocusable extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>inner button</button>';
  }
}

if (!customElements.get('mock-focusable')) {
  customElements.define('mock-focusable', MockFocusable);
}

// MockNonFocusable: a custom element whose shadow DOM contains no focusable element.
// Used to verify that the popover component adds tabindex to custom elements
// that have no internal keyboard-accessible content.
class MockNonFocusable extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span>icon</span>';
  }
}

if (!customElements.get('mock-non-focusable')) {
  customElements.define('mock-non-focusable', MockNonFocusable);
}
