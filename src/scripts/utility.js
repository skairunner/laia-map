/**
 * @typedef {Object} ZoomTransform
 * @property {number[]} t - An array of length 2 that depicts the translate amount.
 * @property {number} k - The scale factor
 */

/**
 * Provided a bounding box for an SVG, return a zoom transform info object
 * @param {SVGRect} bbox - What is returned from an SVGGraphicsElement.getBBox() call of the element we want to get a zoom transform for.
 * @returns {ZoomTransform} The zoom transform to center that element
 */
export function transformFromBbox(bbox) {
  const dx = bbox.width;
  const dy = bbox.height;
  const x = bbox.x + dx / 2;
  const y = bbox.y + dy / 2;
  // scale
  const k = Math.max(1, Math.min(8, 0.8 / Math.max(dx / 960, dy / 500)));
  // translate
  const t = [960 / 2 - k * x, 500 / 2 - k * y];
  return { k, t };
}
