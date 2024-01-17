<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../api.md) -->
<!-- The below content is automatically added from ./../api.md -->

# auro-popover

Popover attaches to an element and displays on hover/blur.

## Attributes

| Attribute     | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| [addSpace](#addSpace)    | `boolean` | If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger |
| [removeSpace](#removeSpace) | `boolean` | If true, will remove top and bottom space around the appearance of the popover in relation to the trigger |

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| [disabled](#disabled)  | `disabled`  | `boolean` |         | If true, will disable the popover from showing on hover and focus |
| [for](#for)       | `for`       | `String`  |         | Directly associate the popover with a trigger element with the given ID. In most cases, this should not be necessary and set slot="trigger" on the element instead. |
| [placement](#placement) | `placement` | `String`  | "top"   | Expects top/bottom - position for popover in relation to the element |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Default unnamed slot for the use of popover content |
| [trigger](#trigger) | The element in this slot triggers hiding and showing the popover. |
<!-- AURO-GENERATED-CONTENT:END -->

## API Examples

### Basic

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basic.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/basic.html -->
  <!-- The slot=trigger attribute is bound directly to the auro-button element  -->
  <auro-popover>
    Top popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- Using the placement=bottom attribute -->
  <auro-popover placement="bottom">
    Popover content!
    <auro-button secondary slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/basic.html -->

```html
<!-- The slot=trigger attribute is bound directly to the auro-button element  -->
<auro-popover>
  Top popover content!
  <auro-button slot="trigger">Popover Test</auro-button>
</auro-popover>
<!-- Using the placement=bottom attribute -->
<auro-popover placement="bottom">
  Popover content!
  <auro-button secondary slot="trigger">Popover Test</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Attribute Examples

#### Disabled

When the `disabled` attribute is present, the popover will not appear on hover or focus.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/disabled.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/disabled.html -->
  <auro-popover disabled>
    Top popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/disabled.html -->

```html
<auro-popover disabled>
  Top popover content!
  <auro-button slot="trigger">Popover Test</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Add space around popover

Use the `addSpace` attribute to add more space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/addSpace.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/addSpace.html -->
  <auro-popover addSpace>
    Notice this popover is a little<br>further away from the trigger.
    <auro-button slot="trigger">Popover w/additional space above</auro-button>
  </auro-popover>
  <auro-popover placement="bottom" addSpace>
    Notice this popover is a little<br>further away from the trigger.
    <auro-button secondary slot="trigger">Popover w/additional space below</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/addSpace.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/addSpace.html -->

```html
<auro-popover addSpace>
  Notice this popover is a little<br>further away from the trigger.
  <auro-button slot="trigger">Popover w/additional space above</auro-button>
</auro-popover>
<auro-popover placement="bottom" addSpace>
  Notice this popover is a little<br>further away from the trigger.
  <auro-button secondary slot="trigger">Popover w/additional space below</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

#### Remove space around popover

Use the `removeSpace` attribute to lessen the space between the popover and it's trigger.

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/removeSpace.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/removeSpace.html -->
  <auro-popover removeSpace>
    Notice this popover is a little<br>closer to the trigger.
    <auro-button slot="trigger">Popover w/less space above</auro-button>
  </auro-popover>
  <auro-popover placement="bottom" removeSpace>
    Notice this popover is a little<br>closer to the trigger.
    <auro-button secondary slot="trigger">Popover w/less space below</auro-button>
  </auro-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/removeSpace.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/removeSpace.html -->

```html
<auro-popover removeSpace>
  Notice this popover is a little<br>closer to the trigger.
  <auro-button slot="trigger">Popover w/less space above</auro-button>
</auro-popover>
<auro-popover placement="bottom" removeSpace>
  Notice this popover is a little<br>closer to the trigger.
  <auro-button secondary slot="trigger">Popover w/less space below</auro-button>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Guidelines

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Binding a `trigger` event to a hyperlink is **not** recommended. This is a poor user experience for mobile devices, the event required to make the popover appear is a `tap`. The tap will also trigger the hyperlink to fire as well, thus negating the impact of the popover.

The use of a hyperlink for to trigger an event in the UI is semantically incorrect and this will present itself as a confusing scenario to assistive devices.

<auro-alert type="error" noIcon>
  <div class="exampleWrapper">
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/notRecommended.html) -->
    <!-- The below content is automatically added from ./../../apiExamples/notRecommended.html -->
    <auro-popover>
      This works, but not recommended
      <auro-hyperlink href="#" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
    </auro-popover>
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/notRecommended.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/notRecommended.html -->

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
    <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/recommended.html) -->
    <!-- The below content is automatically added from ./../../apiExamples/recommended.html -->
    <auro-popover>
      Role button is recommended
      <auro-hyperlink role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
    </auro-popover>
    <!-- AURO-GENERATED-CONTENT:END -->
  </div>
</auro-alert>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/recommended.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/recommended.html -->

```html
<auro-popover>
  Role button is recommended
  <auro-hyperlink role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
</auro-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Developer Notes

The default trigger for a popover is a `hover` event. Mobile devices do not support `hover` events directly, so the `hover` event is replaced with a `touchstart` event to produce the popover. This is to ensure reliability of the action versus versus a dependency on a secondary interruption of the `hover` event on mobile devices.
