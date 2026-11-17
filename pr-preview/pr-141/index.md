<!--
 THIS PAGE'S CONTENT SHOULD BE KEPT MINIMAL.
 ONLY ADD EXAMPLES THAT ARE TRULY NECESSARY FOR THE INDEX PAGE. THE BASIC EXAMPLE IS USUALLY ENOUGH.
 ALL OTHER EXAMPLES SHOULD GO IN THE API DOCUMENTATION.
-->

# Popover

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/description.md) -->
<!-- The below content is automatically added from ./../docs/partials/description.md -->
Shows short supporting content next to a trigger when someone hovers over, focuses, or taps it. It uses the [Popper.js](https://popper.js.org/) library to position itself relative to the trigger and supports placements such as `top` and `bottom`.
<!-- AURO-GENERATED-CONTENT:END -->

## Use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./../docs/partials/useCases.md) -->
<!-- The below content is automatically added from ./../docs/partials/useCases.md -->
Use `auro-popover` to give people more detail without leaving the page, such as:

* A short clarification of content they're reading.
* A definition for an icon.
* Helper text for a control.
<!-- AURO-GENERATED-CONTENT:END -->

## Developer Notes

The popover shows when someone hovers over or focuses the trigger. Hover isn't reliable on touch devices, so a tap, detected with `touchstart`, also toggles the popover.

## Examples

### Basic

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
