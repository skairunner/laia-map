import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import { EXCLUDED_NEIGHBORHOODS, REGIONS } from './constants';

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

fetch('public/neighborhoods-geo.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    geojson.features = geojson.features.filter(d => !EXCLUDED_NEIGHBORHOODS.has(d.properties.name));
    let topo = geo2topo(geojson.features);
    // Index neighborhoods by name
    let hoods = new Map();
    Object.values(topo.objects).forEach(e => hoods.set(e.properties.name, e));
    let regions = Object.entries(REGIONS).map(e => {
      const name = e[0];
      const regionhoods = e[1];
      if (typeof(regionhoods) === 'string') {
        return { name, polys: [hoods.get(regionhoods)] };
      } else {
        return { name, polys: regionhoods.map(d => hoods.get(d)) };
      }
    });
    let regionfeatures = regions.map(d => {
      let obj = topojson.merge(topo, d.polys);
      obj.properties = {name: d.name};
      return obj;
    });

    render_geojson('#map-neighborhoods', 'neighborhood', geojson.features);
    render_geojson('#map-regions', 'region', regionfeatures);
  })

fetch('public/city-planning.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    render_geojson('#map-cities', 'cities', geojson.features, d => console.log(d.properties))
  });