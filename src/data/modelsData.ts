import heroFashionEditorial from '../assets/images/hero_fashion_editorial_1790271486872.jpg';
import modelFemale1 from '../assets/images/model_editorial_female_1_1790271506719.jpg';
import modelMale1 from '../assets/images/model_editorial_male_1_1790271522861.jpg';
import modelFemale2 from '../assets/images/model_editorial_female_2_1790271538047.jpg';

export { heroFashionEditorial, modelFemale1, modelMale1, modelFemale2 };

export interface Model {
  id: string;
  name: string;
  board: 'Women' | 'Men' | 'Runway' | 'New Faces';
  representation: string; // e.g. "Paris · Milan Exclusive"
  height: string;
  heightCm: number;
  bustOrChest: string;
  waist: string;
  hips: string;
  shoes: string;
  eyes: string;
  hair: string;
  dressOrSuit?: string;
  image: string;
  secondaryImages: string[];
  polaroids: {
    label: string;
    caption: string;
  }[];
  campaigns: string[];
  runwayShows: string[];
  featuredMagazine: string;
  bio: string;
  instagram: string;
}

export interface Campaign {
  id: string;
  title: string;
  client: string;
  season: string;
  photographer: string;
  stylist: string;
  featuredTalent: string[];
  category: 'Editorial' | 'Runway' | 'Commercial' | 'Haute Couture';
  coverImage: string;
  description: string;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  headAgent: string;
  timezone: string;
}

export const AGENCY_OFFICES: Office[] = [
  {
    city: 'Paris',
    country: 'France',
    address: '28 Avenue Montaigne, 75008 Paris',
    email: 'paris@maisonnoir-mgmt.com',
    phone: '+33 1 42 68 55 00',
    headAgent: 'Laurent de Saint-Germain',
    timezone: 'CET (UTC+1)'
  },
  {
    city: 'Milan',
    country: 'Italy',
    address: 'Via Montenapoleone 14, 20121 Milano',
    email: 'milan@maisonnoir-mgmt.com',
    phone: '+39 02 7600 4821',
    headAgent: 'Chiara Vercellone',
    timezone: 'CET (UTC+1)'
  },
  {
    city: 'New York',
    country: 'United States',
    address: '492 Broome Street, SoHo, NY 10013',
    email: 'ny@maisonnoir-mgmt.com',
    phone: '+1 212 941 7730',
    headAgent: 'Marcus Sterling',
    timezone: 'EST (UTC-5)'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    address: '5-7-22 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    email: 'tokyo@maisonnoir-mgmt.com',
    phone: '+81 3 5468 9120',
    headAgent: 'Kenzo Takahashi',
    timezone: 'JST (UTC+9)'
  }
];

export const MODELS_ROSTER: Model[] = [
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    board: 'Women',
    representation: 'Paris · Milan Direct',
    height: `5' 11" · 180 cm`,
    heightCm: 180,
    bustOrChest: '32" / 81 cm',
    waist: '24" / 61 cm',
    hips: '35" / 89 cm',
    shoes: '40 EU / 9 US',
    eyes: 'Emerald Grey',
    hair: 'Dark Espresso',
    dressOrSuit: '34 FR / 2 US',
    image: modelFemale1,
    secondaryImages: [heroFashionEditorial, modelFemale2],
    polaroids: [
      { label: 'Front Digital', caption: 'Clean profile, zero makeup, natural daylight' },
      { label: 'Left Profile', caption: 'Jawline definition & bone structure' },
      { label: 'Full Length', caption: 'Proportion & posture check in black swimwear' }
    ],
    campaigns: ['Saint Laurent Fall/Winter', 'Chanel Haute Joaillerie', 'Vogue Italia Cover'],
    runwayShows: ['Prada Exclusive FW26', 'Balenciaga Couture', 'Alexander McQueen'],
    featuredMagazine: 'Vogue France Editorial Issue 1042',
    bio: 'Renowned for razor-sharp facial symmetry and chiseled bone structure, Elena is an editorial favorite among European luxury houses, frequently opening Paris Couture shows.',
    instagram: '@elena.rostova'
  },
  {
    id: 'mathias-vance',
    name: 'Mathias Vance',
    board: 'Men',
    representation: 'New York · Paris Exclusive',
    height: `6' 2" · 188 cm`,
    heightCm: 188,
    bustOrChest: '38" / 96 cm',
    waist: '30" / 76 cm',
    hips: '36" / 91 cm',
    shoes: '44 EU / 10.5 US',
    eyes: 'Deep Amber',
    hair: 'Raven Black',
    dressOrSuit: '38R / 48 EU',
    image: modelMale1,
    secondaryImages: [heroFashionEditorial],
    polaroids: [
      { label: 'Headshot Digital', caption: 'Natural contrast test, raw studio daylight' },
      { label: 'Side Profile', caption: 'Sculpted profile and neck line' },
      { label: 'Full Stance', caption: 'Tailored stance, unbuttoned black shirt' }
    ],
    campaigns: ['Dior Men Winter Campaign', 'Bottega Veneta Tailoring', 'GQ Style Global Feature'],
    runwayShows: ['Hermès Menswear', 'Dior Homme Paris', 'Fendi Runway Milan'],
    featuredMagazine: 'Arena Homme+ Spring Cover',
    bio: 'Commanding physical stature combined with classic sartorial charisma. Mathias represents the modern standard of architectural tailoring and high-fashion cinema.',
    instagram: '@mathias.vance'
  },
  {
    id: 'soraya-nadal',
    name: 'Soraya Nadal',
    board: 'Women',
    representation: 'Milan · New York Direct',
    height: `5' 10½" · 179 cm`,
    heightCm: 179,
    bustOrChest: '33" / 84 cm',
    waist: '24.5" / 62 cm',
    hips: '35" / 89 cm',
    shoes: '39 EU / 8.5 US',
    eyes: 'Warm Topaz',
    hair: 'Honey Brown',
    dressOrSuit: '36 FR / 4 US',
    image: modelFemale2,
    secondaryImages: [modelFemale1, heroFashionEditorial],
    polaroids: [
      { label: 'Natural Light Digital', caption: 'Natural radiant glow, zero retouch' },
      { label: '3/4 Turn', caption: 'Ear and cheekbone focal angle' },
      { label: 'Full Figure', caption: 'Classic editorial elongation' }
    ],
    campaigns: ['Bvlgari Fine Jewels', 'Gucci Beauty Worldwide', 'Harper\'s Bazaar UK'],
    runwayShows: ['Versace Opening Look', 'Fendi Spring/Summer', 'Jacquemus Provence'],
    featuredMagazine: 'Harper\'s Bazaar Global Icon Issue',
    bio: 'A luminary presence bridging high-end jewelry campaigns and global luxury runway. Soraya embodies luminous warmth and commanding grace on every platform.',
    instagram: '@soraya.nadal'
  },
  {
    id: 'kofi-mensah',
    name: 'Kofi Mensah',
    board: 'Runway',
    representation: 'Paris · London Exclusive',
    height: `6' 3" · 191 cm`,
    heightCm: 191,
    bustOrChest: '37" / 94 cm',
    waist: '29" / 74 cm',
    hips: '35.5" / 90 cm',
    shoes: '45 EU / 11.5 US',
    eyes: 'Dark Obsidian',
    hair: 'Close Crop Black',
    dressOrSuit: '40L / 50 EU',
    image: modelMale1,
    secondaryImages: [heroFashionEditorial],
    polaroids: [
      { label: 'Casting Polaroid', caption: 'Milano agency digital casting, bare skin' },
      { label: 'Profile Silhouette', caption: 'Elongated proportion check' },
      { label: 'Walk Sequence', caption: 'Catwalk balance and stride analysis' }
    ],
    campaigns: ['Louis Vuitton Horizon', 'Loewe Kinetic Series', 'Dazed Magazine'],
    runwayShows: ['Rick Owens Paris', 'Balmain Show', 'Givenchy Exclusive'],
    featuredMagazine: 'i-D The Vanguard Issue',
    bio: 'Celebrated for an unmistakable, powerful runway walk and striking graphic facial lines, Kofi has walked over 40 major international shows in the past two seasons.',
    instagram: '@kofi.mensah'
  },
  {
    id: 'camille-moreau',
    name: 'Camille Moreau',
    board: 'Runway',
    representation: 'Paris Main Board',
    height: `5' 11½" · 181 cm`,
    heightCm: 181,
    bustOrChest: '31.5" / 80 cm',
    waist: '23.5" / 60 cm',
    hips: '34.5" / 88 cm',
    shoes: '41 EU / 9.5 US',
    eyes: 'Icy Blue',
    hair: 'Platinum Blonde',
    dressOrSuit: '34 FR / 2 US',
    image: modelFemale1,
    secondaryImages: [heroFashionEditorial],
    polaroids: [
      { label: 'Direct Sunlight Polaroid', caption: 'High aperture casting snap' },
      { label: 'Profile Study', caption: 'Sculptural neckline and profile' },
      { label: 'Composite Digital', caption: 'Agency standard metric composite' }
    ],
    campaigns: ['Celine Haute Parfumerie', 'Miu Miu Worldwide', 'Self Service Mag'],
    runwayShows: ['Saint Laurent Trocadéro', 'Courrèges Opening', 'Acne Studios'],
    featuredMagazine: 'Numéro Paris October Issue',
    bio: 'Uncompromisingly modern with an icy, statuesque aura. Camille is a recurring muse for French haute couture and minimalist directional fashion.',
    instagram: '@camille.moreau'
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    board: 'New Faces',
    representation: 'Tokyo · Paris Development',
    height: `5' 10" · 178 cm`,
    heightCm: 178,
    bustOrChest: '32" / 81 cm',
    waist: '24" / 61 cm',
    hips: '35" / 89 cm',
    shoes: '39 EU / 8.5 US',
    eyes: 'Dark Hazel',
    hair: 'Jet Black Gloss',
    dressOrSuit: '34 FR / 2 US',
    image: modelFemale2,
    secondaryImages: [heroFashionEditorial],
    polaroids: [
      { label: 'New Face Polaroids', caption: 'Raw natural lighting, fresh digital intake' },
      { label: 'Side Test', caption: 'Symmetry and natural texture test' },
      { label: 'Scale Test', caption: '3/4 crop full stance' }
    ],
    campaigns: ['Shiseido Global Skincare', 'Issey Miyake Pleats', 'W Magazine'],
    runwayShows: ['Sacai Paris Debut', 'Comme des Garçons', 'Undercover Tokyo'],
    featuredMagazine: 'Vogue Japan Next Generation Issue',
    bio: 'Scouted on the streets of Shibuya and immediately signed to the Paris development division. Sora brings ethereal grace and modern graphic poise.',
    instagram: '@sora.takahashi'
  },
  {
    id: 'julian-arche',
    name: 'Julian Arché',
    board: 'New Faces',
    representation: 'New York Development',
    height: `6' 1½" · 187 cm`,
    heightCm: 187,
    bustOrChest: '38" / 97 cm',
    waist: '30" / 76 cm',
    hips: '36" / 91 cm',
    shoes: '43.5 EU / 10 US',
    eyes: 'Deep Green',
    hair: 'Chestnut Waves',
    dressOrSuit: '38R / 48 EU',
    image: modelMale1,
    secondaryImages: [heroFashionEditorial],
    polaroids: [
      { label: 'Intake Digital', caption: 'Natural window daylight test' },
      { label: 'Profile Arch', caption: 'Collarbone and jaw alignment' },
      { label: 'Stance Polaroid', caption: 'Proportion and shoulder line' }
    ],
    campaigns: ['Calvin Klein Minimal Series', 'Jil Sander Pre-Fall', 'Hero Magazine'],
    runwayShows: ['Prada Menswear FW26 Exclusive', 'Lemaire Paris'],
    featuredMagazine: 'Dust Magazine Issue 24',
    bio: 'Discovered in Brooklyn, Julian captured immediate industry interest with his timeless 90s minimalism and effortless camera presence.',
    instagram: '@julian.arche'
  },
  {
    id: 'amira-khalil',
    name: 'Amira Khalil',
    board: 'Women',
    representation: 'Paris · Milan Direct',
    height: `5' 11" · 180 cm`,
    heightCm: 180,
    bustOrChest: '33.5" / 85 cm',
    waist: '25" / 63 cm',
    hips: '36" / 91 cm',
    shoes: '40 EU / 9 US',
    eyes: 'Dark Walnut',
    hair: 'Ebony Curls',
    dressOrSuit: '36 FR / 4 US',
    image: modelFemale1,
    secondaryImages: [modelFemale2],
    polaroids: [
      { label: 'Agency Headshot', caption: 'Natural curl definition, no makeup' },
      { label: 'Side Angle', caption: 'High cheekbone contour' },
      { label: 'Full Spec Stance', caption: 'Clean silhouette in studio black' }
    ],
    campaigns: ['Armani Privé Beauty', 'Tom Ford Eyewear', 'Elle International'],
    runwayShows: ['Elie Saab Haute Couture', 'Zuhair Murad', 'Max Mara Milan'],
    featuredMagazine: 'Vogue Arabia Cover September',
    bio: 'An international powerhouse with commanding runway fluidity and radiant editorial range. Amira is a staple of haute couture fashion weeks.',
    instagram: '@amira.khalil'
  }
];

export const CAMPAIGNS_LIST: Campaign[] = [
  {
    id: 'haute-monolith',
    title: 'Architectural Monolith FW26',
    client: 'Maison Noir Editorial Archive',
    season: 'Autumn / Winter 2026',
    photographer: 'Sébastien Vane',
    stylist: 'Charlotte Duclos',
    featuredTalent: ['Elena Rostova', 'Mathias Vance', 'Camille Moreau'],
    category: 'Haute Couture',
    coverImage: heroFashionEditorial,
    description: 'A study in stark monumentalism, structured brutalist tailoring, and chiaroscuro studio lighting capturing the agency roster in sharp collective unity.'
  },
  {
    id: 'luminous-radiance',
    title: 'The Golden Ratio: Haute Joaillerie',
    client: 'Atelier de Haute Joaillerie Paris',
    season: 'Spring / Summer 2026',
    photographer: 'Elena Martens',
    stylist: 'Pauline Mercier',
    featuredTalent: ['Soraya Nadal', 'Sora Takahashi'],
    category: 'Commercial',
    coverImage: modelFemale2,
    description: 'An intimate, high-definition exploration of unretouched skin texture, warmth, and handcrafted sculpted gold heirlooms.'
  },
  {
    id: 'nocturne-tailoring',
    title: 'Nocturne: Sartorial Geometry',
    client: 'Via Condotti Sartoria',
    season: 'Fall 2026',
    photographer: 'Matteo Bellini',
    stylist: 'Luca Forlani',
    featuredTalent: ['Mathias Vance', 'Kofi Mensah'],
    category: 'Editorial',
    coverImage: modelMale1,
    description: 'Oversized double-breasted cashmere overcoats framed by directional tungsten light, evoking the cinematic golden age of Milanese tailoring.'
  }
];

