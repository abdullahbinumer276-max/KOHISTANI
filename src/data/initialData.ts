import { SiteDatabase } from '../types';

export const initialDatabase: SiteDatabase = {
  branding: {
    channelName: 'The Kohistani',
    handle: '@thekohistani',
    tagline: 'Unveiling the Timeless Epic of Islamic Civilization & Untold History',
    brandDescription: 'A premium documentary platform dedicated to illuminating Islamic history, great empires, caliphates, decisive battles, visionary scholars, and lost chapters of human civilization.',
    mainLogo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80',
    mobileLogo: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&auto=format&fit=crop&q=80',
    favicon: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=64&auto=format&fit=crop&q=80',
    brandAccentColor: '#d4af37',
    brandBgDepth: '#070709',
    heroHeading: 'Discover the Untold Stories of Islamic History',
    heroSubheading: 'Step into the epic saga of empires, great caliphates, decisive battles, and the golden age of scientific and cultural triumphs that reshaped the world.',
    heroVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    heroBackground: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=1920&auto=format&fit=crop&q=85',
    heroPrimaryBtnText: 'Watch Featured Video',
    heroPrimaryBtnLink: '/videos',
    heroSecondaryBtnText: 'Explore Interactive Timeline',
    heroSecondaryBtnLink: '/timeline',
    youtubeUrl: 'https://youtube.com/@thekohistani',
    twitterUrl: 'https://x.com/thekohistani',
    instagramUrl: 'https://instagram.com/thekohistani',
    facebookUrl: 'https://facebook.com/thekohistani',
    tiktokUrl: 'https://tiktok.com/@thekohistani',
    spotifyUrl: 'https://open.spotify.com/show/thekohistani',
    email: 'contact@thekohistani.com',
    aboutStory: 'Founded with a profound reverence for accurate historical scholarship and cinematic documentary visual arts, The Kohistani began as a digital chronicle of Islamic civilization. We bridge classical historiographical manuscripts with modern cinematic storytelling.',
    aboutMission: 'To revive historical consciousness by presenting the rich, nuanced, and glorious heritage of Islamic civilization with rigorous authenticity, gripping narration, and cinematic visual craftsmanship.',
    aboutVision: 'To become the world’s foremost visual archive and documentary destination for Islamic history and civilization.',
    aboutProductionEthos: 'Every documentary is backed by classical primary sources (Ibn Kathir, Al-Tabari, Al-Dhahabi) cross-referenced with modern peer-reviewed scholarship, accompanied by bespoke historical cartography, original soundtracks, and high-fidelity visual recreations.'
  },
  seo: {
    metaTitle: 'The Kohistani – Islamic History & Civilizations Documentary Platform',
    metaDescription: 'Explore the untold stories, great empires, caliphates, decisive battles, and visionary scholars of Islamic history in cinematic documentaries and scholarly articles.',
    keywords: 'Islamic History, The Kohistani, Ottoman Empire, Mughal Empire, Rashidun Caliphate, Abbasid Golden Age, Khalid ibn al-Walid, Salahuddin Ayyubi, Muslim Scientists, Islamic Battles',
    ogImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=1200&auto=format&fit=crop&q=80',
    twitterCard: 'summary_large_image',
    canonicalUrl: 'https://thekohistani.com'
  },
  homepageSections: [
    { id: 'sec-hero', name: 'Cinematic Hero Banner', enabled: true, order: 1, title: 'Hero Section' },
    { id: 'sec-featured', name: 'Featured Documentary Spotlight', enabled: true, order: 2, title: 'Featured Documentary' },
    { id: 'sec-categories', name: 'Historical Eras & Categories', enabled: true, order: 3, title: 'Explore by Eras & Civilizations' },
    { id: 'sec-latest-videos', name: 'Latest & Trending Documentaries', enabled: true, order: 4, title: 'New Documentaries', subtitle: 'Freshly released historical investigations and cinematic episodes.' },
    { id: 'sec-timeline-teaser', name: 'Interactive Timeline Journey', enabled: true, order: 5, title: 'Chronicles of Time', subtitle: '1,400+ years of turning points across the Islamic world.' },
    { id: 'sec-personalities', name: 'Iconic Historical Figures', enabled: true, order: 6, title: 'Legends of the Islamic World', subtitle: 'Rulers, military commanders, philosophers, and pioneers who shaped human destiny.' },
    { id: 'sec-articles', name: 'Scholarly Articles & Longform Reads', enabled: true, order: 7, title: 'Historical Chronicles & Articles', subtitle: 'Deep dives and academic explorations into manuscript archives.' },
    { id: 'sec-subscribe', name: 'YouTube Channel & Community Callout', enabled: true, order: 8, title: 'Join The Kohistani Brotherhood' }
  ],
  categories: [
    {
      id: 'cat-rashidun',
      slug: 'rashidun-caliphate',
      name: 'Rashidun Caliphate',
      arabicTitle: 'الخلافة الراشدة',
      description: 'The Rightly Guided Caliphs: Abu Bakr, Umar, Uthman, and Ali (RA). An era of unprecedented justice, rapid expansion, and moral fortitude.',
      coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      iconName: 'Shield',
      colorAccent: '#10b981',
      displayOrder: 1,
      isFeatured: true
    },
    {
      id: 'cat-umayyad',
      slug: 'umayyad-caliphate',
      name: 'Umayyad Caliphate',
      arabicTitle: 'الدولة الأموية',
      description: 'From Damascus to Cordoba: The forging of the largest contiguous empire of its time, pioneering monumental Islamic architecture like the Dome of the Rock.',
      coverImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80',
      iconName: 'Landmark',
      colorAccent: '#3b82f6',
      displayOrder: 2,
      isFeatured: true
    },
    {
      id: 'cat-abbasid',
      slug: 'abbasid-golden-age',
      name: 'Abbasid Golden Age',
      arabicTitle: 'العصر العباسي الذهبي',
      description: 'Baghdad’s House of Wisdom, flowering of mathematics, optics, philosophy, astronomy, and global trade synthesis.',
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
      iconName: 'Sparkles',
      colorAccent: '#f59e0b',
      displayOrder: 3,
      isFeatured: true
    },
    {
      id: 'cat-andalus',
      slug: 'al-andalus',
      name: 'Al-Andalus & Moorish Spain',
      arabicTitle: 'الأندلس',
      description: 'Eight centuries of dazzling European Islamic civilization, the Great Mosque of Cordoba, the Alhambra, and illuminated libraries.',
      coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
      iconName: 'Castle',
      colorAccent: '#ec4899',
      displayOrder: 4,
      isFeatured: true
    },
    {
      id: 'cat-ottoman',
      slug: 'ottoman-empire',
      name: 'Ottoman Empire',
      arabicTitle: 'الدولة العثمانية',
      description: 'From Ertuğrul and Osman I to Mehmed the Conqueror and Suleiman the Magnificent: Six centuries of geopolitical mastery across three continents.',
      coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80',
      iconName: 'Crown',
      colorAccent: '#ef4444',
      displayOrder: 5,
      isFeatured: true
    },
    {
      id: 'cat-mughal',
      slug: 'mughal-empire',
      name: 'Mughal Empire',
      arabicTitle: 'سلطنة المغول',
      description: 'Babur, Akbar, and Shah Jahan: Masters of grand architecture, intricate miniature art, massive gunpowder armies, and economic dominance in the Indian subcontinent.',
      coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
      iconName: 'Gem',
      colorAccent: '#8b5cf6',
      displayOrder: 6,
      isFeatured: true
    },
    {
      id: 'cat-battles',
      slug: 'islamic-battles',
      name: 'Great Battles & Strategies',
      arabicTitle: 'المعارك الفاصلة',
      description: 'Badr, Yarmouk, al-Qadisiyyah, Hattin, Ain Jalut, and Constantinople: Tactical masterclasses that altered world history.',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      iconName: 'Swords',
      colorAccent: '#d4af37',
      displayOrder: 7,
      isFeatured: true
    },
    {
      id: 'cat-scientists',
      slug: 'muslim-scientists',
      name: 'Muslim Scientists & Scholars',
      arabicTitle: 'علماء المسلمين',
      description: 'Al-Khwarizmi, Ibn al-Haytham, Ibn Sina, Al-Biruni, and Jabir ibn Hayyan: The intellectual pioneers of modern science.',
      coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      iconName: 'Atom',
      colorAccent: '#06b6d4',
      displayOrder: 8,
      isFeatured: true
    },
    {
      id: 'cat-sahaba',
      slug: 'sahaba-personalities',
      name: 'Sahaba & Great Leaders',
      arabicTitle: 'الصحابة والقادة',
      description: 'The noble companions of Prophet Muhammad ﷺ and illustrious military titans whose conviction shaped the early Islamic state.',
      coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      iconName: 'Users',
      colorAccent: '#14b8a6',
      displayOrder: 9,
      isFeatured: true
    },
    {
      id: 'cat-untold',
      slug: 'untold-stories',
      name: 'Untold Stories & Mysteries',
      arabicTitle: 'قصص وحقائق مجهولة',
      description: 'Forgotten kingdoms, lost manuscripts, naval expeditions, and little-known heroes of Islamic civilizations.',
      coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
      iconName: 'ScrollText',
      colorAccent: '#eab308',
      displayOrder: 10,
      isFeatured: true
    }
  ],
  videos: [
    {
      id: 'vid-1453',
      youtubeId: 'q5K4iO0iVqM',
      youtubeUrl: 'https://www.youtube.com/watch?v=q5K4iO0iVqM',
      title: 'The Siege of Constantinople 1453: How Sultan Mehmed II Changed World History',
      slug: 'siege-of-constantinople-1453',
      description: 'A comprehensive cinematic documentary exploring the 53-day siege of the impregnable Byzantine capital, the legendary super-cannons of Urban, the overland transport of Ottoman galleys, and the dawn of a new global empire.',
      category: 'Ottoman Empire',
      tags: ['Constantinople', 'Mehmed II', 'Ottoman Empire', 'Byzantine', 'Siege Warfare', 'Islamic History'],
      duration: '42:18',
      views: '1.4M',
      publishDate: '2026-06-12',
      isFeatured: true,
      isTrending: true,
      thumbnail: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'The Prophecy & The City' },
        { time: '07:30', seconds: 450, title: 'The Young Sultan Mehmed II' },
        { time: '16:15', seconds: 975, title: 'The Basilisk Super-Cannon' },
        { time: '25:40', seconds: 1540, title: 'The Fleet That Walked on Land' },
        { time: '34:50', seconds: 2090, title: 'The Final Assault on the Golden Gate' },
        { time: '40:10', seconds: 2410, title: 'Epilogue & World Repercussions' }
      ],
      keyTakeaways: [
        'Urban’s Hungarian super-cannon shattered medieval fortress physics forever.',
        'Overland transport of 70 ships via greased logs into the Golden Horn bypassed the sea boom chain.',
        'The conquest marked the end of the Middle Ages and catalyzed the European Renaissance.'
      ],
      relatedArticleIds: ['art-constantinople-cannons'],
      relatedPersonalityIds: ['pers-mehmed-ii']
    },
    {
      id: 'vid-yarmouk',
      youtubeId: 'W1YmH3sC9kU',
      youtubeUrl: 'https://www.youtube.com/watch?v=W1YmH3sC9kU',
      title: 'Battle of Yarmouk 636 CE: Khalid ibn al-Walid’s Tactical Masterpiece',
      slug: 'battle-of-yarmouk-khalid-ibn-walid',
      description: 'How a 25,000-strong Muslim army outmaneuvered and shattered an 80,000-strong Byzantine imperial host along the rugged ravines of the Yarmouk River, opening the Levant.',
      category: 'Great Battles & Strategies',
      tags: ['Khalid ibn al-Walid', 'Yarmouk', 'Rashidun', 'Byzantine', 'Military Tactics'],
      duration: '38:45',
      views: '2.1M',
      publishDate: '2026-05-18',
      isFeatured: false,
      isTrending: true,
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Strategic Stalemate in Syria' },
        { time: '08:20', seconds: 500, title: 'Khalid’s Mobile Guard Cavalry' },
        { time: '19:40', seconds: 1180, title: 'The Feigned Retreat & Dust Storm' },
        { time: '31:10', seconds: 1870, title: 'The Ravine Trap at Wadi al-Raqqad' }
      ],
      keyTakeaways: [
        'Khalid utilized the desert wind and dust storms to obscure elite cavalry maneuvers.',
        'The mobile reserve doctrine pioneered by Khalid remains studied in modern military academies.'
      ],
      relatedArticleIds: ['art-khalid-tactics'],
      relatedPersonalityIds: ['pers-khalid']
    },
    {
      id: 'vid-baghdad-wisdom',
      youtubeId: 'L_LUpnggUz4',
      youtubeUrl: 'https://www.youtube.com/watch?v=L_LUpnggUz4',
      title: 'The House of Wisdom: The Islamic Golden Age that Saved World Science',
      slug: 'house-of-wisdom-baghdad-golden-age',
      description: 'Journey into 9th-century Baghdad under Caliphs Harun al-Rashid and Al-Ma’mun. Discover how Bayt al-Hikmah catalyzed algebra, celestial cartography, medicine, and optics.',
      category: 'Abbasid Golden Age',
      tags: ['House of Wisdom', 'Baghdad', 'Abbasid', 'Al-Khwarizmi', 'Science', 'Golden Age'],
      duration: '45:10',
      views: '980K',
      publishDate: '2026-04-29',
      isFeatured: false,
      isTrending: false,
      thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'The Round City of Baghdad' },
        { time: '11:00', seconds: 660, title: 'The Translation Movement' },
        { time: '22:30', seconds: 1350, title: 'Al-Khwarizmi and the Birth of Algebra' },
        { time: '36:00', seconds: 2160, title: 'Hospitals and Free Healthcare Innovations' }
      ],
      keyTakeaways: [
        'Scholars were paid in the gold equivalent weight of translated manuscripts.',
        'The scientific method of rigorous empirical testing was formalized by Ibn al-Haytham.'
      ],
      relatedArticleIds: ['art-house-of-wisdom'],
      relatedPersonalityIds: ['pers-khwarizmi']
    },
    {
      id: 'vid-salahuddin-hattin',
      youtubeId: '3u2fP_mC_l0',
      youtubeUrl: 'https://www.youtube.com/watch?v=3u2fP_mC_l0',
      title: 'Salahuddin Ayyubi & The Horns of Hattin 1187: The Liberation of Jerusalem',
      slug: 'salahuddin-horns-of-hattin-1187',
      description: 'The definitive documentary on the genius of Salahuddin (Saladin), his unyielding chivalry, the scorched-earth encirclement at the Horns of Hattin, and the bloodless re-entry into Jerusalem.',
      category: 'Great Battles & Strategies',
      tags: ['Salahuddin', 'Hattin', 'Jerusalem', 'Crusades', 'Ayyubid'],
      duration: '50:30',
      views: '3.2M',
      publishDate: '2026-03-15',
      isFeatured: false,
      isTrending: true,
      thumbnail: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'The State of Outremer' },
        { time: '14:20', seconds: 860, title: 'Raynald of Châtillon’s Treachery' },
        { time: '26:45', seconds: 1605, title: 'Thirst and Fire at Lake Tiberias' },
        { time: '41:10', seconds: 2470, title: 'Entering Jerusalem with Mercy' }
      ],
      keyTakeaways: [
        'Salahuddin denied water access to the Crusaders by occupying Tiberias springs.',
        'Unlike the 1099 massacre, Salahuddin spared Christians and guaranteed safe passage.'
      ],
      relatedArticleIds: ['art-salahuddin-chivalry'],
      relatedPersonalityIds: ['pers-salahuddin']
    },
    {
      id: 'vid-andalus-cordoba',
      youtubeId: 'k1p4K6j2F8Y',
      youtubeUrl: 'https://www.youtube.com/watch?v=k1p4K6j2F8Y',
      title: 'Al-Andalus: When Islamic Spain Illuminated Dark Age Europe',
      slug: 'al-andalus-cordoba-golden-era',
      description: 'Paved streets lit with oil lanterns, 70 public libraries in Cordoba, interfaith convivencia, and the architectural marvel of Madinat al-Zahra and the Alhambra of Granada.',
      category: 'Al-Andalus & Moorish Spain',
      tags: ['Al-Andalus', 'Cordoba', 'Granada', 'Alhambra', 'Islamic Spain'],
      duration: '48:15',
      views: '1.1M',
      publishDate: '2026-02-10',
      isFeatured: false,
      isTrending: false,
      thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Tariq ibn Ziyad and the Rock' },
        { time: '12:00', seconds: 720, title: 'Abd al-Rahman I: The Falcon of Quraysh' },
        { time: '28:15', seconds: 1695, title: 'Cordoba: The Jewel of the World' },
        { time: '40:00', seconds: 2400, title: 'The Tears of Boabdil in 1492' }
      ]
    },
    {
      id: 'vid-mughal-babur',
      youtubeId: '8zU9w1V6aX4',
      youtubeUrl: 'https://www.youtube.com/watch?v=8zU9w1V6aX4',
      title: 'First Battle of Panipat 1526: How Babur Built the Mughal Empire with Gunpowder',
      slug: 'babur-first-battle-of-panipat-1526',
      description: 'With only 12,000 soldiers against Ibrahim Lodi’s 100,000 troops and 1,000 war elephants, Babur deployed Ottoman cart-barricades (Araba) and matchlocks to establish the Mughal dynasty.',
      category: 'Mughal Empire',
      tags: ['Mughal', 'Babur', 'Panipat', 'Gunpowder Empires', 'India'],
      duration: '36:40',
      views: '840K',
      publishDate: '2026-01-20',
      isFeatured: false,
      isTrending: false,
      thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1280&auto=format&fit=crop&q=85',
      chapters: [
        { time: '00:00', seconds: 0, title: 'From Fergana to Kabul' },
        { time: '10:15', seconds: 615, title: 'The Tulughma Flanking Maneuver' },
        { time: '22:00', seconds: 1320, title: 'The Elephant Stampede' },
        { time: '31:40', seconds: 1900, title: 'The Coronation in Delhi' }
      ]
    },
    {
      id: 'vid-fatima-fihri',
      youtubeId: 'P0o9i8u7y6T',
      youtubeUrl: 'https://www.youtube.com/watch?v=P0o9i8u7y6T',
      title: 'Fatima al-Fihri: The Muslim Woman Who Built the World’s First University in 859 CE',
      slug: 'fatima-al-fihri-first-university-al-qarawiyyin',
      description: 'The inspiring untold story of Fatima al-Fihri, who inherited a vast fortune in Fez, Morocco, and dedicated every penny while fasting daily during construction to create the University of al-Qarawiyyin.',
      category: 'Untold Stories & Mysteries',
      tags: ['Fatima al-Fihri', 'Al-Qarawiyyin', 'Morocco', 'Education', 'Untold Stories'],
      duration: '29:50',
      views: '760K',
      publishDate: '2025-12-05',
      isFeatured: false,
      isTrending: false,
      thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1280&auto=format&fit=crop&q=85'
    },
    {
      id: 'vid-ain-jalut',
      youtubeId: 'q8M7z1Y9k6T',
      youtubeUrl: 'https://www.youtube.com/watch?v=q8M7z1Y9k6T',
      title: 'Battle of Ain Jalut 1260: The Mamluks Who Stopped the Unstoppable Mongol Horde',
      slug: 'battle-of-ain-jalut-mamluks-mongols-1260',
      description: 'After the cataclysmic sack of Baghdad in 1258, Hulagu Khan’s Mongols appeared invincible. In the valley of Ain Jalut, Sultan Qutuz and Baybars dealt the Mongols their first permanent defeat in history.',
      category: 'Great Battles & Strategies',
      tags: ['Ain Jalut', 'Mamluks', 'Mongols', 'Qutuz', 'Baybars', 'Battles'],
      duration: '44:20',
      views: '1.9M',
      publishDate: '2025-11-14',
      isFeatured: false,
      isTrending: true,
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=85'
    }
  ],
  timeline: [
    {
      id: 'tl-prophet-birth',
      title: 'Birth of Prophet Muhammad ﷺ in Makkah',
      arabicTitle: 'مولد النبي محمد صلى الله عليه وسلم',
      year: '570 CE',
      gregorianYear: 570,
      hijriYear: '53 BH',
      era: 'Prophetic Era',
      category: 'Prophetic Era',
      summary: 'The Year of the Elephant (Am al-Fil): The birth of the Final Messenger of God in Makkah, orphan of the Banu Hashim clan.',
      fullDescription: 'Born in Makkah in the Year of the Elephant, Muhammad ibn Abdullah ﷺ grew up known across Arabia as Al-Amin (The Trustworthy) and As-Sadiq (The Truthful). His birth heralded the dawn of an era that would transform world history morally, politically, and spiritually.',
      image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      location: 'Makkah, Arabian Peninsula',
      importanceLevel: 'Major Milestone'
    },
    {
      id: 'tl-revelation',
      title: 'First Revelation at Cave Hira',
      arabicTitle: 'نزول الوحي في غار حراء',
      year: '610 CE',
      gregorianYear: 610,
      hijriYear: '13 BH',
      era: 'Prophetic Era',
      category: 'Prophetic Era',
      summary: 'Archangel Jibreel (Gabriel) descends with the first words of the Quran: "Iqra" (Read) upon Mount Nur.',
      fullDescription: 'At the age of forty, during his meditative retreat in the mountain cave of Hira overlooking Makkah, Prophet Muhammad ﷺ received the first divine revelation from Angel Jibreel: "Read in the name of your Lord who created..." This marked the commencement of his prophetic mission.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      location: 'Mount Nur, Cave Hira, Makkah',
      importanceLevel: 'Major Milestone'
    },
    {
      id: 'tl-hijrah',
      title: 'The Hijrah (Migration to Madinah)',
      arabicTitle: 'الهجرة النبوية المباركة',
      year: '622 CE',
      gregorianYear: 622,
      hijriYear: '1 AH',
      era: 'Prophetic Era',
      category: 'Prophetic Era',
      summary: 'Migration of the early Muslims to Yathrib (Madinah), establishing the first Islamic state and founding the Islamic Calendar.',
      fullDescription: 'To escape severe persecution, the Prophet ﷺ and his faithful companion Abu Bakr (RA) made the dangerous migration to Madinah. There, the Constitution of Madinah was ratified, uniting diverse tribes and faith communities into a cohesive societal covenant.',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80',
      location: 'Madinah al-Munawwarah',
      importanceLevel: 'Major Milestone'
    },
    {
      id: 'tl-badr',
      title: 'Battle of Badr: The Day of Criterion',
      arabicTitle: 'غزوة بدر الكبرى (يوم الفرقان)',
      year: '624 CE',
      gregorianYear: 624,
      hijriYear: '2 AH',
      era: 'Prophetic Era',
      category: 'Great Battles & Strategies',
      summary: '313 lightly armed believers decisively prevail over an army of 1,000 Quraysh warriors at the wells of Badr.',
      fullDescription: 'A defining clash that tested the very survival of the young Islamic community. Despite being vastly outnumbered 3 to 1 with scarce armor and mounts, the Muslims achieved a stunning victory that established the political authority of Madinah.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      location: 'Badr, Western Arabia',
      importanceLevel: 'Decisive Battle'
    },
    {
      id: 'tl-conquest-makkah',
      title: 'The Peaceful Conquest of Makkah',
      arabicTitle: 'فتح مكة',
      year: '630 CE',
      gregorianYear: 630,
      hijriYear: '8 AH',
      era: 'Prophetic Era',
      category: 'Prophetic Era',
      summary: '10,000 Muslims enter Makkah without bloodshed. Prophet Muhammad ﷺ declares universal amnesty: "Go, for you are free."',
      fullDescription: 'Demonstrating unmatched mercy and statesmanship, the Prophet ﷺ cleared the 360 idols from the Kaaba and pardoned his fiercest persecutors, solidifying peace across the Arabian Peninsula.',
      image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      location: 'Makkah',
      importanceLevel: 'Major Milestone'
    },
    {
      id: 'tl-rashidun-dawn',
      title: 'Dawn of the Rashidun Caliphate',
      arabicTitle: 'تأسيس الخلافة الراشدة',
      year: '632 CE',
      gregorianYear: 632,
      hijriYear: '11 AH',
      era: 'Rashidun Caliphate',
      category: 'Rashidun Caliphate',
      summary: 'Abu Bakr as-Siddiq (RA) becomes the first Caliph, preserving the unity of Arabia through the Ridda Wars.',
      fullDescription: 'Following the passing of Prophet Muhammad ﷺ, Abu Bakr (RA) unified the tribes, compiled the Quran into a singular codex (Mushaf), and dispatched expeditions against the encroaching Byzantine and Sasanian empires.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      location: 'Madinah',
      importanceLevel: 'Empire Rise/Fall'
    },
    {
      id: 'tl-yarmouk-636',
      title: 'Battle of Yarmouk & Fall of Byzantine Levant',
      arabicTitle: 'معركة اليرموك الفاصلة',
      year: '636 CE',
      gregorianYear: 636,
      hijriYear: '15 AH',
      era: 'Rashidun Caliphate',
      category: 'Great Battles & Strategies',
      summary: 'Khalid ibn al-Walid annihilates the Byzantine army, opening Syria and Jerusalem to Caliph Umar ibn al-Khattab.',
      fullDescription: 'Considered one of the most decisive tactical triumphs in military history. Six continuous days of ferocious clashes culminated in Khalid’s cavalry sealing the ravine bridges, forcing the Byzantine legions over the cliff precipices.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      location: 'Yarmouk River Basin',
      importanceLevel: 'Decisive Battle',
      relatedVideoId: 'vid-yarmouk'
    },
    {
      id: 'tl-jerusalem-covenant',
      title: 'Umar’s Covenant (Al-Uhda al-Umariyya) in Jerusalem',
      arabicTitle: 'العهدة العمرية في القدس الشريف',
      year: '638 CE',
      gregorianYear: 638,
      hijriYear: '17 AH',
      era: 'Rashidun Caliphate',
      category: 'Rashidun Caliphate',
      summary: 'Caliph Umar enters Jerusalem on foot, guaranteeing freedom of worship, property security, and religious safety to Christians.',
      fullDescription: 'Patriarch Sophronius surrendered the keys of Jerusalem directly to Umar ibn al-Khattab, who entered wearing a patched cloak alongside his servant. Umar refused to pray inside the Church of the Holy Sepulchre to prevent future Muslims from converting it into a mosque.',
      image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      location: 'Jerusalem (Al-Quds)',
      importanceLevel: 'Major Milestone'
    },
    {
      id: 'tl-andalus-711',
      title: 'Tariq ibn Ziyad Lands in Gibraltar & Islamic Spain',
      arabicTitle: 'فتح الأندلس بقيادة طارق بن زياد',
      year: '711 CE',
      gregorianYear: 711,
      hijriYear: '92 AH',
      era: 'Al-Andalus',
      category: 'Al-Andalus & Moorish Spain',
      summary: 'Tariq ibn Ziyad crosses the straits into Europe, defeating the Visigothic King Roderic at the Battle of Guadalete.',
      fullDescription: 'The strategic landing at Jabal Tariq (Gibraltar) inaugurated nearly 800 years of Islamic presence in the Iberian Peninsula, transforming southern Spain into a world beacon of science, arts, agriculture, and poetry.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
      location: 'Gibraltar & Andalusia, Spain',
      importanceLevel: 'Empire Rise/Fall',
      relatedVideoId: 'vid-andalus-cordoba'
    },
    {
      id: 'tl-baghdad-founding',
      title: 'Founding of Baghdad: The Round City & Bayt al-Hikmah',
      arabicTitle: 'تأسيس مدينة السلام (بغداد)',
      year: '762 CE',
      gregorianYear: 762,
      hijriYear: '145 AH',
      era: 'Abbasid Golden Age',
      category: 'Abbasid Golden Age',
      summary: 'Caliph Al-Mansur constructs the Round City of Peace (Madinat al-Salam), the cultural and intellectual epicenter of the world.',
      fullDescription: 'Strategically positioned on the Tigris River, Baghdad quickly swelled to over 1,000,000 residents. Scholars gathered from India, Persia, Greece, and Africa at the Grand Library (House of Wisdom) to pioneer astronomy, algebra, and medicine.',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
      location: 'Baghdad, Iraq',
      importanceLevel: 'Scientific Breakthrough',
      relatedVideoId: 'vid-baghdad-wisdom'
    },
    {
      id: 'tl-hattin-1187',
      title: 'Battle of Hattin & Salahuddin’s Triumph',
      arabicTitle: 'معركة حطين وتحرير بيت المقدس',
      year: '1187 CE',
      gregorianYear: 1187,
      hijriYear: '583 AH',
      era: 'Crusades & Ayyubids',
      category: 'Great Battles & Strategies',
      summary: 'Salahuddin Ayyubi crushes the Crusader Kingdom of Jerusalem and liberates the Holy City with iconic chivalry.',
      fullDescription: 'Enclosing the exhausted Crusader host between twin volcanic peaks near the Sea of Galilee, Salahuddin secured the Holy Sepulchre and Al-Aqsa Mosque without revenge or pillaging.',
      image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      location: 'Horns of Hattin, Palestine',
      importanceLevel: 'Decisive Battle',
      relatedVideoId: 'vid-salahuddin-hattin'
    },
    {
      id: 'tl-ain-jalut-1260',
      title: 'Battle of Ain Jalut: Halting the Mongol Conquest',
      arabicTitle: 'معركة عين جالوت وسحق التتار',
      year: '1260 CE',
      gregorianYear: 1260,
      hijriYear: '658 AH',
      era: 'Crusades & Ayyubids',
      category: 'Great Battles & Strategies',
      summary: 'Mamluk Sultan Qutuz and General Baybars shatter the Mongol detachment in Galilee, saving Cairo and the Islamic heartland.',
      fullDescription: 'Two years after the catastrophic destruction of Baghdad, the Mamluks of Egypt deployed feigned retreats and gunpowder hand-cannons at Ain Jalut to hand the Mongols their first definitive defeat in open field combat.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      location: 'Jezreel Valley, Palestine',
      importanceLevel: 'Decisive Battle',
      relatedVideoId: 'vid-ain-jalut'
    },
    {
      id: 'tl-1453-constantinople',
      title: 'Conquest of Constantinople by Sultan Mehmed II',
      arabicTitle: 'فتح القسطنطينية على يد السلطان محمد الفاتح',
      year: '1453 CE',
      gregorianYear: 1453,
      hijriYear: '857 AH',
      era: 'Ottoman Empire',
      category: 'Ottoman Empire',
      summary: '21-year-old Mehmed II breaches the Triple Theodosian Walls, transforming Constantinople into Kostantiniyye / Istanbul.',
      fullDescription: 'Employing 70-foot siege towers, 1,200-pound bronze stone bombards, and an overland naval bypass into the Golden Horn, the Ottomans fulfilled the famous hadith prophecy and established a grand tri-continental superpower.',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80',
      location: 'Istanbul, Turkey',
      importanceLevel: 'Empire Rise/Fall',
      relatedVideoId: 'vid-1453'
    },
    {
      id: 'tl-panipat-1526',
      title: 'First Battle of Panipat: Foundation of the Mughal Empire',
      arabicTitle: 'معركة باني بت الأولى وتأسيس سلطنة المغول',
      year: '1526 CE',
      gregorianYear: 1526,
      hijriYear: '932 AH',
      era: 'Mughal Empire',
      category: 'Mughal Empire',
      summary: 'Babur defeats the Delhi Sultanate using matchlock musketry and wagon-train field artillery.',
      fullDescription: 'Zahir al-Din Muhammad Babur, a descendant of Timur and Genghis Khan, introduced modern gunpowder battlefield tactics to India, creating an empire celebrated for architectural treasures like the Taj Mahal.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
      location: 'Panipat, Northern India',
      importanceLevel: 'Empire Rise/Fall',
      relatedVideoId: 'vid-mughal-babur'
    }
  ],
  personalities: [
    {
      id: 'pers-khalid',
      slug: 'khalid-ibn-al-walid',
      name: 'Khalid ibn al-Walid',
      arabicName: 'خالد بن الوليد رضي الله عنه',
      title: 'Saifullah (The Sword of Allah)',
      era: 'Rashidun Caliphate',
      birthYear: '592 CE',
      deathYear: '642 CE',
      category: 'Sahaba & Great Leaders',
      biography: 'Undefeated in over 100 military engagements, Khalid ibn al-Walid is widely regarded as one of the greatest military tacticians in human history. Under his leadership, the early Muslims defeated both the Byzantine and Sasanian superpowers simultaneously.',
      achievements: [
        'Remained undefeated in more than 100 field battles.',
        'Masterminded the 6-day masterpiece at the Battle of Yarmouk.',
        'Executed the perilous 8-day forced march across the waterless Syrian Desert to relieve forces at Damascus.',
        'Demonstrated unparalleled humility when accepting Caliph Umar’s order of removal from supreme command without hesitation.'
      ],
      portrait: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['Battle of Uhud', 'Battle of Mu’tah', 'Battle of Yarmouk', 'Battle of al-Qadisiyyah support', 'Battle of Walaja'],
      quote: 'If you were in the clouds, God would raise us to you, or bring you down to us to fight.',
      relatedEventIds: ['tl-yarmouk-636'],
      relatedVideoIds: ['vid-yarmouk']
    },
    {
      id: 'pers-salahuddin',
      slug: 'salahuddin-al-ayyubi',
      name: 'Salahuddin Al-Ayyubi',
      arabicName: 'صلاح الدين الأيوبي',
      title: 'The Chivalrous Liberator of Jerusalem',
      era: 'Crusades & Ayyubids',
      birthYear: '1137 CE',
      deathYear: '1193 CE',
      category: 'Sahaba & Great Leaders',
      biography: 'Sultan of Egypt, Syria, and the Levant, Salahuddin united the fragmented Muslim domains under the Ayyubid banner and recaptured Jerusalem from the Crusaders in 1187. His generosity, compassion, and respect for his enemies earned him universal admiration even in medieval European chronicles.',
      achievements: [
        'Unified Egypt, Syria, and Upper Mesopotamia into a united defensive state.',
        'Crushed the Crusader field army at the Horns of Hattin in 1187.',
        'Liberated Jerusalem without executing a single captive citizen.',
        'Sent personal physicians and fresh fruits to King Richard the Lionheart when he fell ill with fever.'
      ],
      portrait: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['Battle of Hattin', 'Siege of Jerusalem', 'Siege of Acre', 'Treaty of Jaffa'],
      quote: 'I warn you against the shedding of blood, for blood never sleeps.',
      relatedEventIds: ['tl-hattin-1187'],
      relatedVideoIds: ['vid-salahuddin-hattin']
    },
    {
      id: 'pers-mehmed-ii',
      slug: 'sultan-mehmed-ii-fatih',
      name: 'Sultan Mehmed II (Al-Fatih)',
      arabicName: 'السلطان محمد الفاتح',
      title: 'The Conqueror (Fatih Sultan Mehmet)',
      era: 'Ottoman Empire',
      birthYear: '1432 CE',
      deathYear: '1481 CE',
      category: 'Ottoman Empire',
      biography: 'Ascending the throne as a scholarly youth proficient in Arabic, Persian, Greek, Latin, Hebrew, and Serbian, Mehmed II engineered the conquest of Constantinople at age 21, founded Istanbul University, and established imperial laws protecting Christian and Jewish subjects.',
      achievements: [
        'Conquered Constantinople in 1453, ending the 1,100-year Byzantine Empire.',
        'Issued the Ahdname of Milodraz granting complete freedom to Franciscan monks.',
        'Rebuilt Istanbul into a cosmopolitan capital of arts, international diplomacy, and science.',
        'Established the Topkapi Palace and the Fatih Mosque complex.'
      ],
      portrait: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['Siege of Constantinople', 'Conquest of Trebizond', 'Conquest of Bosnia', 'Battle of Otlukbeli'],
      quote: 'My empire will extend to wherever my horse can carry my sword.',
      relatedEventIds: ['tl-1453-constantinople'],
      relatedVideoIds: ['vid-1453']
    },
    {
      id: 'pers-khwarizmi',
      slug: 'muhammad-ibn-musa-al-khwarizmi',
      name: 'Al-Khwarizmi',
      arabicName: 'محمد بن موسى الخوارزمي',
      title: 'The Father of Algebra & Algorithms',
      era: 'Abbasid Golden Age',
      birthYear: '780 CE',
      deathYear: '850 CE',
      category: 'Muslim Scientists & Scholars',
      biography: 'Working in the House of Wisdom in Baghdad, Al-Khwarizmi’s groundbreaking treatise "Kitab al-Jabr wa-l-Muqabala" gave humanity the discipline and name of Algebra. His name in Latin translation became the root of the modern word "Algorithm".',
      achievements: [
        'Invented systematic algebraic solutions for linear and quadratic equations.',
        'Introduced the Hindu-Arabic decimal numeral system and zero to the Western world.',
        'Calculated exact coordinates for over 2,400 global locations in geography.',
        'Developed astronomical tables (Zīj) used for navigation across centuries.'
      ],
      portrait: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['Al-Kitab al-mukhtasar fi hisab al-jabr wa-l-muqabala', 'Kitab al-Jam wal-Tafriq bi Hisab al-Hind', 'Surat al-Ard'],
      quote: 'When I considered what people usually want in calculating, I found that it always was a number.'
    },
    {
      id: 'pers-haytham',
      slug: 'al-hasan-ibn-al-haytham',
      name: 'Ibn al-Haytham (Alhazen)',
      arabicName: 'الحسن بن الهيثم',
      title: 'The Father of Modern Optics',
      era: 'Abbasid Golden Age',
      birthYear: '965 CE',
      deathYear: '1040 CE',
      category: 'Muslim Scientists & Scholars',
      biography: 'Ibn al-Haytham fundamentally transformed how science is conducted by establishing the empirical Scientific Method. He proved that light enters the human eye rather than emanating from it, inventing the Camera Obscura (Al-Bayt al-Muthlim).',
      achievements: [
        'Authored the 7-volume magnum opus "Kitab al-Manazir" (Book of Optics).',
        'Demonstrated that rays of light travel in straight lines into the retina.',
        'Constructed the earliest working pinhole camera (Camera Obscura).',
        'Pioneered controlled laboratory experimentation to test mathematical hypotheses.'
      ],
      portrait: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['Kitab al-Manazir (Book of Optics)', 'Treatise on Light', 'On the Configuration of the World'],
      quote: 'The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads.'
    },
    {
      id: 'pers-fatima',
      slug: 'fatima-al-fihriyya',
      name: 'Fatima al-Fihri',
      arabicName: 'فاطمة الفهرية',
      title: 'Founder of the World’s First University',
      era: 'Abbasid Golden Age',
      birthYear: '800 CE',
      deathYear: '880 CE',
      category: 'Untold Stories & Mysteries',
      biography: 'A devout and visionary Muslim woman from Kairouan who migrated to Fez, Morocco. In 859 CE, she used her entire inherited wealth to build the Mosque and University of al-Qarawiyyin, recognized by UNESCO as the oldest continuously operating higher-education institution in the world.',
      achievements: [
        'Founded the University of al-Qarawiyyin in Fez in 859 CE.',
        'Introduced the academic degree / diploma (Ijazah) system to global academia.',
        'Fasted continuously every single day of the university’s multi-year construction.',
        'Educated legendary philosophers including Ibn Rushd, Ibn Khaldun, and Pope Sylvester II.'
      ],
      portrait: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
      keyBattlesOrWorks: ['University of al-Qarawiyyin', 'Al-Qarawiyyin Grand Manuscript Library'],
      quote: 'Knowledge is a trust from the Divine that must be shared freely with all seekers of truth.',
      relatedVideoIds: ['vid-fatima-fihri']
    }
  ],
  articles: [
    {
      id: 'art-constantinople-cannons',
      slug: 'the-super-cannons-that-shattered-constantinople',
      title: 'The Super-Cannons of Urban: How Ottoman Gunpowder Changed Medieval Fortresses Forever',
      subtitle: 'An archaeological and metallurgical breakdown of the 27-foot bronze Basilisk bombard deployed by Sultan Mehmed II in 1453.',
      category: 'Ottoman Empire',
      readTime: '8 min read',
      author: {
        name: 'The Kohistani Research Desk',
        role: 'Senior Historical Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      publishDate: '2026-06-15',
      coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&auto=format&fit=crop&q=85',
      tags: ['Constantinople', 'Siege Warfare', 'Ottoman', 'Military Engineering'],
      isFeatured: true,
      status: 'published',
      keyTakeaways: [
        'Urban’s cannon required 60 oxen and 200 men just to transport across Thrace.',
        'It could fire a 1,200-pound granite boulder over one mile.',
        'Its heat required olive oil cooling baths after every single shot.'
      ],
      content: `
### The Impenetrable Walls of Theodosius

For over a millennium, Constantinople stood as Europe’s impregnable fortress. Shielded by the majestic **Theodosian Walls**—a three-tiered defense consisting of a 60-foot moat, an outer rampart, and massive inner stone walls with 96 towers—the city had weathered twenty-two foreign sieges by Avars, Persians, Arabs, and Rus.

Yet by the spring of 1453, the 21-year-old Ottoman Sultan, **Mehmed II**, understood that standard medieval siege engines, counterweight trebuchets, and mining tunnels would never suffice. He needed something the world had never witnessed before: **super-heavy field artillery**.

### The Genius of Master Urban

Enter **Urban**, an ironfounder and engineer from Transylvania/Hungary. Urban had initially offered his services to the Byzantine Emperor Constantine XI Palaiologos, but the cash-strapped Byzantine treasury could neither afford his requested stipend nor supply the immense quantities of copper and tin required.

Urban departed for the Ottoman court in Edirne. Sultan Mehmed II received him eagerly, asking one critical question:
> *"Can you cast a cannon capable of shattering the stone walls of Constantinople?"*

Urban replied:
> *"I can cast a cannon in bronze that would reduce to dust not merely the walls of Byzantium, but the walls of Babylon itself."*

### Casting the Monster Basilisk Bombard

Within three months in the Edirne foundries, Urban melted vast amounts of bronze to cast the legendary **Great Turkish Bombard (The Basilisk)**:
* **Length:** 27 feet (8.2 meters)
* **Diameter of barrel:** 30 inches (76 cm)
* **Bronze weight:** Over 18 tons
* **Projectile:** Hand-chiseled Black Sea granite spheres weighing **1,200 pounds (540 kg)**

Transporting this behemoth 150 miles from Edirne to the outskirts of Constantinople was a titanic logistical feat. It required a specially engineered carriage drawn by **60 oxen** and flanked by **200 men**, preceded by a pioneer brigade of 50 road-builders to reinforce wooden bridges and level hills.

### The Thunder of 1453

When the siege began on April 6, 1453, Mehmed positioned Urban's master cannon along the **Mesoteichion** section of the walls near the Lycus River valley. The firing process was perilous:
1. The barrel became so scalding hot that it had to be bathed in barrels of olive oil after each discharge to prevent structural fractures.
2. It could only fire **5 to 8 shots per day**.
3. Yet when it fired, the ground shook for miles, and the impact sent shockwaves through the stone ramparts that toppled whole watchtowers into rubble.

Combined with 68 smaller Ottoman cannons firing in coordinated batteries, Mehmed’s artillery relentlessly pulverized the stone defenses faster than Byzantine repair crews could rebuild them with earth-filled barrels.

### The Dawn of Modern Military Geopolitics

When Constantinople fell on May 29, 1453, it was not merely the end of the Roman Empire; it was the funeral of **medieval castle fortifications**. Around the globe, military architects scrambled to invent low, angled, star-shaped bastions (*trace italienne*) to resist cannon fire.

The siege demonstrated Sultan Mehmed II’s forward-looking mastery of industrial warfare, logistical synergy, and decisive leadership.
      `
    },
    {
      id: 'art-khalid-tactics',
      slug: 'military-genius-of-khalid-ibn-al-walid',
      title: 'The Master of Rapid Warfare: Deconstructing Khalid ibn al-Walid’s Combat Doctrine',
      subtitle: 'Why modern West Point and Sandhurst military academies continue to analyze the mobile cavalry tactics of Saifullah.',
      category: 'Great Battles & Strategies',
      readTime: '10 min read',
      author: {
        name: 'The Kohistani Research Desk',
        role: 'Senior Historical Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      publishDate: '2026-05-22',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=85',
      tags: ['Khalid ibn al-Walid', 'Military History', 'Tactics', 'Rashidun Caliphate'],
      isFeatured: true,
      status: 'published',
      keyTakeaways: [
        'Pioneered the concept of an elite mobile cavalry strike reserve.',
        'Mastered psychological warfare by eliminating opposing generals in single combat.',
        'Used extreme terrain and weather conditions as offensive multipliers.'
      ],
      content: `
### An Undefeated Military Record

In the annals of global warfare, only a handful of commanders—Alexander the Great, Genghis Khan, and **Khalid ibn al-Walid (RA)**—fought numerous pitched battles without suffering a single defeat. Yet Khalid operated against far greater odds, simultaneously dismantling the two superpowers of his day: the **Eastern Roman (Byzantine) Empire** and the **Sasanian Persian Empire**.

### 1. The Mobile Guard (Tali'a Mutaharrika)

Khalid’s greatest organizational invention was the **Mobile Guard**: an elite cavalry reserve of 4,000 veteran horsemen kept under his personal direct command. 

In standard 7th-century warfare, armies were divided rigidly into center, left wing, and right wing. When a battle began, commanders usually committed all forces. Khalid, however:
* Kept his Mobile Guard stationed slightly behind the front line.
* Monitored the battlefield from an elevated vantage point.
* Dispatched this rapid strike force to plug emerging breaches or deliver devastating flanking charges into the exposed rearguards of enemy formations.

### 2. The Art of the Double Envelopment: Battle of Walaja (633 CE)

Two centuries before Hannibal’s famous triumph at Cannae was studied in military text, Khalid executed a textbook **double envelopment** against Sasanian general Andarzaghar at Walaja. 

He detached two cavalry units of 2,000 riders the night before the battle, ordering them to hide behind low desert ridges behind the Persian lines. When the Persians pushed forward against the retreating Muslim center, the hidden cavalry pincer struck from the rear, trapping the Persian army in a deadly vice.

### 3. Turning Deserts into Highways: The Syrian March

In 634 CE, when Muslim forces in Syria faced encirclement by Byzantine reinforcements, Caliph Abu Bakr sent an urgent message to Khalid in Iraq. 

Rather than taking the conventional weeks-long northern route vulnerable to Byzantine scouts, Khalid made a daring decision: **he marched 9,000 men directly across the waterless Syrian Desert**.

By forcing camels to drink immense amounts of water and later using them for emergency hydration along the 8-day trek, Khalid emerged unexpectedly at the gates of Damascus from the deep desert, catching the Byzantines in complete disarray.

### A Legacy of Humility

When Caliph Umar ibn al-Khattab ordered Khalid's replacement with Abu Ubaidah ibn al-Jarrah during the peak of the Levant campaign—to remind the believers that victory comes solely from God and not from the genius of any mortal commander—Khalid accepted the decision immediately. He picked up his spear and fought in the ranks as a humble ordinary soldier, embodying true Islamic discipline and devotion.
      `
    },
    {
      id: 'art-house-of-wisdom',
      slug: 'the-lost-glory-of-bayt-al-hikmah',
      title: 'Bayt al-Hikmah: How 9th-Century Baghdad Ignited the Modern Scientific Method',
      subtitle: 'The grand translation movement, optical breakthroughs, and medical triumphs of the Abbasid Golden Age.',
      category: 'Abbasid Golden Age',
      readTime: '7 min read',
      author: {
        name: 'The Kohistani Research Desk',
        role: 'Senior Historical Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      publishDate: '2026-05-02',
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1280&auto=format&fit=crop&q=85',
      tags: ['Abbasid', 'House of Wisdom', 'Science', 'Baghdad', 'Golden Age'],
      isFeatured: false,
      status: 'published',
      content: `
### The Round City on the Tigris

Founded in 762 CE by the second Abbasid Caliph, **Al-Mansur**, Baghdad was planned as a circular metropolis symbolizing geometric perfection and cosmic order. At its vibrant heart lay **Bayt al-Hikmah (The House of Wisdom)**, an unprecedented institution that served simultaneously as a public university, research academy, translation bureau, and astronomical observatory.

### The Weight of a Book in Pure Gold

Under the patronage of Caliphs **Harun al-Rashid** and **Al-Ma’mun**, intellectual discovery became the primary currency of statecraft. Caliph Al-Ma’mun famously offered Christian, Jewish, Persian, and Muslim translators the exact weight of any translated manuscript in pure gold.

Caravans traveled to Constantinople, Damascus, Alexandria, Gundeshapur, and India to purchase ancient scrolls containing the works of Aristotle, Euclid, Galen, Brahmagupta, and Ptolemy.

### Beyond Mere Preservation: Innovation and Synthesis

Western historiography sometimes mischaracterizes Islamic scholars as mere "preservers" of classical Greek thought. In reality, Baghdad’s scholars subjected ancient claims to relentless empirical skepticism:
1. **Al-Khwarizmi** synthesized Indian numerals with Babylonian geometry to invent algebra.
2. **Hunayn ibn Ishaq** corrected anatomical errors in Galen’s ophthalmic diagrams.
3. **The Banu Musa Brothers** designed over 100 automated mechanical devices and programmable musical machines.
4. **Al-Razi (Rhazes)** established the world’s first clinical psychiatric wards and differentiated smallpox from measles.

### The Tragic Eclipse of 1258

The intellectual brilliance of Bayt al-Hikmah endured for half a millennium until the cataclysmic Mongol siege of Baghdad in 1258. Eye-witness accounts recorded that the Tigris River ran black with the ink of hundreds of thousands of thrown manuscripts, and red with the blood of scholars.

Yet the foundational ideas forged in Baghdad had already migrated to Cordoba, Fez, Cairo, and Sicily, igniting the spark that would eventually give birth to the European Renaissance.
      `
    }
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Dr. Tariq Al-Hashimi',
      email: 'tariq.hashimi@history-institute.org',
      subject: 'Collaboration on Documentary Series: Al-Andalus Manuscripts',
      message: 'Assalamu Alaikum The Kohistani team. We have recently cataloged 14th-century nautical manuscripts from Granada and would love to collaborate on an upcoming documentary episode regarding Muslim oceanic navigation.',
      date: '2026-08-20',
      isRead: false,
      status: 'new'
    },
    {
      id: 'msg-2',
      name: 'Zainab Qureshi',
      email: 'zainab.q@educationalmedia.co.uk',
      subject: 'School Curriculum Licensing for Timeline Graphics',
      message: 'Hello! I am a high school history educator in London. We use your interactive timelines and YouTube documentaries in our Islamic Civilization curriculum. Are there high-res PDF timeline maps available for classroom printing?',
      date: '2026-08-18',
      isRead: true,
      status: 'replied'
    },
    {
      id: 'msg-3',
      name: 'Hamza Farooq',
      email: 'hamza.f@gmail.com',
      subject: 'Suggestion for Next Video: Battle of Yarmouk Deep Dive',
      message: 'Your documentary on Constantinople was an absolute visual masterpiece! Could you please make an episode focusing on the strategy of Khalid ibn al-Walid at the Battle of al-Qadisiyyah and the elephant charges?',
      date: '2026-08-15',
      isRead: true,
      status: 'archived'
    }
  ],
  media: [
    {
      id: 'med-1',
      name: 'Constantinople Walls Artwork',
      url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&auto=format&fit=crop&q=85',
      category: 'Ottoman Empire',
      size: '1.8 MB',
      uploadDate: '2026-06-12',
      dimensions: '1920x1080'
    },
    {
      id: 'med-2',
      name: 'Desert Cavalry Battle Reenactment',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=85',
      category: 'Great Battles',
      size: '2.4 MB',
      uploadDate: '2026-05-18',
      dimensions: '1920x1080'
    },
    {
      id: 'med-3',
      name: 'House of Wisdom Baghdad Library',
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1280&auto=format&fit=crop&q=85',
      category: 'Abbasid Era',
      size: '2.1 MB',
      uploadDate: '2026-04-29',
      dimensions: '1920x1080'
    },
    {
      id: 'med-4',
      name: 'Dome of the Rock Al-Quds',
      url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?w=1280&auto=format&fit=crop&q=85',
      category: 'Rashidun & Umayyad',
      size: '3.2 MB',
      uploadDate: '2026-03-15',
      dimensions: '2048x1365'
    },
    {
      id: 'med-5',
      name: 'Alhambra Court of the Lions',
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1280&auto=format&fit=crop&q=85',
      category: 'Al-Andalus',
      size: '2.8 MB',
      uploadDate: '2026-02-10',
      dimensions: '1920x1080'
    }
  ],
  users: [
    {
      id: 'usr-1',
      username: 'hello19',
      name: 'The Kohistani (Super Admin)',
      email: 'admin@thekohistani.com',
      role: 'super_admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      title: 'Founder & Head of Channel',
      salt: 'salt_hello19_initial_2026',
      passwordHash: 'abc0665051c3b5962e3dfa35d2066e47f8a94255350a2dad37350829e5017599',
      isActive: true,
      createdAt: '2026-01-01'
    },
    {
      id: 'usr-2',
      username: 'tariq',
      name: 'Dr. Tariq Mansoor',
      email: 'tariq@thekohistani.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      title: 'Head of Historical Research',
      salt: 'salt_tariq_2026',
      passwordHash: 'f38f1fa8bc3b3f52305d650c5c345332d877fe72301de2d5c9394472a4405240',
      isActive: true,
      createdAt: '2026-01-15'
    },
    {
      id: 'usr-3',
      username: 'sara',
      name: 'Sara Al-Nuaimi',
      email: 'sara@thekohistani.com',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      title: 'Managing Article Editor',
      salt: 'salt_sara_2026',
      passwordHash: '8d5a8e0ca89169e7cca705ec470e71635f95edf0d32cf0d18638ab44646cb2e8',
      isActive: true,
      createdAt: '2026-02-01'
    }
  ]
};
