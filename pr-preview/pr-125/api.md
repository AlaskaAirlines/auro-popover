<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-popover

The `auro-popover` element attaches to another element and displays on hover.

### Properties & Attributes

| Properties  | Attributes  | Modifiers | Type             | Default | Description                                                                                                                                                            |
| ----------- | ----------- | --------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addSpace    | addSpace    |           | boolean          |         | Adds additional top and bottom space around the appearance of the popover in relation to the trigger.                                                                  |
| boundary    | boundary    |           | string \| object |         | The element to use as the boundary for the popover. Can be a query selector or an HTML element.                                                                        |
| disabled    | disabled    |           | boolean          |         | Disables the popover from showing on hover and focus.                                                                                                                  |
| for         | for         |           | string           |         | Directly associates the popover with a trigger element with the given ID. In most cases, this should not be necessary and set `slot="trigger"` on the element instead. |
| placement   | placement   |           | string           | `top`   | Position for popover in relation to the element.                                                                                                                       |
| removeSpace | removeSpace |           | boolean          |         | Removes top and bottom space around the appearance of the popover in relation to the trigger.                                                                          |

### Methods

| Name     | Parameters                                                           | Return | Description                                       |
| -------- | -------------------------------------------------------------------- | ------ | ------------------------------------------------- |
| register | `name` (string) - The name of the element that you want to register. |        | This will register this element with the browser. |

### Slots

| Name      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | Default unnamed slot for the use of popover content               |
| trigger   | The element in this slot triggers hiding and showing the popover. |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../apiExamples/basic.html -->
  <auro-popover>
    Top popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

```html
<auro-popover>
  Top popover content!
  <auro-button slot="trigger">Popover Test</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Apply popover to any type of content

The trigger can be any element, not just buttons or links. The component automatically makes any non-focusable trigger keyboard accessible — including custom elements like `auro-icon` that have no internal focusable element. For icon-based triggers without visible text, `aria-label` is still required to provide an accessible name.

> **Accessibility note:** `auro-popover` manages `aria-description` on the trigger element as part of its accessibility contract — the popover content becomes the trigger's accessible description so screen readers can announce it on focus. Any existing `aria-description` on the trigger will be replaced when the component connects and removed when it disconnects.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/non-interactive-triggers.html) -->
  <!-- The below content is automatically added from ./../apiExamples/non-interactive-triggers.html -->
  <!-- auro-icon has no internal focusable element, so the component automatically
       adds tabindex. aria-label is still required to provide an accessible name. -->
  <auro-popover>
    This flight offers priority boarding.
    <auro-icon slot="trigger" category="interface" name="info-stroke" aria-label="More information"></auro-icon>
  </auro-popover>
  <br><br>
  <!-- Native elements like <abbr> are automatically made keyboard accessible by the component -->
  <p>Congratulations, you just achieved
    <auro-popover>
      Most Valuable Passenger — Alaska Airlines' mid-tier elite status level.
      <abbr slot="trigger" style="color: orangered">MVP</abbr>
    </auro-popover> status!
  </p>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/non-interactive-triggers.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/non-interactive-triggers.html -->

```html
<!-- auro-icon has no internal focusable element, so the component automatically
     adds tabindex. aria-label is still required to provide an accessible name. -->
<auro-popover>
  This flight offers priority boarding.
  <auro-icon slot="trigger" category="interface" name="info-stroke" aria-label="More information"></auro-icon>
</auro-popover>
<br><br>
<!-- Native elements like <abbr> are automatically made keyboard accessible by the component -->
<p>Congratulations, you just achieved
  <auro-popover>
    Most Valuable Passenger — Alaska Airlines' mid-tier elite status level.
    <abbr slot="trigger" style="color: orangered">MVP</abbr>
  </auro-popover> status!
</p>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Add Space Around Popover

Use the `addSpace` attribute to add more space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/add-space.html) -->
  <!-- The below content is automatically added from ../apiExamples/add-space.html -->
  <auro-popover addSpace>
    Notice this popover is a little<br>further away from the trigger.
    <auro-button slot="trigger">Popover w/additional space above</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/add-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/add-space.html -->

```html
<auro-popover addSpace>
  Notice this popover is a little<br>further away from the trigger.
  <auro-button slot="trigger">Popover w/additional space above</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Boundary

Use the `boundary` property to set the overflow boundary for the `auro-popover`, shifting the x-axis of the `auro-popover`. This example demonstrates an `auro-popover` in a container without a `boundary` set vs an `auro-popover` in a container with a `boundary` set. The value passed to the `boundary` attribute can be a valid selector string or HTML Element.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/boundary.html) -->
  <!-- The below content is automatically added from ../apiExamples/boundary.html -->
  <strong>Example with no boundary set</strong>
  <div style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
    <auro-popover placement="bottom">
      Popover content!
      <auro-button slot="trigger">Popover Test</auro-button>
    </auro-popover>
  </div>
  <strong>Example with boundary set</strong>
  <div id="popoverBoundary" style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
    <auro-popover class="boundaryExample" placement="bottom">
      Popover content!
      <auro-button slot="trigger">Popover Test</auro-button>
    </auro-popover>
  </div>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/boundary.html -->

```html
<strong>Example with no boundary set</strong>
<div style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
  <auro-popover placement="bottom">
    Popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
</div>
<strong>Example with boundary set</strong>
<div id="popoverBoundary" style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
  <auro-popover class="boundaryExample" placement="bottom">
    Popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
</div>
```
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/boundary.js -->

```js
export function boundaryExample() {
  const boundaryExample = document.querySelector(".boundaryExample");
  const popoverBoundary = document.querySelector("#popoverBoundary");

  boundaryExample.boundary = popoverBoundary;
}
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

When the `disabled` attribute is present, the popover will not appear on hover or focus.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ../apiExamples/disabled.html -->
  <auro-popover disabled>
    Top popover content!
    <auro-button disabled slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/disabled.html -->

```html
<auro-popover disabled>
  Top popover content!
  <auro-button disabled slot="trigger">Popover Test</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Placement

Use the `placement` attribute to set the position of the popover in relation to the trigger element. Options are `top` and `bottom`.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placement.html) -->
  <!-- The below content is automatically added from ../apiExamples/placement.html -->
  <auro-popover placement="bottom">
    Bottom popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placement.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/placement.html -->

```html
<auro-popover placement="bottom">
  Bottom popover content!
  <auro-button slot="trigger">Popover Test</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Remove Space Around Popover

Use the `removeSpace` attribute to lessen the space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/remove-space.html) -->
  <!-- The below content is automatically added from ../apiExamples/remove-space.html -->
  <auro-popover removeSpace>
    Notice this popover is a little<br>closer to the trigger.
    <auro-button slot="trigger">Popover w/less space above</auro-button>
  </auro-popover>
  <auro-popover placement="bottom" removeSpace>
    Notice this popover is a little<br>closer to the trigger.
    <auro-button slot="trigger">Popover w/less space below</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/remove-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/remove-space.html -->

```html
<auro-popover removeSpace>
  Notice this popover is a little<br>closer to the trigger.
  <auro-button slot="trigger">Popover w/less space above</auro-button>
</auro-popover>
<auro-popover placement="bottom" removeSpace>
  Notice this popover is a little<br>closer to the trigger.
  <auro-button slot="trigger">Popover w/less space below</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Common Usage Patterns & Functional Examples

### Guidelines

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Binding a `trigger` event to a hyperlink is **not** recommended. This is a poor user experience for mobile devices, the event required to make the popover appear is a `tap`. The tap will also trigger the hyperlink to fire as well, thus negating the impact of the popover.

The use of a hyperlink for to trigger an event in the UI is semantically incorrect and this will present itself as a confusing scenario to assistive devices.

<auro-alert type="error" noIcon>
  <div class="exampleWrapper">
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/not-recommended.html) -->
    <!-- The below content is automatically added from ../apiExamples/not-recommended.html -->
    <auro-popover>
      This works, but not recommended
      <auro-hyperlink href="#" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
    </auro-popover>
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/not-recommended.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/not-recommended.html -->

```html
<auro-popover>
  This works, but not recommended
  <auro-hyperlink href="#" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
In the event that a hyperlink UI is desired, it is recommended to use the `role="button"` semantic reassignment to the hyperlink element.

<auro-alert type="success" noIcon>
  <div class="exampleWrapper">
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/recommended.html) -->
    <!-- The below content is automatically added from ../apiExamples/recommended.html -->
    <auro-popover>
      Role button is recommended
      <auro-hyperlink role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
    </auro-popover>
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/recommended.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/recommended.html -->

```html
<auro-popover>
  Role button is recommended
  <auro-hyperlink role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

```scss
@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;

:host {
  --ds-auro-popover-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-popover-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-popover-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}
```
<!-- AURO-GENERATED-CONTENT:END -->
