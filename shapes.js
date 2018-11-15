/**
 * Returns vertices of equilateral triangle that fits in a given area
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas
 * @param {number} [padding] Padding from canvas edge
 * @returns {Array<Array<number>>} List of dot coordinates
 */
const createTriangle = (width, height, padding) => {
  if (padding) {
    const triangle = createTriangle(width - padding * 2, height - padding * 2);

    return triangle.map(vertex => vertex.map(axis => axis + padding));
  }

  //     B
  //    /|\
  // a / |h\ a
  //  /__|__\
  // A       C

  const h = height;
  const a = h / (Math.sqrt(3) / 2);

  const A = [width / 2 - a / 2, height];
  const B = [width / 2, 0];
  const C = [width / 2 + a / 2, height];

  return [A, B, C];
};

const createHexagon = (width, height, padding) => {
  if (padding) {
    const hexagon = createHexagon(width - padding * 2, height - padding * 2);

    return hexagon.map(vertex => vertex.map(axis => axis + padding));
  }

  // https://ege.sdamgia.ru/get_file?id=22943
  const a = height / 2;
  const AE = a * Math.sqrt(3);

  const A = [width / 2, height];
  const B = [width / 2 + AE / 2, height - a / 2];
  const C = [width / 2 + AE / 2, a / 2];
  const D = [width / 2, 0];
  const E = [width / 2 - AE / 2, a / 2];
  const F = [width / 2 - AE / 2, height - a / 2];

  return [A, B, C, D, E, F];
};
