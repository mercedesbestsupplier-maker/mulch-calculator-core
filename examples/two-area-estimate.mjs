import { estimateAreas } from '../src/mulch-calculator.mjs';

const estimate = estimateAreas([
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

console.log(JSON.stringify(estimate, null, 2));
