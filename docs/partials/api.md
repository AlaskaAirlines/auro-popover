<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Apply popover to any type of content

The trigger can be any element, not just buttons or links. The component automatically makes any non-focusable trigger keyboard accessible, including custom elements that have no internal focusable element, such as `auro-icon`. For icon-based triggers without visible text, `aria-label` is still required to provide an accessible name.

> **Accessibility note:** `auro-popover` manages `aria-description` on the focusable elements within the trigger slot as part of its accessibility contract. The popover content becomes the trigger's accessible description, so screen readers announce it on focus. When the trigger is a non-focusable wrapper around focusable content, such as `<div><a href="#">link</a></div>`, the description is applied to each focusable descendant rather than the wrapper itself. The component replaces any existing `aria-description` on affected elements when it first renders and removes it when it disconnects.
>
> **Keyboard behavior:** Non-interactive triggers, such as `<abbr>` and `<auro-icon>`, are automatically made keyboard accessible with `tabindex="0"`. `Space` and `Enter` toggle the popover open and closed, so keyboard-only users get the same access as mouse and hover users. Without activation semantics, a keyboard-only user has no way to interact with a non-interactive trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/non-interactive-triggers.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/non-interactive-triggers.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Property and attribute examples

### Add space around popover

Use the `addspace` attribute to add more space between the popover and its trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/add-space.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/add-space.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Boundary

Use the `boundary` property to keep the popover inside a container, shifting it horizontally when it would overflow. This example shows a popover in a container without a `boundary` and one in a container with a `boundary`. Set `boundary` to a selector string in HTML or JavaScript. To use an HTML element, set the property in JavaScript.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/boundary.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.html) -->
<!-- AURO-GENERATED-CONTENT:END -->


<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.js) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Disabled

When the `disabled` attribute is present, the popover doesn't appear on hover, focus, touch, or keyboard activation.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/disabled.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/disabled.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Placement

Use the `placement` attribute to set the position of the popover in relation to the trigger element. Options are `top` and `bottom`. The popover flips to the opposite side when there isn't room.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placement.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Remove space around popover

Use the `removespace` attribute to lessen the space between the popover and its trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/remove-space.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/remove-space.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## CSS shadow part examples

The component exposes the `popover` bubble, the `arrow`, and the `trigger` wrapper as CSS shadow parts, so they can be styled from outside the shadow DOM.

Three things to know before reaching for these:

**The arrow's visible shape is a pseudo-element.** `::part(arrow)` selects an invisible positioning anchor; the diamond you see is its `::before`. Target `::part(arrow)::before` to change color, shadow, or size. Because the arrow and the bubble are painted separately, recolor both together or the seam between them shows.

**The arrow's position is set by the component.** It's recalculated every time the popover opens. Use the `placement` attribute to choose which side the popover appears on. Resizing the arrow via `::part(arrow)::before` also shifts where it meets the bubble, so check both `placement="top"` and `placement="bottom"` if you change its dimensions.

**The `trigger` part is empty when you use `for`.** It wraps the trigger slot, so it only has something to style when the trigger is slotted into the component. If you point at an external element with `for`, that element isn't inside the wrapper and `::part(trigger)` silently does nothing. Style the external trigger directly instead.

To adjust spacing between the popover and its trigger, prefer the `addspace` and `removespace` attributes over part overrides.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/cssParts.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/cssParts.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common usage patterns

### Guidelines

Use `auro-popover` only when the interaction and its content are passive. Don't use a popover when people must shift focus and acknowledge the content. For those cases, see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Don't use a hyperlink as the trigger. On mobile devices, a tap opens the popover and also follows the hyperlink, which defeats the popover.

Using a hyperlink to run an action in the UI is semantically incorrect and confuses screen reader users.

<div class="exampleWrapper">
  <auro-alert type="error" noIcon>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/not-recommended.html) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </auro-alert>
</div>


<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/not-recommended.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

If you need the look of a hyperlink, add `role="button"` to it so screen readers announce a button.

<div class="exampleWrapper">
  <auro-alert type="success" noIcon>
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/recommended.html) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </auro-alert>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/recommended.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Restyle with CSS custom properties

Restyle the component by changing the values of the following tokens.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
