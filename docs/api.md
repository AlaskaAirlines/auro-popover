# auro-popover

Popover attaches to an element and displays on hover/blur.

## Properties

| Property         | Attribute   | Type      | Default | Description                                      |
|------------------|-------------|-----------|---------|--------------------------------------------------|
| `for`            | `for`       | `String`  |         | Defines an `id` for an element in the DOM to trigger on hover/blur. |
| `isModalVisible` |             | `boolean` | false   |                                                  |
| `placement`      | `placement` | `String`  | "top"   | Expects top/bottom - position for popover in relation to the element. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Default unnamed slot for the use of popover content |
| `trigger` | Slot for entering the trigger element into the scope of the shadow DOM |
