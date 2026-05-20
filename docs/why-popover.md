# Why auro-popover over native browser tooltips

The native `title` attribute provides a basic tooltip, but it falls short in accessibility, customization, and interaction design. `auro-popover` addresses each of these gaps.

## Rich HTML content

Native tooltips render plain text only. `auro-popover` accepts any slotted HTML — formatted text, links, icons, or any other markup — giving authors full control over what appears in the popover.

## Accessibility

Native `title` tooltips have well-documented accessibility problems. Screen readers handle them inconsistently, they cannot be reached by keyboard, and there is no standardized way to control when or how they are announced.

`auro-popover` takes a different approach:

- **aria-description (ARIA 1.3)** is set on the element that actually receives focus, so screen readers reliably announce the popover content. When the trigger is a wrapper around focusable children (e.g. `<div><a href="#">…</a></div>`) or a custom element with shadow DOM, the description is placed on the correct inner target — not on a container the user never focuses.
- **aria-hidden** on the popover container is synchronized with visibility state, so content is hidden from the accessibility tree when the popover is closed and exposed when open.
- **Auto-tabindex** is added to non-focusable trigger elements (like `<span>` or `<abbr>`) so they can be reached by keyboard without requiring the author to add `tabindex` manually. Elements that are already focusable — natively or through shadow DOM — are left alone to avoid creating double tab stops.
- **role="none"** on the host element prevents screen readers from announcing the custom element wrapper as an extra group.

## Keyboard navigation

Native tooltips have no keyboard interaction. `auro-popover` supports:

- **Space / Enter** to toggle visibility (only on the trigger element itself, not on interactive descendants inside a wrapper trigger)
- **Escape** to dismiss
- **Tab** to dismiss and move to the next focusable element

When the trigger is a wrapper element containing interactive children (e.g. `<button slot="trigger">click me</button>`), Space and Enter on the inner element activate that element's native behavior rather than toggling the popover. The popover can be dismissed with Escape or Tab in this pattern.

## Touch support

On touch devices, hover is unreliable or unavailable. `auro-popover` listens for `touchstart` to toggle the popover, giving mobile and tablet users the same access to popover content.

## Intelligent positioning

Native tooltip placement is entirely browser-controlled and cannot be configured. `auro-popover` uses Popper.js to provide:

- **Configurable placement** — `top` (default) or `bottom` relative to the trigger.
- **Overflow prevention** — the popover automatically repositions to stay within the viewport or a custom boundary element.
- **Boundary control** — the `boundary` property accepts a CSS selector or an element reference to constrain where the popover can appear, which is critical inside modals or scrollable containers.

## Styling and theming

Native tooltips use browser-default styling that cannot be changed. `auro-popover` integrates with the Auro Design System through CSS custom properties:

| Token | Purpose |
|-------|---------|
| `--ds-auro-popover-container-color` | Background color |
| `--ds-auro-popover-text-color` | Text color |
| `--ds-auro-popover-boxshadow-color` | Box shadow |

The `::part(popover)` CSS part is also exported for direct style customization. Spacing between the popover and its trigger can be adjusted with the `addSpace` and `removeSpace` attributes.

## Disabled state

Setting the `disabled` attribute prevents the popover from appearing on hover, focus, or keyboard input. If the popover is already visible when `disabled` is set, it is automatically hidden and all side effects (Popper positioning, body listeners, aria-hidden) are cleaned up consistently.

## Flexible trigger resolution

Triggers can be defined by slotting an element with `slot="trigger"`, or by referencing an element ID with the `for` attribute. This supports triggers that live outside the popover's immediate DOM tree, including elements inside other shadow roots.

## Dynamic content synchronization

When popover slot content changes after initial render, `aria-description` is automatically updated on all associated focusable targets. Native `title` attributes require manual re-setting if content changes.

**Known limitation:** When the trigger is a custom element without `delegatesFocus` whose shadow DOM contains focusable elements, `aria-description` is set directly on those internal shadow DOM elements. If the custom element re-renders (e.g. a Lit component updating its template), the `aria-description` attribute may be lost. Auro components use `delegatesFocus` and are not affected by this limitation.

## Lifecycle management

`auro-popover` handles its own teardown — removing event listeners, cleaning up `aria-description` and auto-added `tabindex`, detaching global listeners, and destroying the Popper instance — so there is no risk of stale accessibility state or memory leaks when the component is removed from the DOM.
