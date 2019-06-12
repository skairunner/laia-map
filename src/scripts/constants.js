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
    blurb: `The gem of the West Coast. Rattled by the all-out gang wars of the 1920s, an unprecedented investment and redevelopment effort in the 50s by large companies such as Venture Corporation, among others, has managed to reinstall some degree of safety to its streets. Enough to live without having to wonder if you'll never wake up, at least. On the Kindred side of things, Baron Baldwin, the Brujah leader of the Anarch movement which calls LA home, has displayed political acumen on par with his predecessor. By grabbing hands with the venerable Ventrue Clan Elder/converted Anarch, Aina Gladvold, he has managed to keep the Anarch's various sub-factions from collapsing into orderless squabbling, as well as hedging out Camarilla and Giovanni interests. But this fragile peace threatens to be disturbed: the arrival of Archon Khoroi and the installation of a false Prince are not good omens for the movement. Only time will tell whether LA will remain the cultural capital of the Anarch Free State.`,
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
    neighborhoods: ['Hollywood', 'East Hollywood', 'West Hollywood', 'Hollywood Hills', 'Hollywood Hills West', 'North Hollywood', 'Universal City', 'Studio City', 'Los Feliz', 'Burbank', 'Griffith Park', 'Toluca Lake'],
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

const pois_downtown = [
  {
    name: 'Requiem',
    kind: 'poi',
    poitype: 'elysium',
    parent: 'Downtown',
    blurb: `A popular public nightclub for both kindred and kine. The lower level is primarily where the kine congregate, featuring flashing lights, throbbing bass, and a constantly packed dance floor. The music seems to be generic pop of all sorts, ranging from country pop to hip-hop, but always whatever happens to be hot on the radio lately.\nThe upper level serves blood (1 BP a night) for kindred with backdoor access. It seems to be somewhat classier than the nightclub below, with a more relaxed atmosphere. This is an Anarch owned Elysium.`,
    gps: [-118.2611908, 34.042485] // GPS can be omitted to not display on map, only on sidebar
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
  {
    name: 'Carvoletti Cafe',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `A newcomer to the Hollywood upscale dining scene, this Italian restaurant caters to those of means. Located near Paramount Pictures, it is one of the most popular places to dine in the evenings and is open late. It is rumored that the restaurant is owned by the Giovanni, or is at least connected to the family.`,
    gps: [-118.3278168, 34.0921122]
  },
  {
    name: 'Hollywood Forever Cemetary',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `The Hollywood Forever Cemetery is one of L.A.'s most famously morbid features. The land within the walls is hauntingly beautiful, well manicured by the groundskeepers, who prim and trim the many plants and bushes that breath life into an otherwise cold and lifeless place. Aside from a large pond in the center, there are hundreds of crypts, above ground tombs, monuments, statues, and memorial plinths. Many souls have come to rest in this location, none of whom have been forgotten. Aside from a couple of damaged stone crypts and busted marble walls, the cemetery is in good shape. Unfortunately, this beauty is not as apparent after dusk, when dark denizens of the night come out of their resting places. Creatures lurking in the shadows wait patiently to lure in one of the foolish goth kids that tend to sneak in through hidden entrances.`,
    gps: [-118.321202, 34.0887856,]
  },
  {
    name: 'Paramount Pictures',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `Paramount Pictures is one of the world's most recognized and celebrated film studios. The Viacom-owned corporation is located in Hollywood. Secretly, however, every Toreador in L.A. knows it to be one of the major strongholds of the Clan; the studio is secretly controlled by the Toreadors, and is often host to their meetings and even rarely some of their legendary social balls or gatherings for all select Kindred.`,
    gps: [-118.3709955, 34.0763376]
  },
  {
    name: 'The Snakehole Lounge',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `Perhaps at odds with the wilder Hollywood party scene, the Snakehole Lounge is a quiet bar tucked into an equally quiet neighborhood. Its relaxed atmosphere meshes well with the owners' preference to feature many local bands, ranging the genre gamut from hard rock to acoustic indie music.`,
    gps: [-118.35849, 34.0895334]
  },
  {
    name: 'Walk of Fame',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `The Hollywood Walk of Fame is am infamous series of brass and terrazzo stars embedded in the sidewalks along Hollywood Boulevard and Vine Street. A popular tourist attraction, this monument to stardom attracts millions of tourists to touch the imprints where their favorite stars' once cast their hands. Over 2600 names have been added to the ever-growing list of actors, directors, producers, musicians, singers, performers and other various characters.`,
    gps: [-118.3358652, 34.1016691]
  },
  {
    name: 'Hollywood Sign',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `H O L L Y W O O D is the famous landmark that gives the town international recognition due to its iconic imagery in entertainment media. The white letters are each 44 foot tall and spans a length of 352 feet. It is forbidden to walk up and touch the sign due to its security restrictions in Griffith Park, but that doesn't stop certain motivated individuals from doing it anyway.`,
    gps: [-118.3238652, 34.1340213]
  },
  {
    name: 'Blessed Sacrament',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Hollywood',
    blurb: `A Roman Catholic church in the heart of Hollywood that serves an urban, multi-ethnic community. Dedicated in 1928, it has thrived in part thanks to the contributions of many old-time Hollywood stars. Its dramatic interior is intentionally modeled after San Pedro Church.`,
    gps: [-118.3372926, 34.0985135]
  }
];

const pois_innercity = [
  {
    name: 'Tremere Chantry',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Inner City',
    blurb: `One of the finest Chantries on the West Coast, the building is one of two havens protected by the Regent, Conrad Lehmann. It is a place where Tremere may safely reside without threat from other clans. It is an unassuming building, slightly run down at first glance, but otherwise the property is well-maintained. It bears a single gas lantern which illuminates its front entrance. This building is protected by a series of intersecting hallways, some Tremere sorcery which leaves uneducated guests lost like in a cornfieldn. Many hallways lead to the same place, and most of them right back to the starting point, inviting unwelcome guests to leave via the front door. If one knows the right turns, they find themselves in the chantry's main rooms, a sanctuary, library and a small laboratory. The buildings around the Chantry are all owned by the Regent, for security.`,
    gps: null,
  },
  {
    name: 'LAPD HQ',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Inner City',
    blurb: `The home of the LAPD, a massive building that looks like a glass cube held in a white tile vice.`,
    gps: [-118.271065, 34.053575],
  },
  {
    name: 'UCLA Medical Center',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Santa Monica',
    blurb: `UCLA Medical Center - Santa Monica is a modern 300-bed medical center with surgical wards, ER and ICU that also serves as a teaching hospital. Many Santa Monica patients are transferred here to take advantage of its medical equipment, surgical team and, unfortunately, sometimes its morgue. Its medical professionals are incredibly overworked as a result. Most notable is the fact that UMC-SM houses metro LA's only certified medical examiner (as opposed to coroner), Dr. Jeanne Hasper.`,
    gps: [-118.488343, 34.0270141],
  },
  {
    name: 'Old Chinatown Plaza',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Chinatown',
    blurb: `The main plaza of historic old Chinatown, moved to its current location along with the new Chinatown, it remains a popular tourist spot. Within the plaza, there are a number of shops to enjoy food and entertainment, as well as space to host special events. One famous event is the KCRW Summer Nights event in which the community is invited to party until midnight, dancing to live music, dining at local food trucks, and participating in cultural workshops. Typically there is a craft beer garden, several cooking demonstrations, and an old-world, vintage market that sells odd and ends. The area is known for flashy neon lights coexisting alongside traditional paper lanterns and Japanese-influenced architecture.`,
    gps: [-118.2381017, 34.0652019],
  },
  {
    name: 'Shitty 7-11',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Inner City',
    blurb: `A rundown "7-11" located in the endlessly nondescript streets and alleys of the LA inner city area. It provides all amenities expected of a 7-11, including Slurpi® frozen ice cream slushie drinks, snacks, weed, crack, heroin, blood, and cheap coffee-like liquid.`,
    gps: [-118.3419317, 33.978092],
  },
  {
    name: 'Wildlife Assurance Agency',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Inner City',
    blurb: `The perfectly normal office of the Wildlife Assurance Agency. Despite its name, there don't seem to be much in the way of wildlife here, nor does the security seem normal for an environment-related organization.`,
    gps: [-118.2476909, 33.9965424],
  },
  {
    name: 'FBI Surveillance Team #5',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Eastside LA',
    blurb: `Although the main LA FBI location is to the north-east of Santa Monica, another publicly owned location is available in the fringe of Eastside LA. Precious little is known about the activities conducted in the fenced-off parking lot and accompanying adobe-red buildings.`,
    gps: [-118.1587112, 34.0160868],
  },
  {
    name: 'Last Call Bar',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Inner City',
    blurb: `The Last Call Bar is a generic decently sized bar located within the Inner City of Los Angeles that is a common hangout for many of the local punks and goths in the city. While it isn't explicitly a kindred's domain, it is rumored that a kindred's herd hangs out here constantly, so it's recommended to tread carefully.`,
    gps: null,
  },
  {
    name: 'YMCA of Metropolitan Los Angeles',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Koreatown',
    blurb: `The Y of Metropolitan LA is a five story glass-facade building (including basement levels) that hosts facilities such as an indoor basketball court, swimming pool, gym and community arts lessons. Due to its non-profit nature as well as its underground parking lot, the Y serves as a popular place for those who wish to use sports facilities, especially by lower-income families in the inner city area.`,
    gps: [-118.2948052, 34.055616],
  },
  {
    name: 'Santa Monica Pier',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Santa Monica',
    blurb: `The Santa Monica Pier was constructed in 1909 and is considered a historic L.A. landmark. The pier is a popular hangout for tourists during the day and a place for lowlifes and punks to hang out at night. The main street features a number of small businesses and facilities, including a ball room, an arcade hall, and an old carousel among other attractions. Here you can test your wits at a game of skill or take in some of the local culture. Down below the storefronts, the ocean water laps at the shore of Santa Monica's sandy beach area. It's not much of a sight, but young kids like to post up there during odd hours of the night, sitting around campfires and doing who knows what else. You meet some interesting characters out there, but none of them seem to have anything better to do than stand around and watch the fire crackling into the night sky. There are several stairways leading to various locations, but the locals know not to stray too far, due to shady characters lurking around the beach.`,
    gps: [-118.4999956, 34.0090398],
  },
];

const pois_outskirts = [
  {
    name: 'Arcadia Arboretum',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Outskirts',
    blurb: `The Los Angeles County Arboretum and Botanic Garden, 127 acres, is an arboretum, botanical garden, and historical site nestled into hills near the San Gabriel Mountains, at 301 North Baldwin Avenue, Arcadia, California, United States.`,
    gps: [-118.0535515, 34.1445338],
  },
  {
    name: 'Brothers Salvage',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Outskirts',
    blurb: `Not much can be said about Brother's Salvage, except it's the preferred meeting place of the local Gangrel. The rusted gates are locked off from prying eyes, but if you were to hop the fence, you'd find nothing but heaps of scrap parts and chassis from busted old vehicles. Be careful not to make too much noise, if you do decide to venture in there to take a peek. The property owners keep a mean, old guard dog in the lot, likely to bite your hand clean off if he sniffs you out. Truth is, there's not much of a reason to be there unless you're looking to replace the door to your dad's broken down truck from the 70s. Sure, a junkyard may seem interesting, but it's no playground. Sharp metal and columns of poorly stacked cars can be a real hazard if you're not paying attention. Best to steer clear of that place until you have a good reason. During the day, the small office is open from 10 to 6, but you never really know which brother is going to be there, if any.`,
    gps: [-118.1135306, 34.1165886],
  },
  {
    name: 'Giovanni Mansion',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Outskirts',
    blurb: `The Giovanni family is well known throughout Los Angeles for being wealthy, powerful, and dangerously influential. They are infamous for their political and personal affairs and for throwing their weight around to get what they want. The Giovanni Stronghold is a large estate with well-kept grounds, surrounded by heavily wooded acres of land. The compound itself is walled off and monitored by security on a constant basis. The mansion is as cold as it is beautiful, made of greystone and lime, with six towering marble columns holding up the roof to the carport overhang. In the center of the circular, roundabout at the forefront of the mansion, sits an elaborate stone fountain, which filters pure, crystalline water 24/7. If all this wasn't enough to convince outsiders of their wealth and prestige, they would be dazzled by the innards of the facility. Decadent fabrics, polished brass, marble, and glass adorn the interior. Rooms upon rooms exist solely to make the place feel disturbingly vacant.`,
    gps: [-118.64978, 34.1603473]
  },
  {
    name: 'Abandoned Warehouse (Industry)',
    kind: 'poi',
    poitype: 'normal',
    parent: 'Outskirts',
    blurb: `Once a private storage facility, the dilapidated warehouse now only known as “Industrial” is located within the heart of LA’s industrial district. It is a rather large space with hanging fluorescent lights connected to a central generator.\nOn the first level there is a makeshift bar set up with both bottles of booze, blood, and blood spiked with various substances available. The rest of the floor is littered with couches, tables, a pool table, and other such things that could (and shouldn’t) be found in a bar.\nThe second level made up entirely of shoddy catwalks bolted to the sides and across the ceiling of the building.There is a singular office at the top which Baron Baldwin resides for the celebration. Beside the door and it’s guards, there is a small stand with a dispenser of tickets and the sign “take a number” above it.`,
    gps: [-117.9566902, 34.0091277],
  },
];

export const POIS = preprocess_region(pois_downtown.concat(pois_hollywood, pois_innercity, pois_outskirts));
