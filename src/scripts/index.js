import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3shape from 'd3-shape';
import * as CON from './constants';
import * as util from './utility';

import { render_geojson, focus_region } from './interactions';
import { geo, concat_regions, projection } from './globals';

import '../styles/index.scss';
import slugify from 'slugify';


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
Promise.all([
  fetch('public/neighborhoods-geo.json')
    .then(res => {
      return res.json();
    })
    .then(geojson => {
      geojson.features = geojson.features.filter(d => !CON.EXCLUDED_NEIGHBORHOODS.has(d.properties.name));
      let regionfeatures = make_regions(geojson.features, CON.REGIONS, d => d.properties.name)
      concat_regions(regionfeatures);
      render_geojson('#small-regions', 'region', regionfeatures);
    }),

  fetch('public/city-planning.json')
    .then(res => {
      return res.json();
    })
    .then(geojson => {
      let regionfeatures = make_regions(geojson.features, CON.LARGE_REGIONS, d => d.properties.AREA_NAME);
      concat_regions(regionfeatures);
      render_geojson('#large-regions', 'region', regionfeatures);
    })
])
.then(d => focus_region('Los Angeles County'));


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
    coordinates: d.gps ? d.gps : [-1, -1]
  },
  properties: {
    ...d
  }
}));
concat_regions(pois);


let symbolgen = d3shape.symbol().size(4);
d3.select('#pois')
  .selectAll('.poi')
  .data(pois)
  .enter()
  .append('path')
  .classed('region', true)
  .each(function(d) {
    // Set appropriate transform to focus
    const coords = projection(d.geometry.coordinates);
    d.properties.transform = util.transformFromBbox({ x: coords[0], y: coords[1], width: 8, height: 8});
  })
  .attr('id', d => slugify(d.properties.name))
  .attr('transform', d => `translate(${projection(d.geometry.coordinates)})`)
  .attr('d', d => symbolgen.type(CON.SYMBOLS[d.properties.poitype])());
