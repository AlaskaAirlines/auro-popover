# auro-popover

Popover attaches to an element and displays on hover/blur.

## Attributes

| Attribute     | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| `addSpace`    | `boolean` | If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger |
| `removeSpace` | `boolean` | If true, will remove top and bottom space around the appearance of the popover in relation to the trigger |

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| `disabled`  | `disabled`  | `boolean` |         | If true, will disable the popover from showing on hover and focus |
| `for`       | `for`       | `String`  |         | Directly associate the popover with a trigger element with the given ID. In most cases, this should not be necessary and set slot="trigger" on the element instead. |
| `placement` | `placement` | `String`  | "top"   | Expects top/bottom - position for popover in relation to the element |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Default unnamed slot for the use of popover content |
| `trigger` | The element in this slot triggers hiding and showing the popover. |
