/**
 * Create random number by min and max
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * min);
};

/**
 * Create random color value
 *
 * @return {{a: number, r: number, b: number, g: number}}
 */
export const randomColor = () => {
  const r = +Math.random().toFixed(2);
  const g = +Math.random().toFixed(2);
  const b = +Math.random().toFixed(2);
  const a = +(0.5 + Math.random() * 0.5).toFixed(2);
  return { r, g, b, a };
};

/**
 * Create random rgb color
 *
 * @return [r: number, g: number, b: number]
 */
export const randomRGB = () => {
  const r = +Math.random().toFixed(2);
  const g = +Math.random().toFixed(2);
  const b = +Math.random().toFixed(2);
  return [r, g, b];
};

/**
 * Create random rgba color
 *
 * @return {Array<number>}
 */
export const randomRGBA = () => {
  const r = +Math.random().toFixed(2);
  const g = +Math.random().toFixed(2);
  const b = +Math.random().toFixed(2);
  const a = +(0.5 + Math.random() * 0.5).toFixed(2);
  return [r, g, b, a];
};

/**
 * @param {number} x 圆心 x 坐标
 * @param {number} y 圆心 y 坐标
 * @param {number} radius 半径
 * @param {number} n 分成多少个三角形
 */
export function circlePoints(x, y, radius, n) {
  const color = randomRGB();
  const points = [x, y, ...color];
  for (let i = 0; i <= n; i++) {
    const angle = (Math.PI * 2 / n) * i;
    const pointsX = (Math.cos(angle) * radius) + x;
    const pointsY = (Math.sin(angle) * radius) + y;
    const color = randomRGB();
    points.push(pointsX, pointsY, ...color);
  }
  return points;
}

/**
 * @param str
 * @param suffixLimitNum
 * @return {number}
 */
export function formatNumber(str, suffixLimitNum = 2) {
  return +str.toFixed(suffixLimitNum);
}
























