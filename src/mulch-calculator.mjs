const FEET_PER_METER = 3.280839895013123;
const SQUARE_FEET_PER_SQUARE_METER = FEET_PER_METER ** 2;
const CUBIC_FEET_PER_CUBIC_METER = FEET_PER_METER ** 3;
const CUBIC_FEET_PER_CUBIC_YARD = 27;

const requirePositive = (value, label) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new RangeError(`${label} must be a positive number.`);
  }
  return number;
};

const optionalNonNegative = (value, label) => {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new RangeError(`${label} must be a non-negative number.`);
  }
  return number;
};

const round = (value, places = 6) => Number(value.toFixed(places));

const lengthToFeet = (value, unitSystem) => {
  const number = requirePositive(value, 'dimension');
  if (unitSystem === 'imperial') return number;
  if (unitSystem === 'metric') return number * FEET_PER_METER;
  throw new RangeError('unitSystem must be imperial or metric.');
};

const depthToFeet = (value, depthUnit) => {
  const number = requirePositive(value, 'depth');
  if (depthUnit === 'in') return number / 12;
  if (depthUnit === 'ft') return number;
  if (depthUnit === 'cm') return number / 30.48;
  if (depthUnit === 'm') return number * FEET_PER_METER;
  throw new RangeError('depthUnit must be in, ft, cm, or m.');
};

export function areaSquareFeet(area) {
  const unitSystem = area.unitSystem ?? 'imperial';

  if (area.shape === 'rectangle' || area.shape === 'square') {
    const length = lengthToFeet(area.length, unitSystem);
    const width = area.shape === 'square'
      ? length
      : lengthToFeet(area.width, unitSystem);
    return round(length * width);
  }

  if (area.shape === 'circle') {
    const diameter = lengthToFeet(area.diameter, unitSystem);
    return round(Math.PI * (diameter / 2) ** 2);
  }

  throw new RangeError('shape must be rectangle, square, or circle.');
}

export function estimateArea(area, options = {}) {
  const squareFeet = areaSquareFeet(area);
  const depthFeet = depthToFeet(area.depth, area.depthUnit ?? (area.unitSystem === 'metric' ? 'cm' : 'in'));
  const cubicFeet = squareFeet * depthFeet;
  const bagSize = optionalNonNegative(options.bagSizeCubicFeet, 'bagSizeCubicFeet');
  const bags = bagSize && bagSize > 0 ? Math.ceil(cubicFeet / bagSize) : null;

  return {
    name: area.name ?? 'Area',
    squareFeet: round(squareFeet),
    squareMeters: round(squareFeet / SQUARE_FEET_PER_SQUARE_METER),
    cubicFeet: round(cubicFeet),
    cubicYards: round(cubicFeet / CUBIC_FEET_PER_CUBIC_YARD),
    cubicMeters: round(cubicFeet / CUBIC_FEET_PER_CUBIC_METER),
    bags,
  };
}

export function estimateAreas(areas, options = {}) {
  if (!Array.isArray(areas) || areas.length === 0) {
    throw new RangeError('areas must be a non-empty array.');
  }

  const results = areas.map((area) => estimateArea(area, options));
  const totalSquareFeet = results.reduce((sum, area) => sum + area.squareFeet, 0);
  const totalCubicFeet = results.reduce((sum, area) => sum + area.cubicFeet, 0);
  const totalBags = results.some((area) => area.bags === null)
    ? null
    : results.reduce((sum, area) => sum + area.bags, 0);

  const rates = options.rates ?? {};
  const materialRate = optionalNonNegative(rates.materialPerCubicYard, 'materialPerCubicYard');
  const deliveryFlat = optionalNonNegative(rates.deliveryFlat, 'deliveryFlat');
  const laborRate = optionalNonNegative(rates.laborPerSquareFoot, 'laborPerSquareFoot');
  const canCalculateCost = [materialRate, deliveryFlat, laborRate].every((rate) => rate !== null);

  const cost = canCalculateCost ? {
    material: round((totalCubicFeet / CUBIC_FEET_PER_CUBIC_YARD) * materialRate, 2),
    delivery: round(deliveryFlat, 2),
    labor: round(totalSquareFeet * laborRate, 2),
  } : null;

  if (cost) cost.total = round(cost.material + cost.delivery + cost.labor, 2);

  return {
    areas: results,
    totals: {
      squareFeet: round(totalSquareFeet),
      squareMeters: round(totalSquareFeet / SQUARE_FEET_PER_SQUARE_METER),
      cubicFeet: round(totalCubicFeet),
      cubicYards: round(totalCubicFeet / CUBIC_FEET_PER_CUBIC_YARD),
      cubicMeters: round(totalCubicFeet / CUBIC_FEET_PER_CUBIC_METER),
      bags: totalBags,
    },
    cost,
  };
}

export const conversions = Object.freeze({
  feetPerMeter: FEET_PER_METER,
  squareFeetPerSquareMeter: SQUARE_FEET_PER_SQUARE_METER,
  cubicFeetPerCubicMeter: CUBIC_FEET_PER_CUBIC_METER,
  cubicFeetPerCubicYard: CUBIC_FEET_PER_CUBIC_YARD,
});
