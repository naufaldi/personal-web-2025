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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105398-b673Vt5ZSuz3.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119257-Pi21aq3ey9GG.jpg',
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
    cover:
      'https://books.google.com/books/content?id=H_u4EAAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106929-flAUvHZDUz5v.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx113488-0ghq0eEnftk0.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140407-fJQr0fmqq1IO.png',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx85143-23oup3ETbFJk.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86848-4CSItSclJUvi.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx126297-SPiM7QtUnJ4P.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx126297-SPiM7QtUnJ4P.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b119174-nFMZSHbrDDbt.png',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx107521-M4x3AUb7UGIM.png',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx59983-cfSjrRxuAlAD.png',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx175946-rx6eIfakvWYV.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105398-b673Vt5ZSuz3.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119257-Pi21aq3ey9GG.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140407-fJQr0fmqq1IO.png',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106929-flAUvHZDUz5v.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx85143-23oup3ETbFJk.jpg',
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
    cover: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx113488-0ghq0eEnftk0.jpg',
    category: 'recommended',
    genre: 'Action, Drama',
    status: 'Ongoing',
    links: {
      webtoon: 'https://webtoon.com/weak-hero',
    },
  },
]
