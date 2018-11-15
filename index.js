/**
 * Returns coordinate of barycenter of a shape
 * @param {Array<Array<number>>} shape List of vertices of a shape to find
 * the barycenter
 * @return {Array<number>}
 */
const getBarycenter = shape => {
  const min = [Math.min(...shape.map(axis => axis[0])), Math.min(...shape.map(axis => axis[1]))];

  return shape
    .map(axis => [axis[0] - min[0], axis[1] - min[1]])
    .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
    .map((axis, i) => axis / shape.length + min[i]);
};

/**
 * Creates function that draws circles on the specified context
 * @param {CanvasRenderingContext2D} context Context of canvas to draw
 */
const createCircleDrawer = context => {
  /**
   * Draws a circle
   * @param {Array<number>} point Coordinate of the circle center
   * @param {string} [color] Color of the circle
   * @param {number} [radius] The radius of the circle
   */
  return function drawCircle(point, color = '#000000', radius = 1) {
    context.beginPath();
    context.arc(point[0], point[1], radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
  };
};

/**
 * Starts drawing random dots
 * @param {HTMLCanvasElement} canvas Canvas to draw
 * @param {Array<Array<number>>} attractors List of dots for attract
 * @param {number} [attractRadius=1/2] Distance from each generated dot to its
 * attractor (from 0 to 1)
 * @param {number} [delay=0] Delay between dots drawings in milliseconds
 * @param {(dot: number) => void} [callback] Callback of every dot drawing
 * @returns Stop function
 */
const startChaosGame = (canvas, attractors, attractRadius = 1 / 2, delay = 0, callback) => {
  const width = canvas.width;
  const height = canvas.height;
  const context = canvas.getContext('2d');

  const drawPoint = createCircleDrawer(context);

  // Drawing attractors
  for (const vertex of attractors) {
    drawPoint(vertex);
  }

  /** Creates random dot based on previous */
  const createNextDotCoordinate = prevDot => {
    const attractor = attractors[(Math.random() * attractors.length) | 0];

    return [
      attractor[0] + (prevDot[0] - attractor[0]) * attractRadius,
      attractor[1] + (prevDot[1] - attractor[1]) * attractRadius
    ];
  };

  // Initial dot
  let currentDot = getBarycenter(attractors);
  drawPoint(currentDot, '#f00', 2);

  // Dot counter
  let dotCount = 0;

  const interval = setInterval(() => {
    currentDot = createNextDotCoordinate(currentDot);
    drawPoint(currentDot);

    dotCount += 1;

    if (dotCount) {
      callback(dotCount);
    }
  }, delay);

  return function stop() {
    clearInterval(interval);
  };
};
