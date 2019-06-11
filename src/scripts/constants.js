import * as d3shape from 'd3-shape';

export const LA_ROTATE = [118.243683, 33.9735];
export const LA_LONGLAT = [-118.243683, 33.9735];
export const LA_TRANSLATE = [523.6547830169354, 28062.73757963573];
export const LA_SCALE = 16982.165984676663;
export const MAX_SCALE = 4;


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

export const LA = {
  properties: {
    name: 'Los Angeles County',
    blurb: `The gem of the West Coast. Rattled by the all-out gang wars of the 1920s, an unprecedented investment and redevelopment effort by large companies such as Venture Corporation, among others, in the 50s has managed to reinstall some degree of safety to its streets. Enough to live without having to wonder if you'll never wake up, at least. On the Kindred side of things, Baron Baldwin, the Brujah leader of the Anarch movement which calls LA home, has displayed political acumen on par with his predecessor. By grabbing hands with the venerable Ventrue Clan Elder/converted Anarch, Aina Gladvold, he has managed to keep the Anarch's various sub-factions from collapsing into orderless squabbling, as well as hedging out Camarilla and Giovanni interests. But this fragile peace threatens to be disturbed: the arrival of Archon Khoroi and the installation of a false Prince are not good omens for the movement. Only time will tell whether LA will remain the cultural capital of the Anarch Free State.`,
    kind: 'county',
    transform: {t: [0, 0], k: 1}
  }
};

// Sets parent to LA if null
function preprocess_region(arr) {
  for (let reg of arr) {
    if (reg.parent === undefined) {
      reg.parent = 'Los Angeles County';
    }
  }

  return arr;
}

// Combinations of neighborhoods
export const REGIONS = preprocess_region([
  {
    name: 'Downtown',
    neighborhoods: 'Downtown',
    blurb: `The streets of Downtown Los Angeles are cramped, making pedestrians feel claustrophobic and small as they look up at the towering structures of concrete and steel and glass. This is the focal point of LA's culture, business, and nightlife. It's fitting that it's become a gathering point for most of Kindred political affairs as well. Much of the action is tucked away behind closed doors, sometimes on the top floor of a high-rise skyscraper, sometimes in an exclusive nightclub. But even for the less connected or less important there are distractions available. Beware the alleys.`,
    kind: 'district',
    color: '#807dba'
  },
  {
    name: 'Chinatown',
    neighborhoods: 'Chinatown',
    blurb: `Ever since early on in its history, Los Angeles has had a significant population of Asian Americans, and Chinese Americans in particular. The streets and neighborhoods of Chinatown are like a little slice of Canton scattered across the city's matrix of streets, with bilingual menus almost as common as ones written purely in Chinese. The current Chinatown is actually not the historic one that inspired many Hollywood movies--that one was demolished for a railway station.`,
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Koreatown',
    neighborhoods: 'Koreatown',
    blurb: `A rectangular neighborhood in the LA metro area, covering a roughly 10 street by 15 avenue area. Ever since the 1992 LA Riots, Koreatown has become a community-driven neighborhood, with nonprofits such as the KYCC and KIWA as well as churches creating neighborhood solidarity. Interestingly enough, the actual residents are majority Latinx, and it's not uncommon to see Latin Americans talking to Korean Americans in fluent Korean.`,
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Hollywood',
    neighborhoods: ['Hollywood', 'East Hollywood', 'West Hollywood', 'Hollywood Hills', 'Hollywood Hills West', 'North Hollywood', 'Universal City', 'Studio City'],
    blurb: `The winding streets of Hollywood's rolling hills feature palm trees, incredible vistas, and rich, luxury homes peppered across the landscape. Though it used to be where the vast majority of the movie industry filmed its works, it is now more of a tourist spot than anything else. One of the least diverse areas in the city, the roughly twenty thousand people living there are typically wealthy homeowners or middle-class renters. Despite its seemingly safe, upper-class appearance, one should still be careful when walking through the streets at night, as there are predators of all kinds looking to take advantage of unsuspecting citizens.`,
    kind: 'district',
    color: 'rgb(158, 154, 200)'
  },
  {
    name: 'Santa Monica',
    neighborhoods: 'Santa Monica',
    blurb: `Santa Monica has been historically known as a beach town, but a recent boom in the economy, including several major household names such as Hulu or Universal Music has revitalized its downtown area. The rest of the town, however, is populated by lower-middle class individuals and is plagued by crime and disenfranchised youth. Aside from the tourist-infested pier, there are blocks of apartment buildings, warehouses, industrial facilities, and commercial establishments. Up until recently, the town had been fairly undisturbed, but the so-called 'vampire murders' have perhaps caused the heaviness hanging over the town.`,
    kind: 'neighborhood',
    parent: 'Inner City',
    color: null
  },
  {
    name: 'Seaside',
    neighborhoods: 'San Pedro',
    blurb: `Seaside, also known as San Pedro, is a small shipping town an optimistic 20 minutes south of LA. It has changed from a sleepy fishing town to a working class community centered around the Port of Los Angeles.`,
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Outskirts',
    color: null
  },
  {
    name: 'Angeles National Forest',
    neighborhoods: ['Ridge Route', 'Castaic Canyons', 'Angeles Crest', 'Tujunga Canyons', 'Southeast Antelope Valley'],
    blurb: `The Angeles National Forest is a vast wooded area spanning both the San Gabriel Mountains and the Sierra Pelona Mountains. This range of wilderness surrounds LA in a wall of green, creating a wonderful place for citizens to retreat to when they find themselves overwhelmed by concrete-bound city life. But the massive forest is not as empty as it would seem. Critters, creatures, beasts and predators roam the lands, stalking their next meal in hopes that their survival will be guaranteed for another day. Those inexperienced with surviving outdoors should not tread too far, as there are only so many days rescue teams can afford to search.`,
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Outskirts',
    color: null
  },
  {
    name: 'Eastside LA',
    neighborhoods: ['Boyle Heights', 'El Sereno', 'Lincoln Heights', 'East Los Angeles'],
    blurb: `One of LA’s oldest neighborhoods, Eastside LA has a lineage of culture that can be found in its shops, businesses, and community.While its majority (96%) Latinx community members have pushed to improve quality of life, they also stand on the front line protecting the neighborhood’s vibrant history and traditions from corporate interests who would seek to gentrify it. It is composed to East LA, Boyle Heights, and a few other neighborhoods.`,
    kind: 'neighborhood',
    category: 'Neighborhoods',
    parent: 'Inner City',
    color: null
  },
]);

// Combinations of city planning areas
export const LARGE_REGIONS = preprocess_region([
  {
    name: 'Outskirts',
    blurb: `Despite its name, the outskirts of LA city are still very much urban, though there are more unused lots and the asphalt is slightly more cracked that in the city proper. Out here is where the true wealth of LA is displayed, ranging from temples and churches to mansions, universities, research facilities and graveyards.`,
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
    blurb: `The part of LA city that isn't downtown. Gang violence and rackets have massively died down since the turf wars of the 1920s, but in recent times organized crime has started creeping back into the alleys from the outskirts to where they had been banished. Even so, the streets remain relatively safe for now. It is suggested to hand any robbers your money rather than risk your life.`,
    neighborhoods: [
        'Westside Planning Area',
        'Metro Planning Area'
      ],
    kind: 'district',
    color: 'rgb(203, 201, 226)'
  }
]);

// Map PoI Types to symbols
export const SYMBOLS = {
  elysium: d3shape.symbolWye,
  normal: d3shape.symbolCircle,
  haven: d3shape.symbolCross,
}

// Map PoI Types to unicode symbols, for sidebar
export const SYMBOLS_UNICODE = {
  elysium: 'Ｙ',
  normal: '⬤',
  haven: '✚',
}

const pois_downtown = [
  {
    name: 'Requiem',
    kind: 'poi',
    poitype: 'elysium',
    parent: 'Downtown',
    blurb: `A popular public nightclub for both kindred and kine. The lower level is primarily where the kine congregate, featuring flashing lights, throbbing bass, and a constantly packed dance floor. The music seems to be generic pop of all sorts, ranging from country pop to hip-hop, but always whatever happens to be hot on the radio lately.\nThe upper level serves blood (1 BP a night) for kindred with backdoor access. It seems to be somewhat classier than the nightclub below, with a more relaxed atmosphere. This is an Anarch owned Elysium.`,
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
  {
    name: 'Venture Tower',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `Venture Tower is an opulent, hundred-story structure owned by local businessman, Edgar Henderson. It is currently the central meeting place for all of the Camarilla's interests, political, commercial, and otherwise. Reported to be the tallest building west of the Mississippi, the tower also features the offices of Dwayne LaCroix and the Insurrection Baby Formula Company. The 9th level of the adjacent side building includes the offices of Dodecatechnoco, whereas the 10th floor houses a food court. In addition to street level access, card-carrying members of the Camarilla can also enter from the underground garage. Members can use their key-card to access the elevators to reach the top floor. The bottom floor is often manned by at least one ghoul receptionist. The top floor is an expansive, lavish room designed to house large and prestigious meetings.`,
    gps:  [-118.2560681, 34.0506548] 
  },
  {
    name: 'Skidrow',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `The most dangerous area in Downtown Los Angeles, by far. While the average city streets in L.A. are dangerous, Skid Row is the crown jewel for homelessness, derelict behavior, drug-using, and violence. The area is defined as being North of 7th St., East of Main St., South of 3rd St., and West of Alameda St., housing one of the largest stable homeless populations in all of the United States. Roughly 8000 homeless people call this section of town their home, and many of them have an impossible time trying to leave. Horrible practices abound, such as extortion, price-gauging, addiction-based street economies, sex-for-food, blood-for-gold and a litany of other criminal enterprises.`,
    gps:  [-118.2490746, 34.0422894],
  },
  {
    name: 'The Hole in the Wall',
    kind: 'poi',
    poitype: 'elysium',
    parent: 'Downtown',
    blurb: `A literal hole in the wall where people are reportedly seeing coming and going. Why this place seems to be such a popular hang-out is unclear. Inside the hole is a dilapidated room full of debris and trash. On one wall runs a large crack. There doesn't seem to be anything special about the room, in particular, but there are several notable markings on the walls among the graffiti. On the rightmost wall, near the floor, there is one word carved into the wooden trim, which is drawn over in red lipstick. Baron Baldwin holds his office upstairs. Appointments can be made through his secretary.`,
    gps:  [-118.2501907, 34.0393514],
  },
  {
    name: 'Frequency Jazz Club',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `The Frequency Club is a recently opened venue by Dominique Allary, a popular neo-soul/R&B singer turned entrepreneur. The space is a two floor building that is decorated with a modern-dusted 60's aesthetic. Every night, there are jam sessions where artists of all genres can come in and perform freely. Those that show the most talent are even allowed into the VIP section on the first floor to talk to Dominique herself. The bar is a bit pricey, but many say the drinks are actually worth it. Whispers among the local Kindred state that the second floor is where the proprietor of the club entertains special guests.`,
    gps:  null,
  },
  {
    name: 'Wallace Law Firm',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: ``,
    gps:  null,
  },
  {
    name: 'Beaumont Medical Center',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: ``,
    gps:  null,
  },
  {
    name: 'St Vincent de Paul Church',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `A Roman Catholic institution built in the 1920s, paid for by local oilman Edward J. Doheny. Due to its original funding, the church has come to be known as the Church of Holy Oils. It is featured prominently in Hollywood movies, such as Arnold Schwarzenegger's 1999 film, End of Days, in which the hero battles Satan in the climax of the story. Other films such as Constantine, television series such as Charmed, and musical bands such as Warrant have all made use of the structure's magnificent, gothic interior designs. The opulent altar at the forefront of the assembly has several depictions of Holy Gospel, most notably the crucifixion of Jesus Christ in the center.`,
    gps:  [-118.2769677, 34.0282625],
  },
  {
    name: 'Los Angeles Central Library',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `The historic Central Library was constructed in 1926 and is a Downtown Los Angeles landmark. The Central Library complex is the third largest public library in the United States in terms of book and periodical holdings. The Library's Rare Books Department is located in this building. This remains an important research library, despite the development of accessible databases and public access to the Internet.`,
    gps: [-118.2572776, 34.0502553],
  },
  {
    name: 'The Machine',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `Your friendly neighborhood gay nightclub, filled with queens, divas, and a rainbow of colorful customers, the Machine is the most popular spot among dozens of similar clubs scattered across L.A. With two full bars, one upstairs and another in the basement, the club replaces a typical bar's Happy Hour promotion with their own branded special called "Two Fingers Deep", advertising half-prices for all drink orders that lower a bottle's alcohol volume by two fingers. Nothing sells drinks like eye-contact, and that's what you get when you come inside this place. It is dimly-lit except for the neon strips of LEDs that trim the floors and ceilings. Every half-hour, the color cycles into another, from Roy all the way down G. into Biv, creating dynamic, changing moods. This location is owned by Jacob Barrett.`,
    gps:  null,
  },
  {
    name: 'LA Convention Center',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Downtown',
    blurb: `The LA Convention Center (LACC) is located in the heart of downtown LA and is the premiere location for many conferences, trade shows and exhibitions, boasting over 720,000 sqft of exhibit hall, 147,000 sqft of meeting room space, and a 5600-vehicle parking lot. Although last year's terrorist attack had briefly dampened enthusiasm for this venue, the lack of comparable alternative means that LACC is still a relevant part of the downtown cultural mosaic.`,
    gps:  [-118.2717511, 34.0403251],
  }
];

const pois_hollywood = [

];

const pois_innercity = [

];

const pois_outskirts = [

];

export const POIS = preprocess_region(pois_downtown.concat(pois_hollywood, pois_innercity, pois_outskirts));
