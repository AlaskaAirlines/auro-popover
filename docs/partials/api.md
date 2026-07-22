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

The trigger can be any element, not just buttons or links. The component automatically makes any non-focusable trigger keyboard accessible — including custom elements like `auro-icon` that have no internal focusable element. For icon-based triggers without visible text, `aria-label` is still required to provide an accessible name.

> **Accessibility note:** `auro-popover` manages `aria-description` on the focusable element(s) within the trigger slot as part of its accessibility contract — the popover content becomes the trigger's accessible description so screen readers can announce it on focus. When the trigger is a non-focusable wrapper around focusable content (e.g. `<div><a href="#">link</a></div>`), the description is applied to each focusable descendant rather than the wrapper itself. Any existing `aria-description` on affected elements will be replaced when the component connects and removed when it disconnects.
>
> **Keyboard behavior:** Non-interactive triggers (e.g. `<abbr>`, `<auro-icon>`) are automatically made keyboard accessible with `tabindex="0"`. `Space` and `Enter` toggle the popover open and closed, ensuring keyboard-only users have parity with mouse/hover users. This is intentional — accessibility covers more than screen readers, and without activation semantics a keyboard-only user has no way to interact with a non-interactive trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/non-interactive-triggers.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/non-interactive-triggers.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Property & Attribute Examples

### Add Space Around Popover

Use the `addSpace` attribute to add more space between the popover and it's trigger.

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

Use the `boundary` property to set the overflow boundary for the `auro-popover`, shifting the x-axis of the `auro-popover`. This example demonstrates an `auro-popover` in a container without a `boundary` set vs an `auro-popover` in a container with a `boundary` set. The value passed to the `boundary` attribute can be a valid selector string or HTML Element.

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

When the `disabled` attribute is present, the popover will not appear on hover or focus.

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

Use the `placement` attribute to set the position of the popover in relation to the trigger element. Options are `top` and `bottom`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placement.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placement.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Remove Space Around Popover

Use the `removeSpace` attribute to lessen the space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/remove-space.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/remove-space.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

## Common Usage Patterns & Functional Examples

### Guidelines

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Binding a `trigger` event to a hyperlink is **not** recommended. This is a poor user experience for mobile devices, the event required to make the popover appear is a `tap`. The tap will also trigger the hyperlink to fire as well, thus negating the impact of the popover.

The use of a hyperlink to trigger an event in the UI is semantically incorrect and this will present itself as a confusing scenario to assistive devices.

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

In the event that a hyperlink UI is desired, it is recommended to use the `role="button"` semantic reassignment to the hyperlink element.

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

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
