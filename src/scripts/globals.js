import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import * as d3zoom from 'd3-zoom';

import * as CON from './constants';

var maptransform = d3.select('#maptransform');
export var CURRENT_FOCUS = 'Los Angeles County'; // To track the zoom-in zoom-out on click
export function set_current_focus(newfocus) {
  CURRENT_FOCUS = newfocus;
}

export var ZOOM = d3zoom.zoom()
  .scaleExtent([.5, CON.MAX_SCALE])
  .on('zoom', () => {
    const t = d3.event.transform;
    maptransform.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`);
  });

export var LAMap = d3.select('#lamap')
  .call(ZOOM);

export var projection = d3geo.geoMercator()
.rotate(CON.LA_ROTATE)
.translate(CON.LA_TRANSLATE)
.scale(CON.LA_SCALE);

export var geo = d3geo.geoPath(projection);

export var all_regions = [CON.LA];
export var all_regions_map = new Map();
all_regions_map.set('Los Angeles County', CON.LA);

export function concat_regions(arr) {
  all_regions = all_regions.concat(arr);
  for (let region of arr) {
    all_regions_map.set(region.properties.name, region);
  }
}
