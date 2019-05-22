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
export const REGIONS = {
  Downtown: 'Downtown',
  Chinatown: 'Chinatown',
  Koreatown: 'Koreatown',
  Hollywood: ['Hollywood', 'East Hollywood', 'West Hollywood', 'Hollywood Hills', 'Hollywood Hills West', 'North Hollywood', 'Universal City', 'Studio City'],
  'Santa Monica': 'Santa Monica',
  Seaside: 'San Pedro',
  'The Forest': ['Ridge Route', 'Castaic Canyons', 'Angeles Crest', 'Tujunga Canyons', 'Southeast Antelope Valley']
};

// Combinations of city planning areas
export const LARGE_REGIONS = {
  Outskirts: [
    'West San Gabriel Valley Planning Area',
    'East San Gabriel Valley Planning Area',
    'Gateway Planning Area',
    'South Bay Planning Area',
    'Santa Monica Mountains Planning Area',
    'San Fernando Valley Planning Area',
    'Santa Clarita Valley Planning Area'
  ],
  'Inner City': [
    'Westside Planning Area',
    'Metro Planning Area'
  ]
}