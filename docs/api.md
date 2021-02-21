# auro-popover

Popover attaches to an element and displays on hover/blur.

## Attributes

| Attribute  | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| `addSpace` | `boolean` | If true, will add additional top and bottom space around the appearance of the popover in relation to the trigger.. |

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| `for`       | `for`       | `String`  |         | Defines an `id` for an element in the DOM to trigger on hover/blur. |
| `placement` | `placement` | `String`  | "top"   | Expects top/bottom - position for popover in relation to the element. |
| `sticky`    | `sticky`    | `boolean` |         | If true, popover will persist its visibility when clicked. |

## Methods

| Method   | Type       | Description                                      |
|----------|------------|--------------------------------------------------|
| `toggle` | `(): Void` | For use with `sticky` property, call method on click event |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Default unnamed slot for the use of popover content |
| `trigger` | Slot for entering the trigger element into the scope of the shadow DOM |
