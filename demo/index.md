<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# Popover

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./description.md) -->
<!-- The below content is automatically added from ./description.md -->
The Auro Design System fully supports `top` and `bottom` placed popovers. The following examples illustrate common popover uses followed up by code examples.

See for more information as how to install and full API for the `<auro-popover>` element.
<!-- AURO-GENERATED-CONTENT:END -->

## auro-popover use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./useCases.md) -->
<!-- The below content is automatically added from ./useCases.md -->
The `auro-popover` element should be used in situations where users may:

* interact with an element to get clarification on content offering
* provide definition to iconic imagery
* when helper text is required
<!-- AURO-GENERATED-CONTENT:END -->

## Example(s)

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

## Recommended Use and Version Control

There are two important parts of every Auro component. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom element. The class is exported and then used as part of defining the Web Component. When importing this component as described in the <a href="#install">install</a> section, the class is imported and the `auro-popover` custom element is defined automatically.

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our `AuroPopover.register(name)` method and pass in a unique name.

```js
import { AuroPopover } from './src/auro-popover.js';

AuroPopover.register('custom-popover');
```

This will create a new custom element that you can use in your HTML that will function identically to the `auro-popover` element.

 <div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/custom.html) -->
  <!-- The below content is automatically added from ./../../apiExamples/custom.html -->
  <!-- The slot=trigger attribute is bound directly to the auro-button element  -->
  <custom-popover>
    Top popover content!
    <auro-button slot="trigger">Popover Test</auro-button>
  </custom-popover>
  <!-- Using the placement=bottom attribute -->
  <custom-popover placement="bottom">
    Popover content!
    <auro-button secondary slot="trigger">Popover Test</auro-button>
  </custom-popover>
  <!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
  <span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/custom.html) -->
<!-- The below code snippet is automatically added from ./../../apiExamples/custom.html -->

```html
<!-- The slot=trigger attribute is bound directly to the auro-button element  -->
<custom-popover>
  Top popover content!
  <auro-button slot="trigger">Popover Test</auro-button>
</custom-popover>
<!-- Using the placement=bottom attribute -->
<custom-popover placement="bottom">
  Popover content!
  <auro-button secondary slot="trigger">Popover Test</auro-button>
</custom-popover>
```
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
