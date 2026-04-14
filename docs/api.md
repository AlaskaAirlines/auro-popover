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