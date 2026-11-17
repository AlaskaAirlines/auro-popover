# auro-popover

Shows short supporting content next to a trigger when someone hovers over, focuses, or taps it.

**Key capabilities**

- **Keyboard and screen reader support**: A trigger that can't take focus is made reachable with the keyboard, and screen readers announce the popover text as the trigger's description.
- **Placement**: The popover appears above the trigger by default, or below it with `placement="bottom"`.
- **Turn off**: The `disabled` attribute stops the popover from showing.
- **Restyling**: The `popover`, `arrow`, and `trigger` CSS parts let you restyle the bubble, its arrow, and the trigger wrapper.

### Properties and attributes

| Properties  | Attributes  | Modifiers | Type             | Default | Description                                                                                                                                                                                                                                 |
| ----------- | ----------- | --------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addSpace    | addspace    |           | boolean          |         | Adds more space between the popover and its trigger. When `removeSpace` is also set, `addSpace` takes effect.                                                                                                                               |
| boundary    | boundary    |           | string \| object |         | Sets the element that keeps the popover from overflowing, such as a selector string or an HTML element.                                                                                                                                     |
| disabled    | disabled    |           | boolean          |         | Turns the popover off. A disabled popover doesn't show on hover, focus, touch, or keyboard activation.                                                                                                                                      |
| for         | for         |           | string           |         | Sets the ID of the trigger element, for when the trigger can't use the `trigger` slot. In most cases, set `slot="trigger"` on the element instead.                                                                                          |
| placement   | placement   |           | string           | `top`   | Sets the popover's position: above the trigger with `top` (the default), or below it with `bottom`. The popover flips to the opposite side when there isn't room. Changing this after the first render does not currently move the popover. |
| removeSpace | removespace |           | boolean          |         | Reduces the space between the popover and its trigger, so the popover sits closer to it. Has no effect when `addSpace` is also set.                                                                                                         |

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

| Name    | Description                                                                                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arrow   | The arrow that points from the popover to its trigger. Its visible shape is the `::before` pseudo-element, where color, shadow, and size are set. The component sets the arrow's position.                |
| popover | The popover bubble that holds the content.                                                                                                                                                                |
| trigger | The wrapper around the `trigger` slot, useful for correcting alignment between the trigger and the popover. Empty when the `for` attribute is used, because the trigger then lives outside the component. |

### CSS custom properties

| Name                              | Description                                                                                                                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --ds-auro-popover-boxshadow-color | Shadow around the popover bubble. The default is a full `box-shadow` value (offsets, blur, and color), not a color alone.                                                                       |
| --ds-auro-popover-container-color | Background color of the popover.                                                                                                                                                                |
| --ds-auro-popover-text-color      | Text color of elements placed in the popover, such as a `<p>` or `<span>`. Plain text that isn't wrapped in an element doesn't currently use it, and elements in the `trigger` slot use it too. |