# Mulch Calculator Core

Dependency-free JavaScript functions, reference tables, and project checklists for estimating mulch volume and bag counts.

The library supports:

- Rectangle, square, and circle areas
- Imperial and metric dimensions
- A separate mulch depth for every area
- Cubic feet, cubic yards, and cubic meters
- Whole-bag rounding by area
- Optional user-supplied material, delivery, and labor rates

An interactive browser version is available at [CoverCalc Pro](https://covercalcpro.com/).

## Use from source

This package is not published to npm. Clone or download this repository and import `src/mulch-calculator.mjs` directly.

## Example

```js
import { estimateAreas } from './src/mulch-calculator.mjs';

const result = estimateAreas([
  {
    name: 'Front bed',
    shape: 'rectangle',
    unitSystem: 'imperial',
    length: 20,
    width: 8,
    depth: 3,
    depthUnit: 'in',
  },
  {
    name: 'Tree ring',
    shape: 'circle',
    unitSystem: 'imperial',
    diameter: 10,
    depth: 2,
    depthUnit: 'in',
  },
], { bagSizeCubicFeet: 2 });

console.log(result.totals.cubicYards);
console.log(result.totals.bags);
```

## Optional cost rates

Cost inputs are deliberately blank by default. Installation prices are local and can vary by delivery distance, access, minimum charges, labor scope, and material type. Pass your own rates when you have a supplier quote:

```js
const rates = {
  materialPerCubicYard: 0,
  deliveryFlat: 0,
  laborPerSquareFoot: 0,
};
```

## Data files

- `data/bag-coverage-by-depth.csv`: coverage derived from bag volume and depth
- `data/unit-conversions.csv`: conversion factors used by the library
- `checklists/mulch-project-input-checklist.md`: inputs to gather before estimating
- `docs/formulas.md`: formulas, units, and rounding rules

## Test

```bash
npm test
```

## License

MIT
