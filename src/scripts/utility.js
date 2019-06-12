import { MAX_SCALE } from './constants';
import * as _slugify from 'slugify';

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
  const k = Math.max(1, Math.min(MAX_SCALE, 0.8 / Math.max(dx / 960, dy / 500)));
  // translate
  const t = [960 / 2 - k * x, 500 / 2 - k * y];
  return { k, t };
}

export function region_comparefunc(a, b) {
  let score = 0;
  if (a.properties.kind === 'neighborhood') {
    score -= 10;
  }
  if (b.properties.kind === 'neighborhood') {
    score += 10;
  }
  if (a.properties.name > b.properties.name) {
    score += 1;
  } else if (a.properties.name < b.properties.name) {
    score -= 1;
  }
  return score;
}

export function slugify(s) {
  return _slugify(s.replace(/[)(]/gi, ''));
}
