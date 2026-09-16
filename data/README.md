# Data dictionary

## bag-coverage-by-depth.csv

This table contains calculated coverage, not vendor claims or market prices.

| Column | Meaning |
|---|---|
| `bag_volume_cubic_feet` | Mulch volume printed on a bag, in cubic feet |
| `depth_inches` | Intended installed depth, in inches |
| `coverage_square_feet` | Square feet covered at that depth |
| `formula` | Formula used to produce the coverage value |

Each coverage value is calculated as:

`bag_volume_cubic_feet × 12 ÷ depth_inches`

## unit-conversions.csv

| Column | Meaning |
|---|---|
| `from_unit` | Source unit |
| `to_unit` | Destination unit |
| `multiply_by` | Factor multiplied by the source value |
| `status` | Whether the factor is exact or derived from an exact definition |

The foot-to-meter and inch-to-centimeter definitions are exact. Area and volume conversion factors are derived from the exact international foot definition.
