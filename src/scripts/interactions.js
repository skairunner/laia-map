import * as d3 from 'd3-selection';
import * as d3zoom from 'd3-zoom';

import { geo, all_regions, all_regions_map } from './globals';
import * as G from './globals';
import * as util from './utility';


let PREV_ZOOM = 1;

// Do zoom
function zoom_to(zoomtarget) {
  d3.select('#lamap')
    .call(G.ZOOM.transform, d3zoom.zoomIdentity.translate(zoomtarget.t[0], zoomtarget.t[1]).scale(zoomtarget.k));
}

function highlight(d, yes) {
  d3.select('#' + util.slugify(d.properties.name))
    .classed('highlighted', yes);
}

function do_highlight(d) {
  highlight(d, true);
}

function un_highlight(d) {
  highlight(d, false);
}

function update_sidebar(d, name, childdata) {
  d3.select('#region-name')
    .text(name);
  
  const blurb = d.properties.blurb ? d.properties.blurb : '';
  d3.select('#region-desc')
    .html('')
    .selectAll('p')
    .data(blurb.split('\n'))
    .enter()
    .append('p')
    .text(d => d);
  
  if (d.properties.poitype) {
    d3.select('#poitype')
      .text(`(${d.properties.poitype})`);
  } else {
    d3.select('#poitype')
      .text('');
  }

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
      // Dehighlight, if needed
      un_highlight(d);
      // Focus the given location
      focus_region(d.properties.name);
    })
    .on('mouseover', do_highlight)
    .on('mouseout', un_highlight);
  childs.exit()
    .remove();

  // Enable back button, if applicable
  if (d.properties.parent) {
    d3.select('#go-back')
      .classed('active', true)
      .on('click', () => {
        focus_region(d.properties.parent);
      });
  } else { // Disable otherwise
    d3.select('#go-back')
      .classed('active', false);
  }
}

// Also focuses the region in question
export function focus_region(regionname) {
  const d = all_regions_map.get(regionname);

  let childdata = [], name, zoomtarget;
  if (G.CURRENT_FOCUS === d.properties.name && G.CURRENT_FOCUS !== 'Los Angeles County') {
    focus_region('Los Angeles County');
    return;
  } else {
    // Zoom to new target
    name = d.properties.name;
    zoomtarget = d.properties.transform;
    // Sort first by neighborhoods > locations, then alphabetically
    childdata = all_regions.filter(datum => datum.properties.parent === name);
    childdata.sort(util.region_comparefunc);
  }
  G.set_current_focus(name);

  // Select current region on map
  d3.selectAll('.region')
    .classed('selected', d => d.properties.name !== 'Los Angeles County' && d.properties.name === G.CURRENT_FOCUS);

  // Don't zoom if no gps coordinates
  if (d.properties.gps !== null)
    zoom_to(zoomtarget);

  update_sidebar(d, name, childdata);
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
    .attr('id', d => util.slugify(d.properties.name))
    .style('fill', d => d.properties.color)
    .each(function(d) {
      d.properties.transform = util.transformFromBbox(this.getBBox());
    })
    .on('mouseover', callback)
    .on('click', d => focus_region(d.properties.name));
}
