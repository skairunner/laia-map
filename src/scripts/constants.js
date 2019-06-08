export const LA_ROTATE = [118.243683, 33.9735];
export const LA_LONGLAT = [-118.243683, 33.9735];
export const LA_TRANSLATE = [523.6547830169354, 28062.73757963573];
export const LA_SCALE = 16982.165984676663;

export const EXCLUDED_NEIGHBORHOODS = new Set([
  'Unincorporated Catalina Island',
  'Avalon',
  'Northwest Antelope Valley',
  'Northeast Antelope Valley',
  'Lancaster',
  'Agua Dulce',
  'Acton',
  'Palmdale',
  'Lake Los Angeles',
  'Green Valley',
  'Leona Valley',
  'Elizabeth Lake',
  'Lake Hughes',
  'Desert View Highlands',
  'Sun Village',
  'Quartz Hill',
  'Northwest Palmdale',
  'Littlerock',
  'Unincorporated Santa Susana Mountains',
  'Santa Clarita',
  'Stevenson Ranch',
  'Castaic',
  'Hasley Canyon',
  'Val Verde'
]);

// Combinations of neighborhoods
export const REGIONS = [
  {
    name: 'Downtown',
    neighborhoods: 'Downtown',
    kind: 'district',
    color: 'rgb(106, 81, 163)'
  },
  {
    name: 'Chinatown',
    neighborhoods: 'Chinatown',
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Koreatown',
    neighborhoods: 'Koreatown',
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Hollywood',
    neighborhoods: ['Hollywood', 'East Hollywood', 'West Hollywood', 'Hollywood Hills', 'Hollywood Hills West', 'North Hollywood', 'Universal City', 'Studio City'],
    kind: 'district',
    color: 'rgb(158, 154, 200)'
  },
  {
    name: 'Santa Monica',
    neighborhoods: 'Santa Monica',
    kind: 'neighborhood',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Seaside',
    neighborhoods: 'San Pedro',
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Outskirts',
    color: null
  },
  {
    name: 'The Forest',
    neighborhoods: ['Ridge Route', 'Castaic Canyons', 'Angeles Crest', 'Tujunga Canyons', 'Southeast Antelope Valley'],
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Outskirts',
    color: null
  },
  {
    name: 'Eastside LA',
    neighborhoods: ['Boyle Heights', 'El Sereno', 'Lincoln Heights', 'East Los Angeles'],
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
];

// Combinations of city planning areas
export const LARGE_REGIONS = [
  {
    name: 'Outskirts',
    neighborhoods: [
        'West San Gabriel Valley Planning Area',
        'East San Gabriel Valley Planning Area',
        'Gateway Planning Area',
        'South Bay Planning Area',
        'Santa Monica Mountains Planning Area',
        'San Fernando Valley Planning Area',
        'Santa Clarita Valley Planning Area'
      ],
    kind: 'district',
    color: 'rgb(242, 240, 247)'
  },
  {
    name: 'Inner City',
    neighborhoods: [
        'Westside Planning Area',
        'Metro Planning Area'
      ],
    kind: 'district',
    color: 'rgb(203, 201, 226)'
  }
];

export const POIS = [
  {
    name: 'Requiem',
    kind: 'poi',
    poitype: 'elysium',
    parent: 'Downtown',
    blurb: `A popular public nightclub for both kindred and kine. The lower level is primarily where the kine congregate, featuring flashing lights, throbbing bass, and a constantly packed dance floor. The music seems to be generic pop of all sorts, ranging from country pop to hip-hop, but always whatever happens to be hot on the radio lately. 

The upper level serves blood (1 BP a night) for kindred with backdoor access. It seems to be somewhat classier than the nightclub below, with a more relaxed atmosphere. This is an Anarch owned Elysium.`,
    gps: null // GPS can be omitted to not display on map, only on sidebar
  },
  {
    name: 'Good Samaritan Hospital',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `Founded in 1885, Good Samaritan Hospital is located on Wilshire Blvd.The hospital is located in Downtown, near the Financial District, between the Northern and Southern neighborhoods of Westlake. Many of Skid Row's victims are admitted to this hospital due to its location.

Good Samaritan Hospital is a progressive, tertiary, not-for-profit hospital. The hospital was historically affiliated with the Episcopal Church, but currently pastoral care services are available for all religions and denominations.`,
    gps:  [-118.2674585, 34.0546739] 
  },
]
