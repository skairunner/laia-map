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
    color: null
  },
  {
    name: 'Chinatown',
    neighborhoods: 'Chinatown',
    kind: 'location',
    category: 'Neighborhoods',
    color: null
  },
  {
    name: 'Koreatown',
    neighborhoods: 'Koreatown',
    kind: 'location',
    category: 'Neighborhoods',
    color: null
  },
  {
    name: 'Hollywood',
    neighborhoods: ['Hollywood', 'East Hollywood', 'West Hollywood', 'Hollywood Hills', 'Hollywood Hills West', 'North Hollywood', 'Universal City', 'Studio City'],
    kind: 'district',
    color: null
  },
  {
    name: 'Santa Monica',
    neighborhoods: 'Santa Monica',
    kind: 'district',
    color: null
  },
  {
    name: 'Seaside',
    neighborhoods: 'San Pedro',
    kind: 'location',
    category: 'Outskirts',
    color: null
  },
  {
    name: 'The Forest',
    neighborhoods: ['Ridge Route', 'Castaic Canyons', 'Angeles Crest', 'Tujunga Canyons', 'Southeast Antelope Valley'],
    kind: 'location',
    category: 'Outskirts',
    color: null
  },
]

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
    color: null
  },
  {
    name: 'Inner City',
    neighborhoods: [
        'Westside Planning Area',
        'Metro Planning Area'
      ],
    kind: 'district',
    color: null
  }
]