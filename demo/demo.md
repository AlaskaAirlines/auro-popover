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
  &nbsp;
  <auro-popover for="plugIcon">
    This flight offers seat power service
    <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger"></auro-icon>
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

<!-- The slot=trigger attribute is bound directly to the auro-icon element  -->
<auro-popover for="plugIcon">
  This flight offers seat power service
  <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger"></auro-icon>
</auro-popover>
```

</auro-accordion>

## Sticky popover

In this example, use the `sticky` property in order for the popover to remain open when the trigger is clicked or tapped. Any click outside the popover will close the popover.

When the intention is to close the popover with an event within the popover, use the `toggle()` method bound to a click event on the trigger element within the popover.

<div class="exampleWrapper">
  <auro-popover id="stickyPopover" for="stickyAction" sticky>
    <auro-button onclick="document.querySelector('#stickyPopover').toggle()">Click to exit</auro-button>
    <auro-button secondary id="stickyAction" slot="trigger">Sticky Action</auro-button>
  </auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<auro-popover id="stickyPopover" for="stickyAction" sticky>
  <auro-button onclick="document.querySelector('#stickyPopover').toggle()">Click to exit</auro-button>
  <auro-button secondary id="stickyAction" slot="trigger">Sticky Action</auro-button>
</auro-popover>
```

</auro-accordion>

## Using disconnected elements

In these examples the `trigger` is external to the scope of the `auro-popover` element.

**NOTE:** Using the disconnection pattern breaks the parent > child relationship between the `trigger` and the popover. Because of this, the ability to move from the trigger hover into the popover and have the popover persist is not available. If this pattern and the persisted popover is needed, we suggest using the `stick` attribute.

<div class="exampleWrapper">
  <auro-popover for="button3">Top popover content!</auro-popover>
  <auro-button id="button3">Popover Test</auro-button>
  <auro-popover for="button4" placement="bottom">bottom popover content!</auro-popover>
  <auro-button secondary id="button4">Popover Test</auro-button>
  &nbsp;&nbsp;
  <auro-icon id="plugIcon2" category="in-flight" name="plug"></auro-icon>
  <auro-popover for="plugIcon2" placement="bottom">This flight offers seat power service</auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
<auro-popover for="button3">Top popover content!</auro-popover>
<auro-button id="button3">Popover Test</auro-button>

<auro-popover for="button4" placement="bottom">bottom popover content!</auro-popover>
<auro-button secondary id="button4">Popover Test</auro-button>

<auro-icon id="plugIcon2" category="in-flight" name="plug"></auro-icon>
<auro-popover for="plugIcon2" placement="bottom">This flight offers seat power service</auro-popover>
```

</auro-accordion>


## Add space around popover

Depending on the element trigger that the popover element is assigned to, the spacing between the trigger and the popover may be too close. For these instances, use the `addSpace` attribute.

<div class="exampleWrapper">
  <auro-popover for="button10" addSpace>
    Notice this popover is a little<br>further away from the trigger.
    <auro-button id="button10" slot="trigger">Popover w/additional space</auro-button>
  </auro-popover>

  <auro-popover for="button11" placement="bottom">
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

<auro-popover for="button11" placement="bottom">
  This popover uses the default spacing<br>between the popover and the trigger.
  <auro-button secondary id="button11" slot="trigger">Popover w/o additional space</auro-button>
</auro-popover>

```
</auro-accordion>

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
  <auro-hyperlink id="link" href="/" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
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

The popover behaves much like the `sticky` feature on mobile devices.
