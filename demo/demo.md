# Popovers

The Auro Design System fully supports top and bottom-placement popovers. The following examples illustrate common popover uses followed up by code examples.

The auro-popover element is meant to be used when the interaction and it's content is passive. A popover is not to be used for cases where the user must adjust their focus and acknowledge the presented content. For these cases, please see the [auro-dialog](https://auro.alaskaair.com/components/auro/dialog) element.

See [install instructions](https://auro.alaskaair.com/components/auro/popover/install) for more information as how to install and full API for the `auro-popover` element.

## Popover use cases

The `auro-popover` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when helper text is required

Auro popover allows two ways to layout the HTML. Please see the following examples.

## Using slots, internal to component

In these examples the structure of the HTML uses the slot element to pull the trigger HTML into the scope of the outer shadow DOM element.

<div class="exampleWrapper">
  <auro-popover for="button1">
    <div slot="tooltip">Top popover content!</div>
    <auro-button id="button1" slot="trigger">Popover Test</auro-button>
  </auro-popover>

  <auro-popover for="button2" placement="bottom">
    <div slot="tooltip">Bottom popover content!</div>
    <auro-button secondary id="button2" slot="trigger">Popover Test</auro-button>
  </auro-popover>

  <auro-popover id="stickyPopover" for="stickyAction" sticky>
    <div slot="tooltip">
      <auro-button onclick="document.querySelector('#stickyPopover').toggle()">Click to exit</auro-button>
    </div>
    <auro-button secondary id="stickyAction" slot="trigger">Sticky Action</auro-button>
  </auro-popover>

  <auro-popover for="plugIcon">
    <div slot="tooltip">This flight offers seat power service</div>
    <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger"></auro-icon>
  </auro-popover>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

```html
  <auro-popover for="button1">
    <div slot="tooltip">Top popover content!</div>
    <auro-button id="button1" slot="trigger">Popover Test</auro-button>
  </auro-popover>

  <auro-popover for="button2" placement="bottom">
    <div slot="tooltip">Bottom popover content!</div>
    <auro-button secondary id="button2" slot="trigger">Popover Test</auro-button>
  </auro-popover>

  <auro-popover id="stickyPopover" for="stickyAction" sticky>
    <div slot="tooltip">
      <auro-button onclick="document.querySelector('#stickyPopover').toggle()">Click to exit</auro-button>
    </div>
    <auro-button secondary id="stickyAction" slot="trigger">Sticky Action</auro-button>
  </auro-popover>

  <auro-popover for="plugIcon">
    <div slot="tooltip">This flight offers seat power service</div>
    <auro-icon id="plugIcon" category="in-flight" name="plug" slot="trigger"></auro-icon>
  </auro-popover>
```

</auro-accordion>

## Using disconnected elements

In these examples the trigger can be external to the scope of the popover component allowing for a disconnected HTML structure.

NOTE: The popover element is hidden visually, but not set to `display: none` for accessibility reasons. This is important to know in this setup because the `auro-popover` element may take up physical space depending on your layout solution.

<style>
  .demoFlex {
    display: flex;
    align-items: flex-start;
    align-items: center;
  }

  .demoFlex > auro-button {
    margin-right: 0.25rem;
  }
</style>

<div class="exampleWrapper demoFlex">
  <auro-popover for="button3"><div slot="tooltip">Top popover content!</div></auro-popover>
  <auro-button id="button3">Popover Test</auro-button>
  <auro-popover for="button4" placement="bottom"><div slot="tooltip">bottom popover content!</div></auro-popover>
  <auro-button secondary id="button4">Popover Test</auro-button>
  <auro-icon id="plugIcon2" category="in-flight" name="plug"></auro-icon>
  <auro-popover for="plugIcon2" placement="bottom"><div slot="tooltip">This flight offers seat power service</div></auro-popover>
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