import { RoomOption, AmenityItem, MenuItem, DiningItem, AttractionItem, ReviewItem, FaqItem } from '../types';

export const RESORT_META = {
  name: 'Rudra Farms and Resort Karjat',
  shortName: 'Rudra Farms',
  address: 'Old Mumbai - Pune Hwy, V7J8+6M Vinegaon, Karjat Chowk, Maharashtra 410206',
  googlePlusCode: 'V7J8+6M Vinegaon',
  coordinates: {
    lat: 18.8805054,
    lng: 73.2667106
  },
  phones: ['+91 90829 51341', '+91 98190 28633', '+91 89768 28632'],
  whatsapp: '919082951341',
  email: 'bookings@rudrafarmsandresort.com',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=18.8805054,73.2667106&hl=en&z=15&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=18.8805054,73.2667106',
  stats: {
    estateAcres: 4,
    roomsCount: 12,
    guestCapacity: 50,
    poolSize: '40ft x 20ft',
    rating: 4.8,
    reviewsCount: 142
  }
};

export interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85',
    tag: 'Exclusive Luxury Buyout',
    title: 'Private 4BHK Villa & Swimming Pool',
    subtitle: 'Surrounded by misty Sahyadri mountain backdrops and peaceful lush greenery in Vinegaon, Karjat'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=85',
    tag: 'Water Oasis',
    title: '40-Ft Crystal Swimming Pool & Rain Dance',
    subtitle: 'Submerged loungers, shallow children pool & poolside sundowner deck with evening ambient illumination'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=2000&q=85',
    tag: 'Celebration Grounds',
    title: '4-Acre Sprawling Manicured Party Lawns',
    subtitle: 'Ideal for birthday milestones, family reunions, box cricket turf, bonfires & corporate team retreats'
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85',
    tag: 'Farm-to-Table Gourmet',
    title: 'In-House Chulha Chef & Live BBQ',
    subtitle: 'Authentic Gavran chicken, pitla thecha, tandoor barbecue grill & traditional Maharashtrian feasting'
  }
];

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'pool' | 'stays' | 'dining' | 'outdoors';
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    title: '4BHK Royal Villa & Private Pool',
    category: 'stays',
    caption: 'Full view of the private villa facade and sparkling pool'
  },
  {
    id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
    title: 'Crystal Pool & Rain Dance Arena',
    category: 'pool',
    caption: '40-ft swimming pool with loungers and mountain backdrop'
  },
  {
    id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    title: 'Deluxe Poolside Cottage Interior',
    category: 'stays',
    caption: 'Teak-wood king bedroom with ensuite bath and veranda'
  },
  {
    id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=85',
    title: '4-Acre Party Lawns & Box Cricket',
    category: 'outdoors',
    caption: 'Sprawling lush green lawns under the open sky'
  },
  {
    id: 'gal-5',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    title: 'Authentic Chulha Cooking & Feast',
    category: 'dining',
    caption: 'Traditional clay-stove preparations and Gavran chicken'
  },
  {
    id: 'gal-6',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    title: 'Sunset over Sahyadri Hills',
    category: 'outdoors',
    caption: 'Golden hour at Rudra Farms Vinegaon'
  },
  {
    id: 'gal-7',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    title: 'Executive Family Suite',
    category: 'stays',
    caption: 'Spacious 2-queen family suite with garden patio'
  },
  {
    id: 'gal-8',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
    title: 'Bonfire Night & Live BBQ',
    category: 'dining',
    caption: 'Evening tandoori barbecue grill and bonfire under starry skies'
  }
];

export const STORY_DATA = {
  badge: 'Welcome to Rudra Farms & Resort',
  heading: 'Where Luxury Meets Sahyadri Nature in Karjat',
  subheading: 'Designed as a private sanctuary away from urban hustle, Rudra Farms blends modern villa comfort with the peaceful rhythm of rural Maharashtra.',
  paragraphs: [
    'Located in Vinegaon right off the Old Mumbai-Pune Highway, Rudra Farms & Resort is set across 4 expansive acres of manicured lawns, fruit orchards, and open open skies with direct views of the Sahyadri foothills.',
    'Whether you are planning a relaxed family weekend, celebrating a birthday or anniversary, hosting a company offsite, or gathering friends for a memorable pool party, Rudra Farms offers complete privacy, in-house chulha dining, and 24/7 hospitality.'
  ],
  stats: [
    { value: '4+ Acres', label: 'Private Estate Grounds' },
    { value: '40 Ft', label: 'Crystal Swimming Pool' },
    { value: '100%', label: 'DG Power Generator Backup' },
    { value: '4.8 ★', label: 'Verified Guest Rating' }
  ]
};

export const ROOMS_DATA: RoomOption[] = [
  {
    id: 'royal-villa-4bhk',
    titleKey: 'room_villa_title',
    taglineKey: 'room_villa_tag',
    category: 'villa',
    capacity: {
      min: 10,
      max: 20,
      bedrooms: 4,
      bathrooms: 4
    },
    basePriceWeekday: 17999,
    basePriceWeekend: 22999,
    featuredImage: '/assets/villa-pool.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    keyFeatures: [
      'Exclusive Private Pool Access',
      '4 King AC Bedrooms with Ensuite Baths',
      'Expansive Living Hall & Dining Patio',
      'Private Lawn with BBQ Setup',
      'In-house Caretaker & Chef'
    ],
    bedType: '4 Master King Beds + 4 Extra Floor Mattresses',
    view: 'Private Swimming Pool & Sahyadri Foothills',
    descriptionKey: 'room_villa_desc'
  },
  {
    id: 'deluxe-cottage',
    titleKey: 'room_cottage_title',
    taglineKey: 'room_cottage_tag',
    category: 'cottage',
    capacity: {
      min: 2,
      max: 4,
      bedrooms: 1,
      bathrooms: 1
    },
    basePriceWeekday: 3999,
    basePriceWeekend: 4999,
    featuredImage: '/assets/cottage.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    keyFeatures: [
      'Direct View of Swimming Pool',
      'Teak-wood Furnished King Bed',
      'Private Veranda Sit-out',
      'Rainfall Shower & Geyser',
      'Complimentary High-speed Wi-Fi'
    ],
    bedType: '1 King Bed + 1 Rollaway Bed',
    view: 'Azure Pool & Garden Pathway',
    descriptionKey: 'room_cottage_desc'
  },
  {
    id: 'family-suite',
    titleKey: 'room_suite_title',
    taglineKey: 'room_suite_tag',
    category: 'suite',
    capacity: {
      min: 4,
      max: 6,
      bedrooms: 1,
      bathrooms: 1
    },
    basePriceWeekday: 5999,
    basePriceWeekend: 7499,
    featuredImage: '/assets/suite.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    keyFeatures: [
      '2 Queen Plush Beds for Families',
      'Spacious Lounge & Sofa Seating',
      'Smart LED TV & Power Backup',
      'Garden View Patio',
      'Individual AC Climate Control'
    ],
    bedType: '2 Queen Beds + 1 Sofa Cum Bed',
    view: 'Lush 4-Acre Party Lawn',
    descriptionKey: 'room_suite_desc'
  },
  {
    id: 'group-dorm',
    titleKey: 'room_dorm_title',
    taglineKey: 'room_dorm_tag',
    category: 'dorm',
    capacity: {
      min: 8,
      max: 14,
      bedrooms: 1,
      bathrooms: 3
    },
    basePriceWeekday: 9999,
    basePriceWeekend: 12999,
    featuredImage: '/assets/dorm.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    keyFeatures: [
      'Ideal for Corporate Offsites & Friends',
      'Individual Clean Bunks with Power Sockets',
      '3 Modern Attached Bathrooms',
      'Immediate Access to Turf & Bonfire Area',
      'Dedicated Locker Storage'
    ],
    bedType: '8 Modern Bunk Units + 4 Single Beds',
    view: 'Cricket Turf & Lawn Field',
    descriptionKey: 'room_dorm_desc'
  }
];

export const AMENITIES_DATA: AmenityItem[] = [
  {
    id: 'pool',
    iconName: 'Waves',
    title: '40-Ft Swimming Pool & Rain Dance',
    description: 'Sparkling clean 40-foot private swimming pool with submerged loungers, shallow children splash zone, poolside rain dance setup, and ambient evening underwater lighting.',
    highlights: ['40ft x 20ft Depth 4.5ft', 'Rain Dance Setup', 'Shallow Kids Area', 'Twilight Pool Lighting'],
    category: 'leisure',
    badge: 'Guest Favorite',
    titleKey: 'amenity_pool_title',
    descKey: 'amenity_pool_desc'
  },
  {
    id: 'lawns',
    iconName: 'Trees',
    title: '4-Acre Manicured Party Lawns',
    description: 'Expansive lush green grass fields framed by Sahyadri foothills, ideal for open-air family gatherings, wedding sangeet, birthday parties, stargazing, and outdoor games.',
    highlights: ['4-Acre Gated Greenery', 'Natural Velvet Grass', 'Sahyadri Hill Views', 'Party & Event Setup'],
    category: 'outdoor',
    badge: '4 Acres',
    titleKey: 'amenity_lawn_title',
    descKey: 'amenity_lawn_desc'
  },
  {
    id: 'chulha-dining',
    iconName: 'UtensilsCrossed',
    title: 'Authentic Chulha Kitchen & Feasts',
    description: 'Traditional wood-fired clay chulha culinary kitchen offering authentic rustic Maharashtrian dishes, spicy Gavran chicken rassa, hot jowar/bajra bhakri, and local village curries.',
    highlights: ['Wood-Fired Clay Chulha', 'Fresh Jowar & Bajra Bhakri', 'Gavran Non-Veg & Veg Thali', 'Spicy Hand-Pounded Thecha'],
    category: 'dining',
    badge: 'Farm to Table',
    titleKey: 'amenity_dining_title',
    descKey: 'amenity_dining_desc'
  },
  {
    id: 'bbq-bonfire',
    iconName: 'Flame',
    title: 'Bonfire Nights & Live Barbecue',
    description: 'Enjoy cozy Karjat evening breezes with a crackling open wood bonfire, live charcoal barbecue grill station, acoustic music, and sizzling marinated starters.',
    highlights: ['Open Bonfire Under Stars', 'Live Charcoal BBQ Grill', 'Paneer & Chicken Skewers', 'Lawn Seating & Music'],
    category: 'leisure',
    badge: 'Night Experience',
    titleKey: 'amenity_bbq_title',
    descKey: 'amenity_bbq_desc'
  },
  {
    id: 'cricket-turf',
    iconName: 'Trophy',
    title: 'Box Cricket Turf & Volleyball Lawn',
    description: 'Dedicated sports turf and level playground equipped with tournament cricket gear, leather and tennis bats, volleyball net, badminton rackets, and footballs.',
    highlights: ['Box Cricket Pitch & Kit', 'Volleyball & Badminton', 'Football & Tug of War', 'Night Floodlit Sports'],
    category: 'outdoor',
    badge: 'Sports Turf',
    titleKey: 'amenity_sports_title',
    descKey: 'amenity_sports_desc'
  },
  {
    id: 'indoor-games',
    iconName: 'Gamepad2',
    title: 'Indoor Game Lounge & Recreation',
    description: 'Indoor recreation clubhouse featuring professional Sissoo carrom boards, international chess tables, playing cards, Uno, Jenga towers, and engaging family board games.',
    highlights: ['Tournament Carrom Boards', 'Chess & Strategy Games', 'Playing Cards & Uno', 'All-Weather Indoor Play'],
    category: 'leisure',
    badge: 'All Weather',
    titleKey: 'amenity_indoor_title',
    descKey: 'amenity_indoor_desc'
  },
  {
    id: 'pet-friendly',
    iconName: 'Dog',
    title: '100% Pet-Friendly Fenced Sanctuary',
    description: 'Bring your beloved pets along without worry. Four completely gated and safe acres provide boundless open green grass for furry friends to run, play, and explore.',
    highlights: ['100% Gated & Fenced', 'No Breed Restrictions', 'Fresh Water & Lawn Run', 'Zero Extra Pet Fee'],
    category: 'comfort',
    badge: '100% Welcomed',
    titleKey: 'amenity_pet_title',
    descKey: 'amenity_pet_desc'
  },
  {
    id: 'power-backup',
    iconName: 'Zap',
    title: '100% DG Generator Power Backup',
    description: 'Complete power security with uninterrupted heavy-duty industrial diesel generator backup running 24/7, keeping all 12 air conditioners, geysers, lights, and appliances active.',
    highlights: ['Silent Heavy-Duty DG Set', 'Runs All 12 AC Units', 'Pool Pumps & Geysers', 'Uninterrupted Wi-Fi & Lights'],
    category: 'comfort',
    badge: '24/7 Assured',
    titleKey: 'amenity_power_title',
    descKey: 'amenity_power_desc'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Non-Veg Specials
  {
    id: 'menu-1',
    name: 'Gavran Chulha Chicken Thali',
    category: 'nonveg',
    price: 380,
    portion: 'Per Full Thali',
    description: 'Country chicken slow-cooked in rich roasted khada masala on traditional wood-fired clay chulha. Served with 3 hot bajra/jowar bhakris, fragrant rassa, steamed rice, sliced onions, and freshly pounded green chilli thecha.',
    isVeg: false,
    isChefSpecial: true,
    badge: "★ CHEF'S SIGNATURE",
    spicyLevel: 3
  },
  {
    id: 'menu-2',
    name: 'Sukka Mutton Masala Handi',
    category: 'nonveg',
    price: 520,
    portion: 'Serves 2-3 Persons',
    description: 'Tender baby goat mutton simmered with dry roasted coconut, Kolhapuri lavangi chillies, and garlic cloves over slow wood embers. Bursting with authentic rustic flavours.',
    isVeg: false,
    isChefSpecial: true,
    badge: 'RESORT BESTSELLER',
    spicyLevel: 3
  },
  {
    id: 'menu-3',
    name: 'Karjat Farm Egg Curry (Anda Rassa)',
    category: 'nonveg',
    price: 240,
    portion: 'Serves 2 Persons',
    description: 'Farm-fresh boiled eggs sautéed in turmeric and simmered in a spiced tomato-onion-garlic rustic gravy. Perfect with piping hot chapatis or bhakri.',
    isVeg: false,
    isChefSpecial: false,
    spicyLevel: 2
  },
  {
    id: 'menu-4',
    name: 'Gavran Chicken Fry (Dry Starter)',
    category: 'nonveg',
    price: 360,
    portion: 'Per Plate (Serves 2)',
    description: 'Crispy pan-roasted country chicken chunks tossed with curry leaves, crushed pepper, ginger-garlic paste, and green chillies.',
    isVeg: false,
    isChefSpecial: false,
    spicyLevel: 2
  },

  // Pure Veg Authentic Chulha
  {
    id: 'menu-5',
    name: 'Pitla Bhakri & Mirchi Thecha',
    category: 'veg',
    price: 260,
    portion: 'Per Full Thali',
    description: 'Creamy golden gram-flour curry tempered with pungent garlic, mustard seeds, and fresh coriander. Accompanied by 3 hand-tossed hot jowar/bajra bhakris, raw onions, and spicy green chilli thecha.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'MAHARASHTRIAN ICON',
    spicyLevel: 2
  },
  {
    id: 'menu-6',
    name: 'Paneer Angara Handi',
    category: 'veg',
    price: 340,
    portion: 'Serves 2-3 Persons',
    description: 'Fresh malai paneer cubes simmered in a rich tomato-cashew gravy with a live charcoal smoke infusion (dhungar) that imparts an intoxicating tandoori aroma.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'GUEST FAVORITE',
    spicyLevel: 2
  },
  {
    id: 'menu-7',
    name: 'Kaju Masala & Butter Naan / Paratha',
    category: 'veg',
    price: 360,
    portion: 'Serves 2 Persons',
    description: 'Whole roasted cashews cooked in a velvety spiced makhani and onion-tomato gravy. Rich, nutty, and delightful for special family dinners.',
    isVeg: true,
    isChefSpecial: false,
    spicyLevel: 1
  },
  {
    id: 'menu-8',
    name: 'Dal Tadka & Jeera Rice',
    category: 'veg',
    price: 240,
    portion: 'Serves 2-3 Persons',
    description: 'Slow-cooked yellow lentils tempered in pure desi ghee with whole cumin, dry red Kashmiri chillies, garlic, and hing, paired with aromatic long-grain basmati jeera rice.',
    isVeg: true,
    isChefSpecial: false,
    spicyLevel: 1
  },

  // Live Barbecue & Starters
  {
    id: 'menu-9',
    name: 'Live BBQ Tandoori Platter (Non-Veg)',
    category: 'bbq',
    price: 490,
    portion: '8 Pieces (Serves 2-3)',
    description: 'Chicken drumsticks and bone-in tikka marinated overnight in hung curd, Kashmiri deghi mirch, and mustard oil, grilled fresh right in front of you over live coconut charcoal.',
    isVeg: false,
    isChefSpecial: true,
    badge: 'LIVE BBQ STAR',
    spicyLevel: 2
  },
  {
    id: 'menu-10',
    name: 'Paneer & Veggies Charcoal Skewers',
    category: 'bbq',
    price: 380,
    portion: '6 Skewers (Serves 2)',
    description: 'Succulent paneer cubes, bell peppers, baby onions, and pineapple charred to perfection on iron skewers with mint chutney and spicy chaat masala.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'BBQ FAVORITE',
    spicyLevel: 1
  },
  {
    id: 'menu-11',
    name: 'Hot Crispy Kanda Bhaji (Lawn Snacks)',
    category: 'bbq',
    price: 160,
    portion: 'Per Basket (Serves 2)',
    description: 'Thinly sliced crispy onion fritters tossed in carom seeds (ajwain), rice flour, and green chillies, fried crisp and golden with salted fried chillies.',
    isVeg: true,
    isChefSpecial: false,
    spicyLevel: 2
  },

  // Farm Breakfast & Hi-Tea
  {
    id: 'menu-12',
    name: 'Kolhapuri Misal Pav with Farsan',
    category: 'breakfast',
    price: 180,
    portion: 'Per Set (2 Pavs + Kat Rassa)',
    description: 'Sprouted moth beans in fiery aromatic kat rassa, topped with crunchy farsan, diced onions, coriander, and fresh lemon, served with soft buttered pav bread.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'BREAKFAST HIT',
    spicyLevel: 3
  },
  {
    id: 'menu-13',
    name: 'Kanda Poha & Steaming Adrak Chai',
    category: 'breakfast',
    price: 140,
    portion: 'Per Portion',
    description: 'Fluffy beaten rice tempered with mustard, roasted peanuts, curry leaves, and green chillies, topped with fresh grated coconut and paired with spiced ginger-cardamom tea.',
    isVeg: true,
    isChefSpecial: false,
    spicyLevel: 1
  },
  {
    id: 'menu-14',
    name: 'Farm Fresh Masala Omelette & Toast',
    category: 'breakfast',
    price: 160,
    portion: '2-Egg Omelette + 2 Toasts',
    description: 'Fluffy two-egg omelette prepared with finely chopped onions, tomatoes, green chillies, and fresh coriander, served with toasted butter bread and ketchup.',
    isVeg: false,
    isChefSpecial: false,
    spicyLevel: 1
  },

  // Beverages & Desserts
  {
    id: 'menu-15',
    name: 'Chilled Kokum Solkadhi',
    category: 'dessert-beverage',
    price: 90,
    portion: 'Per Tall Glass',
    description: 'Refreshing digestive nectar made from real wild kokum petals, fresh thick coconut milk, garlic, green chillies, and rock salt. The quintessential Maharashtrian cooler.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'MUST TRY COOLER',
    spicyLevel: 1
  },
  {
    id: 'menu-16',
    name: 'Authentic Ukdiche Modak (2 Pcs)',
    category: 'dessert-beverage',
    price: 150,
    portion: '2 Warm Pieces',
    description: 'Steamed rice flour dumplings stuffed with fragrant grated coconut, organic jaggery, cardamom, and nutmeg, served warm with a drizzle of pure cow ghee.',
    isVeg: true,
    isChefSpecial: true,
    badge: 'TRADITIONAL SWEET',
    spicyLevel: 1
  },
  {
    id: 'menu-17',
    name: 'Hot Gulab Jamun in Saffron Syrup',
    category: 'dessert-beverage',
    price: 120,
    portion: '2 Big Pieces',
    description: 'Melt-in-mouth milk mawa balls deep-fried to deep golden and steeped in aromatic saffron and cardamom rose syrup.',
    isVeg: true,
    isChefSpecial: false,
    spicyLevel: 1
  }
];

export const DINING_ITEMS: DiningItem[] = [
  {
    id: 'dish-1',
    name: 'Gavran Chulha Chicken & Bhakri',
    nameKey: 'dish_chicken',
    category: 'lunch-dinner',
    isVeg: false,
    specialty: true,
    descKey: 'dish_chicken_desc'
  },
  {
    id: 'dish-2',
    name: 'Pitla Bhakri & Mirchi Thecha',
    nameKey: 'dish_pitla',
    category: 'lunch-dinner',
    isVeg: true,
    specialty: true,
    descKey: 'dish_pitla_desc'
  },
  {
    id: 'dish-3',
    name: 'Paneer Handi & Dal Tadka',
    nameKey: 'dish_paneer',
    category: 'lunch-dinner',
    isVeg: true,
    specialty: false,
    descKey: 'dish_paneer_desc'
  },
  {
    id: 'dish-4',
    name: 'Live Tandoori Barbecue',
    nameKey: 'dish_bbq',
    category: 'bbq',
    isVeg: false,
    specialty: true,
    descKey: 'dish_bbq_desc'
  },
  {
    id: 'dish-5',
    name: 'Evening High Tea & Kanda Bhaji',
    nameKey: 'dish_snacks',
    category: 'breakfast-snacks',
    isVeg: true,
    specialty: false,
    descKey: 'dish_snacks_desc'
  }
];

export const ATTRACTIONS_DATA: AttractionItem[] = [
  {
    id: 'morbe-dam',
    name: 'Morbe Dam & Scenic Lake',
    distanceKm: 8,
    driveTimeMin: 12,
    category: 'nature',
    description: 'Picturesque gravity dam reservoir fed by the pristine Dhavari river, surrounded by rolling Sahyadri hills, cool sunset breezes, and stunning landscape photography spots.',
    highlight: 'Scenic sunrise, cool breezes & lake photography',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: 'Morbe Dam, Khalapur, Maharashtra',
    descKey: 'attr_morbe_desc'
  },
  {
    id: 'nd-studio',
    name: "ND's Film World (Film Studio)",
    distanceKm: 9,
    driveTimeMin: 15,
    category: 'entertainment',
    description: 'Famed 52-acre Bollywood studio showcasing grand royal palaces, iconic movie sets from Jodhaa Akbar & Bajirao Mastani, themed streets, and live dance performances.',
    highlight: 'Bollywood movie sets & theme park tours',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: "ND's Film World, Chowk, Karjat Road, Hatnoli, Maharashtra",
    descKey: 'attr_nd_desc'
  },
  {
    id: 'bhivpuri-waterfall',
    name: 'Bhivpuri & Zenith Waterfalls',
    distanceKm: 14,
    driveTimeMin: 22,
    category: 'waterfall',
    description: 'Spectacular Sahyadri monsoon waterfalls featuring rushing mountain cascades, natural plunge rock pools, and emerald green hiking trails suited for families and trekkers.',
    highlight: 'Natural plunge pools & lush green monsoon treks',
    image: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: 'Bhivpuri Waterfalls, Karjat, Maharashtra',
    descKey: 'attr_bhivpuri_desc'
  },
  {
    id: 'kothaligad-fort',
    name: 'Kothaligad (Peth) Fort',
    distanceKm: 24,
    driveTimeMin: 35,
    category: 'heritage',
    description: 'Historic funnel-shaped hilltop fortress famed for its unique internal spiral stone staircase carved right through the central rock chimney, offering 360° Sahyadri panoramas.',
    highlight: 'Internal spiral stone staircase & 360° views',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: 'Kothaligad Fort, Karjat, Maharashtra',
    descKey: 'attr_kothaligad_desc'
  },
  {
    id: 'kondana-caves',
    name: 'Kondana Buddhist Caves',
    distanceKm: 18,
    driveTimeMin: 28,
    category: 'heritage',
    description: 'Ancient 1st-century BCE rock-cut Buddhist chaitya halls and monastery cells nestled deep within dense jungle trails with natural waterfalls cascading over the cave mouth in monsoon.',
    highlight: 'Ancient 1st Century BC rock-cut Buddhist architecture',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: 'Kondana Caves, Rajmachi Trek Path, Karjat',
    descKey: 'attr_caves_desc'
  },
  {
    id: 'ulhas-valley',
    name: 'Ulhas Valley & Viewpoint',
    distanceKm: 16,
    driveTimeMin: 25,
    category: 'nature',
    description: 'Breathtaking canyon valley glistening with meandering streams and roaring seasonal torrents, famous for scenic photography and tranquil mountain breezes.',
    highlight: 'Deep Sahyadri gorge canyon & panoramic sunset views',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    mapDestinationQuery: 'Ulhas Valley, Karjat, Maharashtra',
    descKey: 'attr_ulhas_desc'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aditya & Neha Deshmukh',
    city: 'Thane, Mumbai',
    stayType: '4BHK Royal Villa',
    category: 'villa',
    date: 'February 2026',
    rating: 5,
    groupSize: '18 Family Members',
    comment: 'Booked the entire 4BHK villa for our joint family gathering of 18 people. The swimming pool is huge, sparkling clean, and the surrounding 4-acre lawn gave the kids immense space to play box cricket. The authentic chicken thali and wood-fired chulha bhakri made by the caretakers was outstanding! Having sole privacy without any other guests around made this the best weekend ever.',
    highlightTags: ['Exclusive Villa Buyout', 'Chulha Chicken Thali', 'Clean Swimming Pool']
  },
  {
    id: 'rev-2',
    author: 'Kunal Patil & Offsite Team',
    city: 'Wakad, Pune',
    stayType: 'Deluxe Cottage + Group Dorm',
    category: 'corporate',
    date: 'January 2026',
    rating: 5,
    groupSize: '24 Team Members',
    comment: 'Our tech startup team spent 2 days here for an annual strategy offsite. The silent heavy-duty DG generator backup ran all air-conditioners and Wi-Fi seamlessly without a flicker. The lawn box cricket tournament and the evening starlit live barbecue with bonfire made it unforgettable. Staff is extremely polite and accommodating.',
    highlightTags: ['100% DG Power Backup', 'Cricket Turf & BBQ', 'Superb Hospitality']
  },
  {
    id: 'rev-3',
    author: 'Dr. Shalini Merchant & Family',
    city: 'Chembur, Mumbai',
    stayType: 'Executive Family Suite',
    category: 'pets',
    date: 'January 2026',
    rating: 5,
    groupSize: 'Family of 4 + Golden Retriever',
    comment: 'Finding a truly 100% pet-friendly luxury resort near Mumbai is difficult, but Rudra Farms exceeded all our expectations! The 4 acres of gated green grass gave our Golden Retriever, Leo, the absolute time of his life. The suite rooms were spotless, AC was chilled, and the food felt just like home. We are already booking our return trip for the rains.',
    highlightTags: ['100% Pet Friendly', 'Gated 4 Acres', 'Fresh Home-style Food']
  },
  {
    id: 'rev-4',
    author: 'Vikram & Priya Singhania',
    city: 'Bandra, Mumbai',
    stayType: 'Full Estate Exclusive Buyout',
    category: 'celebration',
    date: 'December 2025',
    rating: 5,
    groupSize: '35 Guests (30th Birthday Event)',
    comment: 'Celebrated my husband’s 30th birthday party here with 35 guests. The lawn arrangement, fairy light setup, sound system, and poolside rain dance was flawless. The caretakers served hot tandoori starters right by the bonfire until midnight. Having the whole 4-acre property exclusively for our group gave us total freedom and luxury.',
    highlightTags: ['Poolside Rain Dance', 'Midnight Bonfire & Starters', 'Sole Estate Privacy']
  },
  {
    id: 'rev-5',
    author: 'Rohan Joshi & Trek Group',
    city: 'Kothrud, Pune',
    stayType: 'Group Dormitory + Cottages',
    category: 'family',
    date: 'December 2025',
    rating: 5,
    groupSize: '14 Friends',
    comment: 'Visited after our morning hike to nearby Kothaligad Fort. The dormitory is super clean with 3 attached bathrooms and fresh linen. Jumping into the crystal pool after a tiring trek was pure bliss. Dinner was served hot from the village chulha with Gavran chicken and pitla-bhakri. Highly recommend this for group reunions!',
    highlightTags: ['Clean Bunk Dorm', 'Refreshing Swimming Pool', 'Authentic Pitla Bhakri']
  },
  {
    id: 'rev-6',
    author: 'Rajesh & Sunita Shah',
    city: 'Ghatkopar, Mumbai',
    stayType: '4BHK Villa & Ground Floor Cottages',
    category: 'family',
    date: 'November 2025',
    rating: 5,
    groupSize: 'Multi-Generation Family of 16',
    comment: 'Hosted our parents’ 50th golden anniversary here. Having ground floor cottages made it extremely comfortable for senior family members. The resort staff prepared special Jain food without onion-garlic on our request, which tasted heavenly. The tranquil greenery and peaceful birdsong in the morning was soothing.',
    highlightTags: ['Special Jain Meals', 'Senior Citizen Friendly', 'Serene Nature']
  },
  {
    id: 'rev-7',
    author: 'Ananya & Sameer Mehta',
    city: 'Andheri West, Mumbai',
    stayType: 'Poolside Deluxe Cottage',
    category: 'villa',
    date: 'November 2025',
    rating: 5,
    groupSize: 'Couple Getaway',
    comment: 'Just a 90-minute easy drive from Mumbai via the Karjat Chowk exit. The cottage had a private sit-out veranda facing the pool. At night, sitting under the clear starry sky with zero city noise was magical. Sipping freshly brewed adrak chai with hot kanda bhaji during sunset is a must-do experience.',
    highlightTags: ['90 Mins from Mumbai', 'Starry Night Views', 'High-Tea Kanda Bhaji']
  },
  {
    id: 'rev-8',
    author: 'Amitabh Sen & Bikers Fraternity',
    city: 'Viman Nagar, Pune',
    stayType: 'Deluxe Cottages + Lawns',
    category: 'corporate',
    date: 'October 2025',
    rating: 5,
    groupSize: '12 Riders',
    comment: 'Perfect weekend stopover on the Old Mumbai-Pune highway route. Secure gated parking for all our superbikes, spacious rooms, uninterrupted generator backup, and very warm hospitable caretakers. The live barbecue chicken and solkadhi was top notch. 10 on 10 hospitality!',
    highlightTags: ['Secure Gated Parking', 'Live BBQ & Solkadhi', 'Superb Host']
  }
];

export const FAQS_DATA: FaqItem[] = [
  { id: 'faq-1', questionKey: 'faq_1_q', answerKey: 'faq_1_a' },
  { id: 'faq-2', questionKey: 'faq_2_q', answerKey: 'faq_2_a' },
  { id: 'faq-3', questionKey: 'faq_3_q', answerKey: 'faq_3_a' },
  { id: 'faq-4', questionKey: 'faq_4_q', answerKey: 'faq_4_a' },
  { id: 'faq-5', questionKey: 'faq_5_q', answerKey: 'faq_5_a' }
];
