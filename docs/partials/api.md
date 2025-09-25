<!-- AURO-GENERATED-CONTENT:START (FILE:src=../docs/api.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Attribute Examples

#### Disabled

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

#### Add space around popover

Use the `addSpace` attribute to add more space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/addSpace.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/addSpace.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

#### Remove space around popover

Use the `removeSpace` attribute to lessen the space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/removeSpace.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/removeSpace.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Property Examples

#### Set overflow boundary for popover

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

### Guidelines

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Binding a `trigger` event to a hyperlink is **not** recommended. This is a poor user experience for mobile devices, the event required to make the popover appear is a `tap`. The tap will also trigger the hyperlink to fire as well, thus negating the impact of the popover.

The use of a hyperlink for to trigger an event in the UI is semantically incorrect and this will present itself as a confusing scenario to assistive devices.

<auro-alert type="error" noIcon>
  <div class="exampleWrapper">
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/notRecommended.html) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/notRecommended.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

In the event that a hyperlink UI is desired, it is recommended to use the `role="button"` semantic reassignment to the hyperlink element.

<auro-alert type="success" noIcon>
  <div class="exampleWrapper">
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/recommended.html) -->
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/recommended.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

### Developer Notes

The default trigger for a popover is a `hover` event. Mobile devices do not support `hover` events directly, so the `hover` event is replaced with a `touchstart` event to produce the popover. This is to ensure reliability of the action versus a dependency on a secondary interruption of the `hover` event on mobile devices.

### Theme Support

The component may be restyled using the following code sample and changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=../src/styles/tokens.scss) -->
<!-- AURO-GENERATED-CONTENT:END -->
