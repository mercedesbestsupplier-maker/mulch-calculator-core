import test from 'node:test';
import assert from 'node:assert/strict';
import { areaSquareFeet, estimateArea, estimateAreas } from '../src/mulch-calculator.mjs';

test('calculates a rectangle in feet', () => {
  assert.equal(areaSquareFeet({ shape: 'rectangle', length: 20, width: 8, unitSystem: 'imperial' }), 160);
});

test('calculates a circle from its diameter', () => {
  const area = areaSquareFeet({ shape: 'circle', diameter: 10, unitSystem: 'imperial' });
  assert.ok(Math.abs(area - 78.539816) < 0.000001);
});

test('converts metric dimensions', () => {
  const area = areaSquareFeet({ shape: 'rectangle', length: 3, width: 2, unitSystem: 'metric' });
  assert.ok(Math.abs(area - 64.583463) < 0.000001);
});

test('rounds bag counts up for each area', () => {
  const result = estimateArea({
    name: 'Bed',
    shape: 'rectangle',
    unitSystem: 'imperial',
    length: 10,
    width: 10,
    depth: 3,
    depthUnit: 'in',
  }, { bagSizeCubicFeet: 2 });

  assert.equal(result.cubicFeet, 25);
  assert.equal(result.bags, 13);
});

test('returns no cost when any price input is omitted', () => {
  const result = estimateAreas([{
    shape: 'square',
    unitSystem: 'imperial',
    length: 10,
    depth: 2,
    depthUnit: 'in',
  }], { rates: { materialPerCubicYard: 40 } });

  assert.equal(result.cost, null);
});

test('calculates cost only from user-supplied rates', () => {
  const result = estimateAreas([{
    shape: 'rectangle',
    unitSystem: 'imperial',
    length: 27,
    width: 10,
    depth: 1.2,
    depthUnit: 'in',
  }], {
    rates: {
      materialPerCubicYard: 50,
      deliveryFlat: 25,
      laborPerSquareFoot: 0.5,
    },
  });

  assert.deepEqual(result.cost, {
    material: 50,
    delivery: 25,
    labor: 135,
    total: 210,
  });
});

test('rejects invalid dimensions', () => {
  assert.throws(
    () => areaSquareFeet({ shape: 'rectangle', length: 0, width: 5 }),
    /positive number/,
  );
});
