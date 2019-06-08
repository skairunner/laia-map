import * as d3 from 'd3-selection';
import * as d3zoom from 'd3-zoom';

var maptransform = d3.select('#maptransform');
export var CURRENT_FOCUS = null; // To track the zoom-in zoom-out on click
export function set_current_focus(newfocus) {
  CURRENT_FOCUS = newfocus;
}

export var ZOOM = d3zoom.zoom()
  .scaleExtent([1, 8])
  .on('zoom', () => {
    const t = d3.event.transform;
    maptransform.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`);
  });

export var LAMap = d3.select('#lamap')
  .call(ZOOM);
