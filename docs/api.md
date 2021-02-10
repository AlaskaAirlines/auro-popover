# auro-popover

Popover attaches to an element and displays on hover/blur.

## Attributes

| Attribute          | Type      | Description                               |
|--------------------|-----------|-------------------------------------------|
| `isPopoverVisible` | `boolean` | Boolean for if popover is visible or not. |

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| `for`       | `for`       | `String`  |         | Defines an `id` for an element in the DOM to trigger on hover/blur. |
| `placement` | `placement` | `String`  | "top"   | Expects top/bottom - position for popover in relation to the element. |
| `sticky`    | `sticky`    | `boolean` |         | If true, when user clicks trigger, the popover will persist its visibility. If false, popover will disappear when mouseout over trigger. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Default unnamed slot for the use of popover content |
| `trigger` | Slot for entering the trigger element into the scope of the shadow DOM |
