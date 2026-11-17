<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/api.md) -->
<!-- The below content is automatically added from ./../docs/api.md -->

# auro-popover

Shows short supporting content next to a trigger when someone hovers over, focuses, or taps it.

**Key capabilities**

- **Keyboard and screen reader support**: A trigger that can't take focus is made reachable with the keyboard, and screen readers announce the popover text as the trigger's description.
- **Placement**: The popover appears above the trigger by default, or below it with `placement="bottom"`.
- **Turn off**: The `disabled` attribute stops the popover from showing.
- **Restyling**: The `popover`, `arrow`, and `trigger` CSS parts let you restyle the bubble, its arrow, and the trigger wrapper.

### Properties and attributes

| Properties  | Attributes  | Modifiers | Type             | Default | Description                                                                                                                                                                                                                             |
| ----------- | ----------- | --------- | ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addSpace    | addspace    |           | boolean          |         | Adds more space between the popover and its trigger. When `removeSpace` is also set, `addSpace` takes effect.                                                                                                                           |
| boundary    | boundary    |           | string \| object |         | Sets the element that keeps the popover from overflowing, such as a selector string or an HTML element.                                                                                                                                 |
| disabled    | disabled    |           | boolean          |         | Turns the popover off. A disabled popover doesn't show on hover, focus, touch, or keyboard activation.                                                                                                                                  |
| for         | for         |           | string           |         | Sets the ID of the trigger element, for when the trigger can't use the `trigger` slot. In most cases, set `slot="trigger"` on the element instead.                                                                                      |
| placement   | placement   |           | string           | `top`   | Sets where the popover appears in relation to its trigger. Use `top` (the default) or `bottom`. The popover flips to the opposite side when there isn't room. Changing this after the first render does not currently move the popover. |
| removeSpace | removespace |           | boolean          |         | Reduces the space between the popover and its trigger, so the popover sits closer to it. Has no effect when `addSpace` is also set.                                                                                                     |

### Methods

| Name     | Parameters                                                    | Return | Description                                              |
| -------- | ------------------------------------------------------------- | ------ | -------------------------------------------------------- |
| register | `name` (string) - The tag name to register the element under. |        | Registers the element with the browser under a tag name. |

### Slots

| Name      | Description                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| (default) | The content shown in the popover. Screen readers announce its text as the trigger's description, so use plain text. |
| trigger   | The element in this slot triggers hiding and showing the popover.                                                   |

### CSS shadow parts

| Name    | Description                                                                                                                                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arrow   | The positioning anchor for the popover's arrow. The visible arrow shape is its `::before` pseudo-element, so target `::part(arrow)::before` to change color, shadow, or size. Popper sets the arrow's position, so don't override it through this part. |
| popover | The popover bubble that holds the content.                                                                                                                                                                                                              |
| trigger | The wrapper around the `trigger` slot, useful for correcting alignment between the trigger and the popover. Empty when the `for` attribute is used, because the trigger then lives outside the component.                                               |

### CSS custom properties

| Name                              | Description                             |
| --------------------------------- | --------------------------------------- |
| --ds-auro-popover-boxshadow-color | Color of the shadow around the popover. |
| --ds-auro-popover-container-color | Background color of the popover.        |
| --ds-auro-popover-text-color      | Color of the popover text.              |
<!-- AURO-GENERATED-CONTENT:END -->

## Basic

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/basic.html) -->
<!-- The below content is automatically added from ./../apiExamples/basic.html -->
<auro-popover>
    Top popover content!
<auro-button slot="trigger">Popover test</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../apiExamples/basic.html) -->
<!-- The below code snippet is automatically added from ./../apiExamples/basic.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover&gt;
  Top popover content!
  &lt;auro-button slot="trigger"&gt;Popover test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Apply popover to any type of content

The trigger can be any element, not just buttons or links. The component automatically makes any non-focusable trigger keyboard accessible, including custom elements like `auro-icon` that have no internal focusable element. For icon-based triggers without visible text, `aria-label` is still required to provide an accessible name.

> **Accessibility note:** `auro-popover` manages `aria-description` on the focusable elements within the trigger slot as part of its accessibility contract. The popover content becomes the trigger's accessible description, so screen readers announce it on focus. When the trigger is a non-focusable wrapper around focusable content, such as `<div><a href="#">link</a></div>`, the description is applied to each focusable descendant rather than the wrapper itself. The component replaces any existing `aria-description` on affected elements when it first renders and removes it when it disconnects.
>
> **Keyboard behavior:** Non-interactive triggers, such as `<abbr>` and `<auro-icon>`, are automatically made keyboard accessible with `tabindex="0"`. `Space` and `Enter` toggle the popover open and closed, so keyboard-only users get the same access as mouse and hover users. Without activation semantics, a keyboard-only user has no way to interact with a non-interactive trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../apiExamples/non-interactive-triggers.html) -->
<!-- The below content is automatically added from ./../apiExamples/non-interactive-triggers.html -->
<!-- auro-icon has no internal focusable element, so the component automatically
       adds tabindex. aria-label is still required to provide an accessible name. -->
<auro-popover>
    This flight offers priority boarding.
<auro-icon slot="trigger" category="interface" name="information-stroke" aria-label="More information"></auro-icon>
</auro-popover>
<br><br>
<!-- Native elements like <abbr> are automatically made keyboard accessible by the component -->
<p>Congratulations, you just achieved
<auro-popover>
      Most Valuable Passenger: Alaska Airlines' mid-tier elite status level.
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
  &lt;auro-icon slot="trigger" category="interface" name="information-stroke" aria-label="More information"&gt;&lt;/auro-icon&gt;
&lt;/auro-popover&gt;
&#10;&lt;br&gt;&lt;br&gt;
&#10;&lt;!-- Native elements like &lt;abbr&gt; are automatically made keyboard accessible by the component --&gt;
&lt;p&gt;Congratulations, you just achieved
  &lt;auro-popover&gt;
    Most Valuable Passenger: Alaska Airlines' mid-tier elite status level.
    &lt;abbr slot="trigger" style="color: orangered"&gt;MVP&lt;/abbr&gt;
  &lt;/auro-popover&gt; status!
&lt;/p&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## Property and attribute examples

### Add space around popover

Use the `addspace` attribute to add more space between the popover and its trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/add-space.html) -->
<!-- The below content is automatically added from ../apiExamples/add-space.html -->
<auro-popover addspace>
    Notice this popover is a little<br>further away from the trigger.
<auro-button slot="trigger">Popover with additional space above</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/add-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/add-space.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover addspace&gt;
  Notice this popover is a little&lt;br&gt;further away from the trigger.
  &lt;auro-button slot="trigger"&gt;Popover with additional space above&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Boundary

Use the `boundary` property to keep the popover inside a container, shifting it horizontally when it would overflow. This example shows a popover in a container without a `boundary` and one in a container with a `boundary`. Set `boundary` to a selector string in HTML or JavaScript. To use an HTML element, set the property in JavaScript.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/boundary.html) -->
<!-- The below content is automatically added from ../apiExamples/boundary.html -->
<strong>Example with no boundary set</strong>
<div style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
<auro-popover placement="bottom">
      Popover content!
<auro-button slot="trigger">Popover test</auro-button>
</auro-popover>
</div>
<strong>Example with boundary set</strong>
<div id="popoverBoundary" style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;">
<auro-popover class="boundaryExample" placement="bottom">
      Popover content!
<auro-button slot="trigger">Popover test</auro-button>
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
    &lt;auro-button slot="trigger"&gt;Popover test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
&lt;/div&gt;
&#10;&lt;strong&gt;Example with boundary set&lt;/strong&gt;
&lt;div id="popoverBoundary" style="height: 150px; width: 200px; background-color: #fcfcfc; border: 1px solid darkgray;"&gt;
  &lt;auro-popover class="boundaryExample" placement="bottom"&gt;
    Popover content!
    &lt;auro-button slot="trigger"&gt;Popover test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
&lt;/div&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/boundary.js) -->
<!-- The below code snippet is automatically added from ../apiExamples/boundary.js -->

<pre class="language-js"><code class="language-js">export function boundaryExample() {
  const boundaryExample = document.querySelector(".boundaryExample");
  const popoverBoundary = document.querySelector("#popoverBoundary");
&#10;  boundaryExample.boundary = popoverBoundary;
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Disabled

When the `disabled` attribute is present, the popover doesn't appear on hover, focus, touch, or keyboard activation.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/disabled.html) -->
<!-- The below content is automatically added from ../apiExamples/disabled.html -->
<auro-popover disabled>
    Top popover content!
<auro-button disabled slot="trigger">Popover test</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/disabled.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/disabled.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover disabled&gt;
  Top popover content!
  &lt;auro-button disabled slot="trigger"&gt;Popover test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Placement

Use the `placement` attribute to set the position of the popover in relation to the trigger element. Options are `top` and `bottom`. The popover flips to the opposite side when there isn't room.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/placement.html) -->
<!-- The below content is automatically added from ../apiExamples/placement.html -->
<auro-popover placement="bottom">
    Bottom popover content!
<auro-button slot="trigger">Popover test</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/placement.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/placement.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover placement="bottom"&gt;
  Bottom popover content!
  &lt;auro-button slot="trigger"&gt;Popover test&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

### Remove space around popover

Use the `removespace` attribute to lessen the space between the popover and its trigger.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/remove-space.html) -->
<!-- The below content is automatically added from ../apiExamples/remove-space.html -->
<auro-popover removespace>
    Notice this popover is a little<br>closer to the trigger.
<auro-button slot="trigger">Popover with less space above</auro-button>
</auro-popover>
<auro-popover placement="bottom" removespace>
    Notice this popover is a little<br>closer to the trigger.
<auro-button slot="trigger">Popover with less space below</auro-button>
</auro-popover>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/remove-space.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/remove-space.html -->

<pre class="language-html"><code class="language-html">&lt;auro-popover removespace&gt;
  Notice this popover is a little&lt;br&gt;closer to the trigger.
  &lt;auro-button slot="trigger"&gt;Popover with less space above&lt;/auro-button&gt;
&lt;/auro-popover&gt;
&#10;&lt;auro-popover placement="bottom" removespace&gt;
  Notice this popover is a little&lt;br&gt;closer to the trigger.
  &lt;auro-button slot="trigger"&gt;Popover with less space below&lt;/auro-button&gt;
&lt;/auro-popover&gt;</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
</auro-accordion>

## CSS shadow part examples

The component exposes the `popover` bubble, the `arrow`, and the `trigger` wrapper as CSS shadow parts, so they can be styled from outside the shadow DOM.

Three things to know before reaching for these:

**The arrow's visible shape is a pseudo-element.** `::part(arrow)` selects an invisible positioning anchor; the diamond you see is its `::before`. Target `::part(arrow)::before` to change color, shadow, or size. Because the arrow and the bubble are painted separately, recolor both together or the seam between them shows.

**The arrow's position is set by the component.** Popper sets the arrow's placement as inline styles that are recalculated every time the popover opens. Use the `placement` attribute to choose which side the popover appears on. Resizing the arrow via `::part(arrow)::before` also shifts where it meets the bubble, so check both `placement="top"` and `placement="bottom"` if you change its dimensions.

**The `trigger` part is empty when you use `for`.** It wraps the trigger slot, so it only has something to style when the trigger is slotted into the component. If you point at an external element with `for`, that element is not inside the wrapper and `::part(trigger)` silently does nothing. Style the external trigger directly instead.

To adjust spacing between the popover and its trigger, prefer the `addspace` and `removespace` attributes over part overrides.

<div class="exampleWrapper">
<!-- AURO-GENERATED-CONTENT:START (FILE:src=../apiExamples/cssParts.html) -->
<!-- The below content is automatically added from ../apiExamples/cssParts.html -->
<!-- Scoped to .cssPartsExample. Keep every line in this <style> block at
  column zero with no blank lines: the docs generator indents it, and a
  4-space indent turns it into a code block. -->
<style>
  /* Bubble container. */
  .cssPartsExample auro-popover::part(popover) {
  color: #fff;
  border-radius: 0;
  background-color: #01426a;
  }
  /* `color` above only reaches bare text; element content is matched by
  ::slotted(*), which beats inheritance. Set the token or markup loses contrast. */
  .cssPartsExample auro-popover {
  --ds-auro-popover-text-color: #fff;
  }
  /* The visible arrow is the part's ::before, not ::part(arrow) itself.
  Match the bubble background or a seam shows. */
  .cssPartsExample auro-popover::part(arrow)::before {
  background-color: #01426a;
  }
  /* Trigger wrapper: aligns an icon trigger with adjacent text. */
  .cssPartsExample .iconTrigger auro-popover::part(trigger) {
  display: inline-flex;
  align-items: center;
  }
</style>
<div class="cssPartsExample">
<auro-popover>
      This bubble and its arrow are restyled from outside the shadow DOM.
<auro-button slot="trigger">Popover test</auro-button>
</auro-popover>
<p class="iconTrigger">
      Checked baggage fees apply
<auro-popover placement="bottom">
        Fees vary by route and fare class.
<auro-icon slot="trigger" category="interface" name="information-stroke" aria-label="More information"></auro-icon>
</auro-popover>
</p>
</div>
<!-- AURO-GENERATED-CONTENT:END -->
</div>
<auro-accordion alignRight>
<span slot="trigger">See code</span>
<!-- AURO-GENERATED-CONTENT:START (CODE:src=../apiExamples/cssParts.html) -->
<!-- The below code snippet is automatically added from ../apiExamples/cssParts.html -->

<pre class="language-html"><code class="language-html">&lt;!-- Scoped to .cssPartsExample. Keep every line in this &lt;style&gt; block at
column zero with no blank lines: the docs generator indents it, and a
4-space indent turns it into a code block. --&gt;
&lt;style&gt;
/* Bubble container. */
.cssPartsExample auro-popover::part(popover) {
color: #fff;
border-radius: 0;
background-color: #01426a;
}
/* `color` above only reaches bare text; element content is matched by
::slotted(*), which beats inheritance. Set the token or markup loses contrast. */
.cssPartsExample auro-popover {
--ds-auro-popover-text-color: #fff;
}
/* The visible arrow is the part's ::before, not ::part(arrow) itself.
Match the bubble background or a seam shows. */
.cssPartsExample auro-popover::part(arrow)::before {
background-color: #01426a;
}
/* Trigger wrapper: aligns an icon trigger with adjacent text. */
.cssPartsExample .iconTrigger auro-popover::part(trigger) {
display: inline-flex;
align-items: center;
}
&lt;/style&gt;
&#10;&lt;div class="cssPartsExample"&gt;
  &lt;auro-popover&gt;
    This bubble and its arrow are restyled from outside the shadow DOM.
    &lt;auro-button slot="trigger"&gt;Popover test&lt;/auro-button&gt;
  &lt;/auro-popover&gt;
&#10;  &lt;p class="iconTrigger"&gt;
    Checked baggage fees apply
    &lt;auro-popover placement="bottom"&gt;
      Fees vary by route and fare class.
      &lt;auro-icon slot="trigger" category="interface" name="information-stroke" aria-label="More information"&gt;&lt;/auro-icon&gt;
    &lt;/auro-popover&gt;
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
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
If you need the look of a hyperlink, add `role="button"` to it so screen readers announce a button.

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

## Restyle with CSS custom properties

Restyle the component by changing the values of the following tokens.

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../src/styles/tokens.scss) -->
<!-- The below code snippet is automatically added from ./../src/styles/tokens.scss -->

<pre class="language-scss"><code class="language-scss">@use "@aurodesignsystem/design-tokens/dist/legacy/auro-classic/SCSSVariables" as vac;
@use "@aurodesignsystem/design-tokens/dist/themes/alaska/SCSSVariables--alaska" as v;
&#10;:host {
  --ds-auro-popover-boxshadow-color: var(--ds-elevation-200, #{vac.$ds-elevation-200});
  --ds-auro-popover-container-color: var(--ds-basic-color-surface-default, #{v.$ds-basic-color-surface-default});
  --ds-auro-popover-text-color: var(--ds-basic-color-texticon-default, #{v.$ds-basic-color-texticon-default});
}</code></pre>
<!-- AURO-GENERATED-CONTENT:END -->
