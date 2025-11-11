export interface Manhwa {
  id: string
  title: string
  author: string
  cover: string
  category: 'currently-reading' | 'wishlist' | 'recommended'
  genre?: string
  status?: 'Completed' | 'Ongoing'
  links?: {
    webtoon?: string
    website?: string
  }
}

export const currentlyReadingManhwa: Manhwa[] = [
  {
    id: '1',
    title: 'Solo Leveling',
    author: 'Chugong',
    cover: 'https://picsum.photos/300/450?random=101',
    category: 'currently-reading',
    genre: 'Action, Fantasy',
    status: 'Completed',
    links: {
      webtoon: 'https://webtoon.com/solo-leveling',
    },
  },
  {
    id: '2',
    title: 'Omniscient Reader\'s Viewpoint',
    author: 'Sing-Shong',
    cover: 'https://picsum.photos/300/450?random=102',
    category: 'currently-reading',
    genre: 'Action, Fantasy',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/omniscient-reader',
    },
  },
  {
    id: '3',
    title: 'The Beginning After the End',
    author: 'TurtleMe',
    cover: 'https://picsum.photos/300/450?random=103',
    category: 'currently-reading',
    genre: 'Fantasy, Action',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/tbate',
    },
  },
  {
    id: '4',
    title: 'Eleceed',
    author: 'Son Je-Ho',
    cover: 'https://picsum.photos/300/450?random=104',
    category: 'currently-reading',
    genre: 'Action, Supernatural',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/eleceed',
    },
  },
  {
    id: '5',
    title: 'Weak Hero',
    author: 'Seopass',
    cover: 'https://picsum.photos/300/450?random=105',
    category: 'currently-reading',
    genre: 'Action, Drama',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/weak-hero',
    },
  },
  {
    id: '6',
    title: 'The Greatest Estate Developer',
    author: 'Kim Hyun-Soo',
    cover: 'https://picsum.photos/300/450?random=106',
    category: 'currently-reading',
    genre: 'Comedy, Fantasy',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/greatest-estate',
    },
  },
]

export const wishlistManhwa: Manhwa[] = [
  {
    id: '7',
    title: 'Tower of God',
    author: 'SIU',
    cover: 'https://picsum.photos/300/450?random=107',
    category: 'wishlist',
    genre: 'Fantasy, Adventure',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/tower-of-god',
    },
  },
  {
    id: '8',
    title: 'Lookism',
    author: 'Park Tae-Jun',
    cover: 'https://picsum.photos/300/450?random=108',
    category: 'wishlist',
    genre: 'Drama, Slice of Life',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/lookism',
    },
  },
  {
    id: '9',
    title: 'Teenage Mercenary',
    author: 'YC',
    cover: 'https://picsum.photos/300/450?random=109',
    category: 'wishlist',
    genre: 'Action, Suspense',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/teenage-mercenary',
    },
  },
  {
    id: '10',
    title: 'Mercenary Enrollment',
    author: 'YC',
    cover: 'https://picsum.photos/300/450?random=110',
    category: 'wishlist',
    genre: 'Action, Drama',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/mercenary-enrollment',
    },
  },
  {
    id: '11',
    title: 'The Boxer',
    author: 'Jung Ji-Hoon',
    cover: 'https://picsum.photos/300/450?random=111',
    category: 'wishlist',
    genre: 'Sports, Drama',
    status: 'Completed',
    links: {
      webtoon: 'https://webtoon.com/the-boxer',
    },
  },
  {
    id: '12',
    title: 'Who Made Me a Princess',
    author: 'Plutus',
    cover: 'https://picsum.photos/300/450?random=112',
    category: 'wishlist',
    genre: 'Fantasy, Romance',
    status: 'Completed',
    links: {
      webtoon: 'https://webtoon.com/who-made-me-princess',
    },
  },
  {
    id: '13',
    title: 'Noblesse',
    author: 'Son Je-Ho',
    cover: 'https://picsum.photos/300/450?random=113',
    category: 'wishlist',
    genre: 'Action, Supernatural',
    status: 'Completed',
    links: {
      webtoon: 'https://webtoon.com/noblesse',
    },
  },
  {
    id: '14',
    title: 'Myst, Might, Mayhem',
    author: 'Unknown',
    cover: 'https://picsum.photos/300/450?random=114',
    category: 'wishlist',
    genre: 'Fantasy, Action',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/myst-might-mayhem',
    },
  },
]

export const recommendedManhwa: Manhwa[] = [
  {
    id: '15',
    title: 'Solo Leveling',
    author: 'Chugong',
    cover: 'https://picsum.photos/300/450?random=115',
    category: 'recommended',
    genre: 'Action, Fantasy',
    status: 'Completed',
    links: {
      webtoon: 'https://webtoon.com/solo-leveling',
    },
  },
  {
    id: '16',
    title: 'Omniscient Reader\'s Viewpoint',
    author: 'Sing-Shong',
    cover: 'https://picsum.photos/300/450?random=116',
    category: 'recommended',
    genre: 'Action, Fantasy',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/omniscient-reader',
    },
  },
  {
    id: '17',
    title: 'The Greatest Estate Developer',
    author: 'Kim Hyun-Soo',
    cover: 'https://picsum.photos/300/450?random=117',
    category: 'recommended',
    genre: 'Comedy, Fantasy',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/greatest-estate',
    },
  },
  {
    id: '18',
    title: 'Eleceed',
    author: 'Son Je-Ho',
    cover: 'https://picsum.photos/300/450?random=118',
    category: 'recommended',
    genre: 'Action, Supernatural',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/eleceed',
    },
  },
  {
    id: '19',
    title: 'Tower of God',
    author: 'SIU',
    cover: 'https://picsum.photos/300/450?random=119',
    category: 'recommended',
    genre: 'Fantasy, Adventure',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/tower-of-god',
    },
  },
  {
    id: '20',
    title: 'Weak Hero',
    author: 'Seopass',
    cover: 'https://picsum.photos/300/450?random=120',
    category: 'recommended',
    genre: 'Action, Drama',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/weak-hero',
    },
  },
]

