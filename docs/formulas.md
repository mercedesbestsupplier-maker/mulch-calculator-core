# Mulch estimation formulas

## Area

- Rectangle: `length × width`
- Square: `side × side`
- Circle from diameter: `π × (diameter ÷ 2)²`

Calculate each area separately when beds use different depths.

## Volume

Convert depth to the same length unit as the area dimensions, then use:

`volume = area × depth`

For imperial inputs:

- `depth in feet = depth in inches ÷ 12`
- `cubic yards = cubic feet ÷ 27`

For metric outputs, the library uses the exact international foot definition:

- `1 foot = 0.3048 meters`

## Bags

`bags for an area = ceiling(area volume in cubic feet ÷ bag size in cubic feet)`

The library rounds each area's bag count up before totaling bags. This prevents a partial bag from one area from being treated as interchangeable with a partial bag from another area.

## Optional costs

The library does not ship with default prices. If all three rates are supplied:

- `material cost = total cubic yards × material rate per cubic yard`
- `delivery cost = user-supplied flat delivery charge`
- `labor cost = total square feet × labor rate per square foot`
- `total cost = material + delivery + labor`

These formulas are estimating aids. Supplier units, minimum quantities, access conditions, taxes, disposal, edging, preparation, and local labor scope may change an actual quote.
