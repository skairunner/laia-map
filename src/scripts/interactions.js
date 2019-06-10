import * as d3 from 'd3-selection';
import * as d3zoom from 'd3-zoom';
import * as slugify from 'slugify';

import { geo, all_regions, all_regions_map } from './globals';
import * as G from './globals';
import * as util from './utility';


let PREV_ZOOM = 1;

// Also focuses the region in question
export function zoom_to(regionname) {
  const d = all_regions_map.get(regionname);

  let childdata = [], name, zoomtarget;
  if (G.CURRENT_FOCUS === d.properties.name) {
    name = '';
    zoomtarget = { t: [0, 0], k: 1 };
  } else {
    // Zoom to new target
    name = d.properties.name;
    zoomtarget = d.properties.transform;
    // Sort first by neighborhoods > locations, then alphabetically
    childdata = all_regions.filter(datum => datum.properties.parent === name);
    childdata.sort(util.region_comparefunc);
  }
  G.set_current_focus(name);
  // update sidebar
  d3.select('#region-name')
    .text(name);
  let childs = d3.select('#region-children')
    .selectAll('.region-child')
    .data(childdata, d => d.properties.name);
  childs.enter()
    .append('li')
    .classed('region-child', true)
    .merge(childs)
    .each(function(d) {
      let sel = d3.select(this);
      if (d.properties.kind === 'poi') {
        sel.classed(`type-poi poi-${d.properties.poitype}`, true);
      } else {
        sel.classed(`type-${d.properties.kind}`, true);
      }
    })
    .append('span')
    .classed('content', true)
    .text(d => d.properties.name)
    .on('click', d => {
      // Zoom to the given location
      zoom_to(d.properties.name);
    });
  childs.exit()
    .remove();
  // Do zoom
  d3.select('#lamap')
    .call(G.ZOOM.transform, d3zoom.zoomIdentity.translate(zoomtarget.t[0], zoomtarget.t[1]).scale(zoomtarget.k));
  // If zoom is within certain bounds, make circles smaller
  if (PREV_ZOOM !== zoomtarget.k) { // only update on change
    PREV_ZOOM = zoomtarget.k;
    let radius = 1;
    if (zoomtarget.k < 4) {
      radius = 1;
    } else if (zoomtarget.k < 6) {
      radius = 0.75;
    } else {
      radius = 0.5;
    }
    d3.select('#pois')
      .selectAll('.poi')
      .attr('r', radius);
  }
  // Add back button, if applicable
  if (d.properties.parent) {
    d3.select('#go-back')
      .classed('active', true)
      .on('click', () => {
        zoom_to(d.properties.parent);
      });
  } else {
    d3.select('#go-back')
      .classed('active', false);
  }
}

const _defaultRenderGeojsonCallback = d => {};
export function render_geojson(id, classname, features, callback) {
  callback = callback || _defaultRenderGeojsonCallback;
  d3.select(id)
    .selectAll('path')
    .data(features)
    .enter()
    .append('path')
    .classed(classname, true)
    .classed('neighborhood', d => d.properties.kind === 'neighborhood')
    .attr('d', geo)
    .attr('id', d => slugify(d.properties.name))
    .style('fill', d => d.properties.color)
    .each(function(d) {
      d.properties.transform = util.transformFromBbox(this.getBBox());
    })
    .on('mouseover', callback)
    .on('click', d => zoom_to(d.properties.name));
}
