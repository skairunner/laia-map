import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import * as d3zoom from 'd3-zoom';
import { EXCLUDED_NEIGHBORHOODS, REGIONS, LARGE_REGIONS, LA_ROTATE, LA_LONGLAT, LA_TRANSLATE, LA_SCALE } from './constants';

import '../styles/index.scss';


let projection = d3geo.geoMercator()
  .rotate(LA_ROTATE)
  .translate(LA_TRANSLATE)
  .scale(LA_SCALE);
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
    .classed('location', d => d.properties.kind === 'location')
    .attr('d', geo)
    .style('fill', d => d.properties.color)
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
    obj.properties = {name: d.info.name, ...d.info};
    return obj;
  });
}

///////////////// The actual initialization
let maptransform = d3.select('#maptransform');
var zoom = d3zoom.zoom()
  .on('zoom', () => {
    const t = d3.event.transform;
    maptransform.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`)
  });

let LAMap = d3.select('#lamap')
  .call(zoom);

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
    let regionfeatures = make_regions(geojson.features, LARGE_REGIONS, d => d.properties.AREA_NAME);
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