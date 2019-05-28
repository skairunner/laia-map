const topojson = require('topojson');
const topology = require('topojson-server').topology;
const fs = require('fs');

const filenames = fs.readdirSync('topojsons');

outputs = { water: [], transit: [], pois: [], roads: [], earth: [], landuse: [] };

// Convert all to geojson and append
for (const filename of filenames) {
  // const prefix = 'topojsons/' + filename.split('.topojson')[0];
  const json = fs.readFileSync('topojsons/' + filename);
  let topo = JSON.parse(json);
  for (let objtype in outputs) {
    let features = topojson.feature(topo, topo.objects[objtype]).features;
    for (let feature of features) {
      outputs[objtype].push(feature);
    }
  }
}

// Dump to output file
let geojsons = {};
for (let objtype in outputs) {
  geojsons[objtype] = {
    'type': 'FeatureCollection',
    features: outputs[objtype]
  };
}

fs.writeFileSync('tiles.topojson', JSON.stringify(topology(geojsons, 1e6)));