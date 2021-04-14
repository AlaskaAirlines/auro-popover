# Popover

The Auro Design System fully supports `top` and `bottom` placed popovers. The following examples illustrate common popover uses followed up by code examples.

See [install instructions](https://auro.alaskaair.com/components/auro/popover/install) for more information as how to install and full API for the `auro-popover` element.

## Popover use cases

The `auro-popover` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when helper text is required

Auro popover allows two ways to layout the HTML. Please see the following examples.

## Using slots, internal to the popover element

The following examples illustrates using the `trigger` slot within the scope of the `auro-popover` element.

<div class="exampleWrapper">
  <auro-popover for="button1">
    Top popover content!
    <auro-button id="button1" slot="trigger">Popover Test</auro-button>
  </auro-popover>

  <auro-popover for="button2" placement="bottom">
    Bottom popover content!
    <auro-button secondary id="button2" slot="trigger">Popover Test</auro-button>
  </auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<!-- The slot=trigger attribute is bound directly to the auro-button element  -->
<auro-popover for="button1">
  Top popover content!
  <auro-button id="button1" slot="trigger">Popover Test</auro-button>
</auro-popover>

<!-- Using the placement=bottom attribute -->
<auro-popover for="button2" placement="bottom">
  Bottom popover content!
  <auro-button secondary id="button2" slot="trigger">Popover Test</auro-button>
</auro-popover>
```

</auro-accordion>

## Add space around popover

Sometimes you just need more space. For these instances, use the `addSpace` attribute.

<div class="exampleWrapper">
  <auro-popover for="button10" addSpace>
    Notice this popover is a little<br>further away from the trigger.
    <auro-button id="button10" slot="trigger">Popover w/additional space</auro-button>
  </auro-popover>

  <auro-popover for="button11" placement="bottom" addSpace>
    This popover uses the default spacing<br>between the popover and the trigger.
    <auro-button secondary id="button11" slot="trigger">Popover w/o additional space</auro-button>
  </auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<auro-popover for="button10" addSpace>
  Notice this popover is a little<br>further away from the trigger.
  <auro-button id="button10" slot="trigger">Popover w/additional space</auro-button>
</auro-popover>

<auro-popover for="button11" placement="bottom" addSpace>
  This popover uses the default spacing<br>between the popover and the trigger.
  <auro-button secondary id="button11" slot="trigger">Popover w/o additional space</auro-button>
</auro-popover>

```
</auro-accordion>

## Remove space around popover

Sometimes you just need less space. For these instances, use the `removeSpace` attribute.

<div class="exampleWrapper">
  <!-- The slot=trigger attribute is bound directly to the auro-icon element  -->
  <auro-popover for="plugIcon" removeSpace>
    Notice this popover is a little<br>closer to the trigger.
    <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger" tabindex="0"></auro-icon>
  </auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<!-- The slot=trigger attribute is bound directly to the auro-icon element  -->
<auro-popover for="plugIcon" removeSpace>
  Notice this popover is a little<br>closer to the trigger.

    <!--
      For elements like `auro-icon` that do not have a default tab-to state,
      be sure to add `tabindex="0"` to the element when using `auro-popover`
      otherwise users of assistive technology will not see the content.
    -->
  <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger" tabindex="0"></auro-icon>
</auro-popover>
```
</auro-accordion>

## Using disconnected elements

While is it possible to use this element without nesting the trigger inside the `auro-popover` element, it is not recommended as this is very difficult to support.

If you are using this pattern, it is recommended that you update your app to use the nested pattern.

## Guidelines

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

Binding a `trigger` event to a hyperlink is **not** recommended. This is a poor user experience for mobile devices, the event required to make the popover appear is a `tap`. The tap will also trigger the hyperlink to fire as well, thus negating the impact of the popover.

The use of a hyperlink for to trigger an event in the UI is semantically incorrect and this will present itself as a confusing scenario to assistive devices.

<auro-alerts error noIcon>
  <div class="exampleWrapper">
    <auro-popover for="link">
      This works, but not recommended
      <auro-hyperlink id="link" href="/" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
    </auro-popover>
  </div>
</auro-alerts>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<auro-popover for="link">
  This works, but not recommended
  <auro-hyperlink id="link" href="#" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
</auro-popover>
```
</auro-accordion>

In the event that a hyperlink UI is desired, it is recommended to use the `role="button"` semantic reassignment to the hyperlink element.

<auro-alerts success noIcon>
  <div class="exampleWrapper">
    <auro-popover for="linkButton">
      Role button is recommended
      <auro-hyperlink id="linkButton" role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
    </auro-popover>
  </div>
</auro-alerts>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<auro-popover for="linkButton">
  Role button is recommended
  <auro-hyperlink id="linkButton" role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
</auro-popover>
```
</auro-accordion>

## Developer notes

The default trigger for a popover is a `hover` event. Mobile devices do not support `hover` events directly, so the `hover` event is replaced with a `touchstart` event to produce the popover. This is to ensure reliability of the action versus versus a dependency on a secondary interruption of the `hover` event on mobile devices.
