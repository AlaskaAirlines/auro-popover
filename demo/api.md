<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-popover

The `auro-popover` element attaches to another element and displays on hover.

### Properties & Attributes

| Properties  | Attributes  | Modifiers | Type             | Default | Description                                                                                                                                                                                                        |
| ----------- | ----------- | --------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| addSpace    | addspace    |           | boolean          |         | Adds additional top and bottom space around the appearance of the popover in relation to the trigger.                                                                                                              |
| boundary    | boundary    |           | string \| object |         | The element to use as the boundary for the popover. Can be a query selector or an HTML element.                                                                                                                    |
| disabled    | disabled    |           | boolean          |         | Disables the popover from showing on hover and focus.                                                                                                                                                              |
| for         | for         |           | string           |         | Directly associates the popover with a trigger element with the given ID. In most cases, this should not be necessary and set `slot="trigger"` on the element instead.                                             |
| placement   | placement   |           | string           | `top`   | Position for popover in relation to the element {'top' \| 'bottom'}.                                                                                                                                               |
| removeSpace | removespace |           | boolean          |         | Removes top and bottom space around the appearance of the popover in relation to the trigger.                                                                                                                      |
|             | data-show   |           | boolean          | `false` | Whether the popover is currently visible. Reflected as the `data-show`<br>attribute so host-level CSS selectors (e.g. `:host([data-show])`) work.<br>Also drives `aria-hidden` on the popover div in the template. |

### Methods

| Name     | Parameters                                                           | Return | Description                                       |
| -------- | -------------------------------------------------------------------- | ------ | ------------------------------------------------- |
| register | `name` (string) - The name of the element that you want to register. |        | This will register this element with the browser. |

### Slots

| Name      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | Default unnamed slot for the use of popover content               |
| trigger   | The element in this slot triggers hiding and showing the popover. |

### CSS Shadow Parts

| Name    | Description                                                                                                                                                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arrow   | Apply CSS to the arrow's positioning anchor. The visible arrow shape is its `::before` pseudo-element, so target `::part(arrow)::before` to restyle color, shadow, or size. Arrow position is set by Popper as inline styles and cannot be overridden through this part. |
| popover | Apply CSS to the popover bubble container.                                                                                                                                                                                                                               |
| trigger | Apply CSS to the wrapper around the trigger slot. Use to correct alignment between the trigger and the popover.                                                                                                                                                          |
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

<pre class="language-html"><code class="language-html">&lt;auro-popover&gt;
  Top popover content!
  &lt;auro-button slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Apply popover to any type of content

The trigger can be any element, not just buttons or links. The component automatically makes any non-focusable trigger keyboard accessible — including custom elements like `auro-icon` that have no internal focusable element. For icon-based triggers without visible text, `aria-label` is still required to provide an accessible name.

> **Accessibility note:** `auro-popover` manages `aria-description` on the focusable element(s) within the trigger slot as part of its accessibility contract — the popover content becomes the trigger's accessible description so screen readers can announce it on focus. When the trigger is a non-focusable wrapper around focusable content (e.g. `<div><a href="#">link</a></div>`), the description is applied to each focusable descendant rather than the wrapper itself. Any existing `aria-description` on affected elements will be replaced when the component connects and removed when it disconnects.
>
> **Keyboard behavior:** Non-interactive triggers (e.g. `<abbr>`, `<auro-icon>`) are automatically made keyboard accessible with `tabindex="0"`. `Space` and `Enter` toggle the popover open and closed, ensuring keyboard-only users have parity with mouse/hover users. This is intentional — accessibility covers more than screen readers, and without activation semantics a keyboard-only user has no way to interact with a non-interactive trigger.

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

<pre class="language-html"><code class="language-html">&lt;!-- auro-icon has no internal focusable element, so the component automatically
     adds tabindex. aria-label is still required to provide an accessible name. --&gt;
&lt;auro-popover&gt;
  This flight offers priority boarding.
  &lt;auro-icon slot="trigger" category="interface" name="info-stroke" aria-label="More information"&gt;&lt;/auro-icon&gt;
&lt;/auro-popover&gt;
&lt;br&gt;&lt;br&gt;
&lt;!-- Native elements like &lt;abbr&gt; are automatically made keyboard accessible by the component --&gt;
&lt;p&gt;Congratulations, you just achieved
  &lt;auro-popover&gt;
    Most Valuable Passenger — Alaska Airlines' mid-tier elite status level.
    &lt;abbr slot="trigger" style="color: orangered"&gt;MVP&lt;/abbr&gt;
  &lt;/auro-popover&gt; status!
&lt;/p&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property & Attribute Examples

### Add Space Around Popover

Use the `addspace` attribute to add more space between the popover and it's trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/add-space.html) -->
<!-- The below content is automatically added from ../apiExamples/add-space.html -->
<auro-popover addspace>
    Notice this popover is a little<br>further away from the trigger.
<auro-button slot="trigger">Popover w/additional space above</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/add-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/add-space.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover addspace&gt;
  Notice this popover is a little&lt;br&gt;further away from the trigger.
  &lt;auro-button slot="trigger"&gt;Popover w/additional space above&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;strong&gt;Example with no boundary set&lt;/strong&gt;
&lt;div style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;"&gt;
  &lt;auro-popover placement="bottom"&gt;
    Popover content!
    &lt;auro-button slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
&lt;/div&gt;
&lt;strong&gt;Example with boundary set&lt;/strong&gt;
&lt;div id="popoverBoundary" style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;"&gt;
  &lt;auro-popover class="boundaryExample" placement="bottom"&gt;
    Popover content!
    &lt;auro-button slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/boundary.js -->

<pre class="language-js"><code class="language-js">export function boundaryExample() {
  const boundaryExample = document.querySelector(".boundaryExample");
  const popoverBoundary = document.querySelector("#popoverBoundary");
​
  boundaryExample.boundary = popoverBoundary;
}</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-popover disabled&gt;
  Top popover content!
  &lt;auro-button disabled slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
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

<pre class="language-html"><code class="language-html">&lt;auro-popover placement="bottom"&gt;
  Bottom popover content!
  &lt;auro-button slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Remove Space Around Popover

Use the `removespace` attribute to lessen the space between the popover and it's trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/remove-space.html) -->
<!-- The below content is automatically added from ../apiExamples/remove-space.html -->
<auro-popover removespace>
    Notice this popover is a little<br>closer to the trigger.
<auro-button slot="trigger">Popover w/less space above</auro-button>
</auro-popover>
<auro-popover placement="bottom" removespace>
    Notice this popover is a little<br>closer to the trigger.
<auro-button slot="trigger">Popover w/less space below</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/remove-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/remove-space.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover removespace&gt;
  Notice this popover is a little&lt;br&gt;closer to the trigger.
  &lt;auro-button slot="trigger"&gt;Popover w/less space above&lt;/auro-button&gt;
&lt;/auro-popover&gt;
&lt;auro-popover placement="bottom" removespace&gt;
  Notice this popover is a little&lt;br&gt;closer to the trigger.
  &lt;auro-button slot="trigger"&gt;Popover w/less space below&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
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
<!-- The below content is automatically added from ../apiExamples/not-recommended.html -->
<auro-popover>
      This works, but not recommended
<auro-hyperlink href="#" relative nav slot="trigger">hyperlink popover trigger</auro-hyperlink>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-alert>
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/not-recommended.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/not-recommended.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover&gt;
  This works, but not recommended
  &lt;auro-hyperlink href="#" relative nav slot="trigger"&gt;hyperlink popover trigger&lt;/auro-hyperlink&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>
In the event that a hyperlink UI is desired, it is recommended to use the `role="button"` semantic reassignment to the hyperlink element.

<div class="exampleWrapper">
<auro-alert type="success" noIcon>
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/recommended.html) -->
<!-- The below content is automatically added from ../apiExamples/recommended.html -->
<auro-popover>
      Role button is recommended
<auro-hyperlink role="button" slot="trigger">hyperlink, role button</auro-hyperlink>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-alert>
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/recommended.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/recommended.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover&gt;
  Role button is recommended
  &lt;auro-hyperlink role="button" slot="trigger"&gt;hyperlink, role button&lt;/auro-hyperlink&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Style Component with CSS Shadow Parts

The component exposes the `popover` bubble, the `arrow`, and the `trigger` wrapper as CSS shadow parts, so they can be styled from outside the shadow DOM.

Two things to know before reaching for these:

**The arrow's visible shape is a pseudo-element.** `::part(arrow)` selects an invisible positioning anchor; the diamond you see is its `::before`. Target `::part(arrow)::before` to change color, shadow, or size. Because the arrow and the bubble are painted separately, recolor both together or the seam between them will show.

**The arrow's position belongs to the component.** Placement is set by Popper as inline styles that are recalculated every time the popover opens, so `transform`, `top`, `left`, and `position` cannot be overridden through `::part(arrow)`. Use the `placement` attribute to choose which side the popover appears on. Resizing the arrow via `::part(arrow)::before` also shifts where it meets the bubble, so verify both `placement="top"` and `placement="bottom"` if you change its dimensions.

To adjust spacing between the popover and its trigger, prefer the `addspace` and `removespace` attributes over part overrides.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/cssParts.html) -->
<!-- The below content is automatically added from ../apiExamples/cssParts.html -->
<!-- Selectors are scoped to .cssPartsExample so this demo does not restyle
  other popovers on the page. Keep every line in this <style> block at column
  zero with no blank lines: the docs generator indents injected examples, and
  markdown turns 4-space-indented lines into a code block, which silently
  breaks the stylesheet. -->
<style>
  /* The bubble container. */
  .cssPartsExample auro-popover::part(popover) {
  color: #fff;
  border-radius: 0;
  background-color: #01426a;
  }
  /* The visible arrow is the ::before pseudo-element of the arrow part, so
  recolor that rather than ::part(arrow) itself. Keep it matched to the
  bubble's background or the seam between them will show. */
  .cssPartsExample auro-popover::part(arrow)::before {
  box-shadow: none;
  background-color: #01426a;
  }
  /* The trigger wrapper. Use it to line an icon trigger up with adjacent text
  instead of resorting to layout workarounds. */
  .cssPartsExample .iconTrigger auro-popover::part(trigger) {
  display: inline-flex;
  align-items: center;
  }
</style>
<div class="cssPartsExample">
<auro-popover>
      This bubble and its arrow are restyled from outside the shadow DOM.
<auro-button slot="trigger">Popover Test</auro-button>
</auro-popover>
<p class="iconTrigger">
      Checked baggage fees apply
<auro-popover placement="bottom">
        Fees vary by route and fare class.
<auro-icon slot="trigger" category="interface" name="info-stroke" aria-label="More information"></auro-icon>
</auro-popover>
</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/cssParts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/cssParts.html -->

<pre class="language-html"><code class="language-html">&lt;!-- Selectors are scoped to .cssPartsExample so this demo does not restyle
other popovers on the page. Keep every line in this &lt;style&gt; block at column
zero with no blank lines: the docs generator indents injected examples, and
markdown turns 4-space-indented lines into a code block, which silently
breaks the stylesheet. --&gt;
&lt;style&gt;
/* The bubble container. */
.cssPartsExample auro-popover::part(popover) {
color: #fff;
border-radius: 0;
background-color: #01426a;
}
/* The visible arrow is the ::before pseudo-element of the arrow part, so
recolor that rather than ::part(arrow) itself. Keep it matched to the
bubble's background or the seam between them will show. */
.cssPartsExample auro-popover::part(arrow)::before {
box-shadow: none;
background-color: #01426a;
}
/* The trigger wrapper. Use it to line an icon trigger up with adjacent text
instead of resorting to layout workarounds. */
.cssPartsExample .iconTrigger auro-popover::part(trigger) {
display: inline-flex;
align-items: center;
}
&lt;/style&gt;
&lt;div class="cssPartsExample"&gt;
  &lt;auro-popover&gt;
    This bubble and its arrow are restyled from outside the shadow DOM.
    &lt;auro-button slot="trigger"&gt;Popover Test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
  &lt;p class="iconTrigger"&gt;
    Checked baggage fees apply
    &lt;auro-popover placement="bottom"&gt;
      Fees vary by route and fare class.
      &lt;auro-icon slot="trigger" category="interface" name="info-stroke" aria-label="More information"&gt;&lt;/auro-icon&gt;
    &lt;/auro-popover&gt;
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Restyle Component with CSS Variables

The component may be restyled by changing the values of the following token(s).

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
​
:host {
  --ds-auro-popover-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-popover-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-popover-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
