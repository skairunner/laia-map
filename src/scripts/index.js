import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import { EXCLUDED_NEIGHBORHOODS, REGIONS, LARGE_REGIONS } from './constants';

import '../styles/index.scss';

let projection = d3geo.geoMercator()
  .rotate([118.243683, 33.9735])
  .translate([523.6547830169354, 28062.73757963573])
  .scale(16982.165984676663);
let geo = d3geo.geoPath(projection);

const _defaultRenderGeojsonCallback = d => console.log(d.properties.name);

function render_geojson(id, classname, features, callback) {
  callback = callback || _defaultRenderGeojsonCallback;
  d3.select(id)
    .selectAll('path')
    .data(features)
    .enter()
    .append('path')
    .classed(classname, true)
    .attr('d', geo)
    .on('mouseover', callback);
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
    let obj = topojson.merge(topo, d.polys);
    obj.properties = {name: d.info.name};
    return obj;
  });
}

fetch('public/neighborhoods-geo.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    geojson.features = geojson.features.filter(d => !EXCLUDED_NEIGHBORHOODS.has(d.properties.name));
    let regionfeatures = make_regions(geojson.features, REGIONS, d => d.properties.name)

    render_geojson('#map-neighborhoods', 'neighborhood', geojson.features);
    render_geojson('#small-regions', 'region', regionfeatures);
  })

fetch('public/city-planning.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    console.log(geojson)
    let regionfeatures = make_regions(geojson.features, LARGE_REGIONS, d => d.properties.AREA_NAME);
    render_geojson('#large-regions', 'region', regionfeatures);
    render_geojson('#map-cities', 'cities', geojson.features, d => console.log(d.properties.AREA_NAME))
  });