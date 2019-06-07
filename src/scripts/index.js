import * as topojson from 'topojson';
import { topology as geo2topo } from 'topojson-server';
import * as d3 from 'd3-selection';
import * as d3geo from 'd3-geo';
import * as d3zoom from 'd3-zoom';
import * as slugify from 'slugify';
import { EXCLUDED_NEIGHBORHOODS, REGIONS, LARGE_REGIONS, LA_ROTATE, LA_LONGLAT, LA_TRANSLATE, LA_SCALE } from './constants';

import '../styles/index.scss';


let projection = d3geo.geoMercator()
  .rotate(LA_ROTATE)
  .translate(LA_TRANSLATE)
  .scale(LA_SCALE);
let geo = d3geo.geoPath(projection);

const _defaultRenderGeojsonCallback = d => {};

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
      const bounds = this.getBBox();
      d.properties.bounds = bounds;
      const dx = bounds.width;
      const dy = bounds.height;
      const x = bounds.x + dx / 2;
      const y = bounds.y + dy / 2;
      d.properties.scale = Math.max(1, Math.min(8, 0.8 / Math.max(dx / 960, dy / 500)));
      d.properties.translate = [960 / 2 - d.properties.scale * x, 500 / 2 - d.properties.scale * y];
    })
    .on('mouseover', callback)
    .on('click', d => {
      d3.select('#region-name')
        .text(d.properties.name);
      let childs = d3.select('#region-children')
        .selectAll('.region-child')
        .data(all_regions.filter(dd => dd.properties.parent === d.properties.name));
      childs.enter()
        .append('li')
        .classed('region-child', true)
        .text(d => d.properties.name);
      childs.exit()
        .remove();
      const translate = d.properties.translate;
      const scale = d.properties.scale;
      d3.select('#lamap')
        .transition()
        .call(zoom.transform, d3zoom.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
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

///////////////// The actual initialization
let maptransform = d3.select('#maptransform');
var zoom = d3zoom.zoom()
  .on('zoom', () => {
    const t = d3.event.transform;
    maptransform.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`)
  });

let LAMap = d3.select('#lamap')
  .call(zoom);

let all_regions = [];
fetch('public/neighborhoods-geo.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    geojson.features = geojson.features.filter(d => !EXCLUDED_NEIGHBORHOODS.has(d.properties.name));
    let regionfeatures = make_regions(geojson.features, REGIONS, d => d.properties.name)
    all_regions = all_regions.concat(regionfeatures);
    render_geojson('#small-regions', 'region', regionfeatures);
  })

fetch('public/city-planning.json')
  .then(res => {
    return res.json();
  })
  .then(geojson => {
    let regionfeatures = make_regions(geojson.features, LARGE_REGIONS, d => d.properties.AREA_NAME);
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
