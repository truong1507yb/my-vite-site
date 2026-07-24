export interface LicensePrice {
  personal: number;
  commercial: number;
  extended: number;
  exclusive: number;
}

export interface ExifData {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  resolution: string;
}

export interface ImageVersion {
  id: string;
  name: string;
  url: string;
  isPrimary: boolean;
  createdDate: string;
}

export interface AIHistoryLog {
  id: string;
  action: string;
  versionId: string;
  date: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  title: string;
  description: string;
  url: string; // display preview URL
  originalUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  colors: string[];
  photographerId: string;
  uploadDate: string;
  views: number;
  downloads: number;
  likes: number;
  featured: boolean;
  exif: ExifData;
  prices: LicensePrice;
  versions: ImageVersion[];
  discoveryCategories: string[];
  aiHistory: AIHistoryLog[];
  status: 'active' | 'processing' | 'rejected';
  visibility: 'public' | 'hidden';
  dateTaken: string;
  cameraBrand: string;
  cameraModel: string;
  lens: string;
  iso: number;
  aperture: string;
  shutterSpeed: string;
  focalLength: string;
  country: string;
  city: string;
  location: string;
  copyrightHolder: string;
  copyrightYear: number;
  assetHash: string;
  verificationStatus: 'pending' | 'verified' | 'unverified';
}

export interface Photographer {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  followers: number;
  following: number;
  views: number;
  downloads: number;
  revenue: number;
  verified: boolean;
  rating: number;
}

export const MOCK_PHOTOGRAPHERS: Photographer[] = [
  {
    id: "p1",
    name: "Sophia Vanhoutte",
    username: "sophia_van",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    bio: "Branding and fine-art travel photographer based in Paris. Capturing quiet moments and architectural geometry around the globe.",
    followers: 12400,
    following: 348,
    views: 450000,
    downloads: 32000,
    revenue: 15400,
    verified: true,
    rating: 4.9
  },
  {
    id: "p2",
    name: "Marcus Sterling",
    username: "m_sterling",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    bio: "Urban architecture and dynamic cityscape photographer. Capturing the geometrical lines of modern megacities.",
    followers: 8900,
    following: 190,
    views: 290000,
    downloads: 18500,
    revenue: 9200,
    verified: true,
    rating: 4.8
  },
  {
    id: "p3",
    name: "Aria Takahashi",
    username: "aria_t",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    coverUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&auto=format&fit=crop&q=80",
    bio: "Minimal nature and macro photography. Exploring the microscopic patterns of flora, fauna, and water droplets.",
    followers: 15600,
    following: 420,
    views: 680000,
    downloads: 51200,
    revenue: 28600,
    verified: true,
    rating: 5.0
  }
];

export const MOCK_ASSETS: MediaAsset[] = [
  {
    id: "a1",
    type: "image",
    title: "Silent Horizon of Iceland",
    description: "A minimalist capture of a black sand beach meeting the Atlantic under heavy, moody clouds in southern Iceland.",
    url: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=500&auto=format&fit=crop&q=80",
    category: "Nature",
    tags: ["Iceland", "minimal", "moody", "ocean", "horizon", "black sand", "clouds"],
    colors: ["#1F2937", "#6B7280", "#9CA3AF"],
    photographerId: "p3",
    uploadDate: "2026-07-20",
    views: 12500,
    downloads: 840,
    likes: 320,
    featured: true,
    exif: {
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 24-70mm f/2.8 GM II",
      aperture: "f/8.0",
      shutterSpeed: "1/160s",
      iso: 100,
      resolution: "9504 x 6336"
    },
    prices: {
      personal: 29,
      commercial: 149,
      extended: 399,
      exclusive: 1200
    },
    versions: [
      { id: "a1_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-20" }
    ],
    discoveryCategories: ["Nature", "Minimal"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-15",
    cameraBrand: "Sony",
    cameraModel: "Alpha 7R V",
    lens: "Sony FE 24-70mm f/2.8 GM II",
    iso: 100,
    aperture: "f/8.0",
    shutterSpeed: "1/160s",
    focalLength: "35mm",
    country: "Iceland",
    city: "Vik",
    location: "Black Sand Beach",
    copyrightHolder: "Aria Takahashi",
    copyrightYear: 2026,
    assetHash: "8f59ac2b3f12d2d9ec9ef4a899dd5a4f7831d1ef726a9cc245b0a393c83ef2cd",
    verificationStatus: "verified"
  },
  {
    id: "a2",
    type: "image",
    title: "Cyberpunk Tokyo Rain",
    description: "Vibrant neon lights reflecting on wet streets during a heavy midnight downpour in Shinjuku, Tokyo.",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80",
    category: "Urban",
    tags: ["Tokyo", "Japan", "neon", "rain", "cyberpunk", "reflection", "night", "cityscape"],
    colors: ["#050515", "#E11D48", "#06B6D4"],
    photographerId: "p2",
    uploadDate: "2026-07-22",
    views: 28400,
    downloads: 2450,
    likes: 1140,
    featured: true,
    exif: {
      camera: "Canon EOS R5",
      lens: "Canon RF 50mm f/1.2L USM",
      aperture: "f/1.2",
      shutterSpeed: "1/80s",
      iso: 800,
      resolution: "8192 x 5464"
    },
    prices: {
      personal: 49,
      commercial: 199,
      extended: 499,
      exclusive: 1800
    },
    versions: [
      { id: "a2_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-22" }
    ],
    discoveryCategories: ["Trending", "Minimal"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-18",
    cameraBrand: "Canon",
    cameraModel: "EOS R5",
    lens: "Canon RF 50mm f/1.2L USM",
    iso: 800,
    aperture: "f/1.2",
    shutterSpeed: "1/80s",
    focalLength: "50mm",
    country: "Japan",
    city: "Tokyo",
    location: "Shinjuku",
    copyrightHolder: "Marcus Sterling",
    copyrightYear: 2026,
    assetHash: "46fef95b3ac26c6d2c88f28564f5ee35dcfec718e26a2dd245a0b383c83ef112",
    verificationStatus: "verified"
  },
  {
    id: "a3",
    type: "image",
    title: "Ascending Curves",
    description: "Abstract architectural curves of a spiral staircase inside a modern cultural center in Helsinki, showcasing clean minimalist geometry.",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80",
    category: "Architecture",
    tags: ["architecture", "spiral", "minimalism", "geometry", "white", "interior", "stairs"],
    colors: ["#F9FAFB", "#E5E7EB", "#9CA3AF"],
    photographerId: "p1",
    uploadDate: "2026-07-23",
    views: 9400,
    downloads: 620,
    likes: 410,
    featured: true,
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 32-64mm f/4 R LM WR",
      aperture: "f/5.6",
      shutterSpeed: "1/125s",
      iso: 200,
      resolution: "11648 x 8736"
    },
    prices: {
      personal: 39,
      commercial: 179,
      extended: 449,
      exclusive: 1500
    },
    versions: [
      { id: "a3_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-23" }
    ],
    discoveryCategories: ["Architecture", "Minimal", "Branding"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-20",
    cameraBrand: "Fujifilm",
    cameraModel: "GFX 100S",
    lens: "GF 32-64mm f/4 R LM WR",
    iso: 200,
    aperture: "f/5.6",
    shutterSpeed: "1/125s",
    focalLength: "32mm",
    country: "Finland",
    city: "Helsinki",
    location: "Cultural Center",
    copyrightHolder: "Sophia Vanhoutte",
    copyrightYear: 2026,
    assetHash: "bfb93fc2e1d6d2a8ec9ec4a99dd5d4f7861d1ef726a9cc245b0a393c83ef55a",
    verificationStatus: "verified"
  },
  {
    id: "a4",
    type: "image",
    title: "Golden Hour Dunes",
    description: "Stunning ripples of sand dunes in the Sahara Desert, illuminated by the low golden sunlight creating dramatic long shadows.",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format&fit=crop&q=80",
    category: "Nature",
    tags: ["desert", "sand", "dunes", "golden hour", "warm", "shadows", "minimalist"],
    colors: ["#D97706", "#F59E0B", "#172554"],
    photographerId: "p3",
    uploadDate: "2026-07-18",
    views: 18200,
    downloads: 1450,
    likes: 620,
    featured: false,
    exif: {
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 70-200mm f/2.8 GM OSS II",
      aperture: "f/6.3",
      shutterSpeed: "1/200s",
      iso: 100,
      resolution: "9504 x 6336"
    },
    prices: {
      personal: 29,
      commercial: 149,
      extended: 399,
      exclusive: 1200
    },
    versions: [
      { id: "a4_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-18" }
    ],
    discoveryCategories: ["Nature", "Travel", "Lifestyle"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-10",
    cameraBrand: "Sony",
    cameraModel: "Alpha 7R V",
    lens: "Sony FE 70-200mm f/2.8 GM OSS II",
    iso: 100,
    aperture: "f/6.3",
    shutterSpeed: "1/200s",
    focalLength: "105mm",
    country: "Morocco",
    city: "Sahara",
    location: "Merzouga Dunes",
    copyrightHolder: "Aria Takahashi",
    copyrightYear: 2026,
    assetHash: "7b59ac2b3f12d2d9ec9ef4a899dd5a4f7831d1ef726a9cc245b0a393c83ef2cc",
    verificationStatus: "verified"
  },
  {
    id: "a5",
    type: "image",
    title: "Futuristic Bridge Architecture",
    description: "Symmetrical perspective shot of a steel suspension bridge in Shanghai, glowing with modern neon lights at dusk.",
    url: "https://images.unsplash.com/photo-1493397862567-47fee858683f?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1493397862567-47fee858683f?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1493397862567-47fee858683f?w=500&auto=format&fit=crop&q=80",
    category: "Architecture",
    tags: ["bridge", "steel", "symmetry", "dusk", "future", "Shanghai", "lights"],
    colors: ["#111827", "#1E40AF", "#3B82F6"],
    photographerId: "p2",
    uploadDate: "2026-07-15",
    views: 15100,
    downloads: 980,
    likes: 540,
    featured: false,
    exif: {
      camera: "Canon EOS R5",
      lens: "Canon RF 15-35mm f/2.8L IS USM",
      aperture: "f/8.0",
      shutterSpeed: "2s",
      iso: 100,
      resolution: "8192 x 5464"
    },
    prices: {
      personal: 39,
      commercial: 179,
      extended: 449,
      exclusive: 1400
    },
    versions: [
      { id: "a5_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1493397862567-47fee858683f?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-15" }
    ],
    discoveryCategories: ["Architecture", "Technology", "Luxury"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-12",
    cameraBrand: "Canon",
    cameraModel: "EOS R5",
    lens: "Canon RF 15-35mm f/2.8L IS USM",
    iso: 100,
    aperture: "f/8.0",
    shutterSpeed: "2s",
    focalLength: "15mm",
    country: "China",
    city: "Shanghai",
    location: "Lujiazui Bridge",
    copyrightHolder: "Marcus Sterling",
    copyrightYear: 2026,
    assetHash: "26fef95b3ac26c6d2c88f28564f5ee35dcfec718e26a2dd245a0b383c83ef223",
    verificationStatus: "verified"
  },
  {
    id: "a6",
    type: "image",
    title: "Elegance in the Wild",
    description: "A close-up portrait of a majestic stag in the foggy woods of Richmond Park, London, surrounded by soft morning light.",
    url: "https://images.unsplash.com/photo-1507666405895-422edf31d40f?w=1000&auto=format&fit=crop&q=80",
    originalUrl: "https://images.unsplash.com/photo-1507666405895-422edf31d40f?w=2000&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1507666405895-422edf31d40f?w=500&auto=format&fit=crop&q=80",
    category: "Nature",
    tags: ["deer", "wildlife", "fog", "forest", "stag", "moody", "morning", "animal"],
    colors: ["#1F2937", "#4B5563", "#064E3B"],
    photographerId: "p1",
    uploadDate: "2026-07-10",
    views: 22000,
    downloads: 1800,
    likes: 980,
    featured: false,
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 100-200mm f/5.6 R LM OIS WR",
      aperture: "f/5.6",
      shutterSpeed: "1/250s",
      iso: 400,
      resolution: "11648 x 8736"
    },
    prices: {
      personal: 49,
      commercial: 199,
      extended: 499,
      exclusive: 1600
    },
    versions: [
      { id: "a6_v_orig", name: "Original", url: "https://images.unsplash.com/photo-1507666405895-422edf31d40f?w=1000&auto=format&fit=crop&q=80", isPrimary: true, createdDate: "2026-07-10" }
    ],
    discoveryCategories: ["Nature", "Wildlife", "Minimal"],
    aiHistory: [],
    status: "active",
    visibility: "public",
    dateTaken: "2026-07-05",
    cameraBrand: "Fujifilm",
    cameraModel: "GFX 100S",
    lens: "GF 100-200mm f/5.6 R LM OIS WR",
    iso: 400,
    aperture: "f/5.6",
    shutterSpeed: "1/250s",
    focalLength: "150mm",
    country: "UK",
    city: "London",
    location: "Richmond Park",
    copyrightHolder: "Sophia Vanhoutte",
    copyrightYear: 2026,
    assetHash: "efb93fc2e1d6d2a8ec9ec4a99dd5d4f7861d1ef726a9cc245b0a393c83ef99c",
    verificationStatus: "verified"
  }
];

export const MOCK_COLLECTIONS = [
  {
    id: "c1",
    title: "Nordic Silence",
    desc: "A hand-curated selection of Scandinavian landscapes, misty seascapes, and silent white winters.",
    coverUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=600&auto=format&fit=crop&q=80",
    assetCount: 18,
    isPublic: true
  },
  {
    id: "c2",
    title: "Cyberpunk Geometry",
    desc: "Vibrant high-contrast cityscapes, neon reflections, and symmetrical concrete shapes of Asian megacities.",
    coverUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
    assetCount: 12,
    isPublic: true
  },
  {
    id: "c3",
    title: "Organic Textures",
    desc: "Close-up macro shots, fine art leaves, biological structures, and patterns of the microscopic world.",
    coverUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    assetCount: 8,
    isPublic: true
  }
];

export interface InspirationItem {
  id: string;
  title: string;
  desc: string;
  coverUrl: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  category: string;
}

export const MOCK_INSPIRATION: InspirationItem[] = [
  { id: "i1", title: "Creative Branding Mockups", desc: "A series of elegant packaging mockups featuring clean neutral gradients and organic shadow overlays.", coverUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80", author: "Sophia Vanhoutte", date: "2026-07-20", views: 4200, likes: 320, category: "Branding" },
  { id: "i2", title: "Minimalist Poster Ideas", desc: "Graphic design posters capturing quiet Swiss typography and simple geometric visual structures.", coverUrl: "https://images.unsplash.com/photo-1507666405895-422edf31d40f?w=500&auto=format&fit=crop&q=80", author: "Marcus Sterling", date: "2026-07-18", views: 2800, likes: 210, category: "Poster" },
  { id: "i3", title: "Web Design Grids", desc: "Cinematic website landing page wireframes utilizing modern Bento Grids and smooth dark borders.", coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80", author: "Sophia Vanhoutte", date: "2026-07-15", views: 6100, likes: 450, category: "Website" },
  { id: "i4", title: "Social Media Aesthetics", desc: "Instagram feed templates combining organic travel captures and muted editorial tones.", coverUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80", author: "Aria Takahashi", date: "2026-07-14", views: 3200, likes: 190, category: "Social Media" },
  { id: "i5", title: "Modernist Architecture Lines", desc: "Architectural detail inspirations highlighting sharp raw concrete angles and steel geometry in Berlin.", coverUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80", author: "Marcus Sterling", date: "2026-07-10", views: 5100, likes: 390, category: "Architecture" },
  { id: "i6", title: "Seasonal Autumnal Tones", desc: "A sensory lookbook mapping warm amber foliage, foggy lake reflections, and dark wool textures.", coverUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=500&auto=format&fit=crop&q=80", author: "Aria Takahashi", date: "2026-07-08", views: 2400, likes: 140, category: "Seasonal" }
];

export interface Quest {
  id: string;
  title: string;
  desc: string;
  prize: string;
  deadline: string;
  active: boolean;
}

export const MOCK_CHALLENGES: Quest[] = [
  { id: "q1", title: "Weekly Challenge: Rainy Neon", desc: "Capture reflections of glowing neon lights in wet night streets.", prize: "$500 & 'Neon Master' Badge", deadline: "5 days left", active: true },
  { id: "q2", title: "Monthly Contest: Pure Geometry", desc: "Fine-art architectural shapes showcasing clean lines and sharp symmetry.", prize: "$2,000 & 'Structural Elite' Badge", deadline: "22 days left", active: true }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "Aria Takahashi", downloads: 5120, rating: 5.0, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80" },
  { rank: 2, name: "Sophia Vanhoutte", downloads: 3200, rating: 4.9, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
  { rank: 3, name: "Marcus Sterling", downloads: 1850, rating: 4.8, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" }
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverUrl: string;
}

export const MOCK_BLOGS: BlogPost[] = [
  { id: "b1", title: "The Rise of AI Semantic Search in Licensing", excerpt: "How natural language queries are replacing traditional keyword tags to help creators find the perfect asset instantly.", category: "AI", date: "July 24, 2026", readTime: "5 min read", coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" },
  { id: "b2", title: "Protecting Digital Assets with Signed Cryptography", excerpt: "An in-depth guide on how blockchain hashes and temporary signed URLs prevent unauthorized downloading and hotlinking.", category: "Copyright", date: "July 20, 2026", readTime: "8 min read", coverUrl: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?w=600&auto=format&fit=crop&q=80" },
  { id: "b3", title: "Mastering Minimalist Architectural Photography", excerpt: "How to use long exposures, structural symmetry, and raw highlights to capture premium visual layouts.", category: "Photography", date: "July 15, 2026", readTime: "6 min read", coverUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80" }
];

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

export const MOCK_JOBS: JobOpening[] = [
  { id: "j1", title: "Senior AI Full Stack Engineer", department: "Engineering", location: "Paris, France / Remote", type: "Full-Time" },
  { id: "j2", title: "UI/UX & Interactive Animator", department: "Design", location: "Helsinki, Finland / Hybrid", type: "Full-Time" },
  { id: "j3", title: "DMCA & Licensing Legal Counsel", department: "Legal", location: "New York, USA", type: "Part-Time" }
];

