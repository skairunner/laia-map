import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import * as d3zoom from 'd3-zoom';
import * as d3shape from 'd3-shape';
import * as geosimplify from 'simplify-geojson';
import * as slugify from 'slugify';
import * as CON from './constants';
import * as util from './utility';
import * as G from './globals';

import '../styles/index.scss';


let projection = d3geo.geoMercator()
  .rotate(CON.LA_ROTATE)
  .translate(CON.LA_TRANSLATE)
  .scale(CON.LA_SCALE);
let geo = d3geo.geoPath(projection);

const _defaultRenderGeojsonCallback = d => {};
let PREV_ZOOM = 1;

function render_geojson(id, classname, features, callback) {
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
    .on('click', d => {
      let childdata = [], name, zoomtarget;
      if (G.CURRENT_FOCUS === d.properties.name) {
        name = '';
        zoomtarget = { t: [0, 0], k: 1 };
      } else {
        // Zoom to new target
        name = d.properties.name;
        childdata = all_regions.filter(datum => datum.properties.parent === name);
        zoomtarget = d.properties.transform;
      }
      G.set_current_focus(name);
      // update sidebar
      d3.select('#region-name')
        .text(name);
      let childs = d3.select('#region-children')
        .selectAll('.region-child')
        .data(childdata);
      childs.enter()
        .append('li')
        .classed('region-child', true)
        .merge(childs)
        .each(function(d) {
          if (d.properties.kind === 'poi') {
            d3.select(this)
              .classed(`poi-${d.properties.poitype}`, true);
          }
        })
        .text(d => d.properties.name);
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
    });
}

// accept geojson features, and regiondefs array, then return list of region geojson objects
function make_regions(features, regiondefs, namefunc) {
  let topo = geo2topo(features);
  // Index neighborhoods by name
  let hoods = new Map();
  Object.values(topo.objects).forEach(e => hoods.set(namefunc(e), e));
  let regions = regiondefs.map(info => {
    if (typeof(info.neighborhoods) === 'string') {
      return { info, polys: [hoods.get(info.neighborhoods)] };
    } else {
      return { info, polys: info.neighborhoods.map(d => hoods.get(d)) };
    }
  });
  return regions.map(d => {
    try {
      let obj = topojson.merge(topo, d.polys);
      obj.properties = {name: d.info.name, ...d.info};
      return obj;
    } catch (error) {
      console.error(`While parsing region ${d.info.name}:`);
      console.error(error);
      return null;
    }
  }).filter(d => d !== null);
}

///////////////// The actual initialization /////////////////


let all_regions = [];
fetch('public/neighborhoods-geo.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    geojson.features = geojson.features.filter(d => !CON.EXCLUDED_NEIGHBORHOODS.has(d.properties.name));
    let regionfeatures = make_regions(geojson.features, CON.REGIONS, d => d.properties.name)
    all_regions = all_regions.concat(regionfeatures);
    render_geojson('#small-regions', 'region', regionfeatures);
  })

fetch('public/city-planning.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    let regionfeatures = make_regions(geojson.features, CON.LARGE_REGIONS, d => d.properties.AREA_NAME);
    all_regions = all_regions.concat(regionfeatures);
    render_geojson('#large-regions', 'region', regionfeatures);
  });

fetch('public/tiles.topojson')
  .then(res => res.json())
  .then(topo => {
    d3.select('#basemap')
      .append('path')
      .classed('water', true)
      .datum(topojson.feature(topo, topo.objects.water))
      .attr('d', geo);
    d3.select('#basemap')
      .append('path')
      .classed('earth', true)
      .datum(topojson.feature(topo, topo.objects.earth))
      .attr('d', geo);
  })

// Also render PoIs
const pois = CON.POIS.map(d => ({
  'type': 'Feature',
  geometry: {
    'type': 'Point',
    coordinates: d.gps ? d.gps : [0, 0]
  },
  properties: {
    ...d
  }
}));
all_regions = all_regions.concat(pois);

let symbolgen = d3shape.symbol().size(8);
d3.select('#pois')
  .selectAll('.poi')
  .data(pois)
  .enter()
  .append('path')
  .attr('transform', d => `translate(${projection(d.geometry.coordinates)})`)
  .attr('d', d => symbolgen.type(CON.SYMBOLS[d.properties.poitype])());
