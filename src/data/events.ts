export type EventCategory =
  | 'Technology'
  | 'Art'
  | 'Music'
  | 'Sports'
  | 'Food'
  | 'Education'
  | 'Community'
  | 'Health'
  | 'Business'
  | 'Science';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  position: [number, number];
  categories: EventCategory[]; // Changed to an array of categories
  imageUrl?: string; // Optional image URL for the event
  location?: string; // Optional human-readable location
}

// Base position for events
const BASE_POSITION: [number, number] = [54.6872, 25.2797];

export const events: Event[] = [
  {
    id: 1,
    title: 'Tech Conference 2023',
    description: 'An annual conference for tech enthusiasts and professionals.',
    date: '2025-10-26', // Fixed date
    time: '09:00',
    position: [BASE_POSITION[0] + 0.005, BASE_POSITION[1] - 0.01], // Fixed position
    categories: ['Technology', 'Education'],
    imageUrl: 'https://picsum.photos/seed/tech/800/400',
    location: 'Konstitucijos pr. 26, Vilnius',
  },
  {
    id: 2,
    title: 'Art Exhibition',
    description: 'A display of contemporary art from local artists.',
    date: '2025-10-27', // Fixed date
    time: '10:00',
    position: [BASE_POSITION[0] - 0.008, BASE_POSITION[1] + 0.015], // Fixed position
    categories: ['Art', 'Community'],
    imageUrl: 'https://picsum.photos/seed/art/800/400',
    location: 'Didžioji g. 35, Vilnius',
  },
  {
    id: 3,
    title: 'Music Festival',
    description: 'An outdoor music festival featuring various artists.',
    date: '2025-10-28', // Fixed date
    time: '12:00',
    position: [BASE_POSITION[0] + 0.01, BASE_POSITION[1] - 0.005], // Fixed position
    categories: ['Music'],
    imageUrl: 'https://picsum.photos/seed/music/800/400',
    location: 'Vingio Parkas, Vilnius',
  },
  {
    id: 4,
    title: 'Local Marathon',
    description: 'Annual city marathon for all ages.',
    date: '2025-10-29', // Fixed date
    time: '08:00',
    position: [BASE_POSITION[0] - 0.015, BASE_POSITION[1] - 0.02], // Fixed position
    categories: ['Sports', 'Health'],
    location: 'Gedimino pr., Vilnius',
  },
  {
    id: 5,
    title: 'Food Truck Rally',
    description: 'A gathering of the best food trucks in the city.',
    date: '2025-10-30', // Fixed date
    time: '11:00',
    position: [BASE_POSITION[0] + 0.002, BASE_POSITION[1] + 0.025], // Fixed position
    categories: ['Food', 'Community'],
    imageUrl: 'https://picsum.photos/seed/food/800/400',
    location: 'Paupio g. 28, Vilnius',
  },
  {
    id: 6,
    title: 'Coding Workshop',
    description: 'Learn the basics of web development in this interactive workshop.',
    date: '2025-10-31', // Fixed date
    time: '14:00',
    position: [BASE_POSITION[0] - 0.005, BASE_POSITION[1] - 0.015], // Fixed position
    categories: ['Education', 'Technology'],
    imageUrl: 'https://picsum.photos/seed/coding/800/400',
    location: 'Saulėtekio al. 15, Vilnius',
  },
  {
    id: 7,
    title: 'Community Cleanup',
    description: 'Help keep our parks clean and green.',
    date: '2025-11-01', // Fixed date
    time: '09:00',
    position: [BASE_POSITION[0] + 0.012, BASE_POSITION[1] + 0.008], // Fixed position
    categories: ['Community'],
    location: 'Bernardinų sodas, Vilnius',
  },
  {
    id: 8,
    title: 'Yoga in the Park',
    description: 'A relaxing outdoor yoga session for all skill levels.',
    date: '2025-11-02', // Fixed date
    time: '17:00',
    position: [BASE_POSITION[0] - 0.01, BASE_POSITION[1] + 0.002], // Fixed position
    categories: ['Health', 'Sports'],
    imageUrl: 'https://picsum.photos/seed/yoga/800/400',
    location: 'Vingio Parkas, Vilnius',
  },
  {
    id: 9,
    title: 'Startup Pitch Event',
    description: 'Watch local startups pitch their innovative ideas.',
    date: '2025-11-03', // Fixed date
    time: '18:30',
    position: [BASE_POSITION[0] + 0.007, BASE_POSITION[1] - 0.025], // Fixed position
    categories: ['Business', 'Technology'],
    imageUrl: 'https://picsum.photos/seed/startup/800/400',
    location: 'Vilnius Tech Park, Antakalnio g. 17, Vilnius',
  },
  {
    id: 10,
    title: 'Astronomy Night',
    description: 'Observe the night sky with local astronomers.',
    date: '2025-11-04', // Fixed date
    time: '20:00',
    position: [BASE_POSITION[0] - 0.003, BASE_POSITION[1] + 0.01], // Fixed position
    categories: ['Science'],
    location: 'Lithuanian Museum of Ethnocosmology, Kulionys',
  },
  {
    id: 11,
    title: 'AI & Machine Learning Summit',
    description: 'Explore the latest advancements in AI and machine learning.',
    date: '2025-11-05', // Fixed date
    time: '10:00',
    position: [BASE_POSITION[0] + 0.015, BASE_POSITION[1] + 0.003], // Fixed position
    categories: ['Technology', 'Business'],
    imageUrl: 'https://picsum.photos/seed/ai/800/400',
    location: 'Radisson Blu Hotel Lietuva, Konstitucijos pr. 20, Vilnius',
  },
  {
    id: 12,
    title: 'Web Development Bootcamp',
    description: 'Intensive bootcamp for aspiring web developers.',
    date: '2025-11-06', // Fixed date
    time: '09:00',
    position: [BASE_POSITION[0] - 0.012, BASE_POSITION[1] - 0.008], // Fixed position
    categories: ['Technology', 'Education'],
    imageUrl: 'https://picsum.photos/seed/webdev/800/400',
    location: 'Vilnius Coding School, Žalgirio g. 92, Vilnius',
  },
  {
    id: 13,
    title: 'Modern Art Gallery Opening',
    description: 'Discover new works from emerging artists.',
    date: '2025-11-07', // Fixed date
    time: '19:00',
    position: [BASE_POSITION[0] + 0.008, BASE_POSITION[1] + 0.018], // Fixed position
    categories: ['Art'],
    location: 'Contemporary Art Centre, Vokiečių g. 2, Vilnius',
  },
  {
    id: 14,
    title: 'Street Art Tour',
    description: 'Guided tour of Vilnius\'s vibrant street art scene.',
    date: '2025-11-08', // Fixed date
    time: '15:00',
    position: [BASE_POSITION[0] - 0.007, BASE_POSITION[1] - 0.002], // Fixed position
    categories: ['Art', 'Community'],
    imageUrl: 'https://picsum.photos/seed/streetart/800/400',
    location: 'Užupis, Vilnius',
  },
  {
    id: 15,
    title: 'Jazz Night Live',
    description: 'An evening of live jazz music at a cozy club.',
    date: '2025-11-09', // Fixed date
    time: '21:00',
    position: [BASE_POSITION[0] + 0.003, BASE_POSITION[1] - 0.012], // Fixed position
    categories: ['Music'],
    imageUrl: 'https://picsum.photos/seed/jazz/800/400',
    location: 'Tamsta Club, A. Strazdelio g. 1, Vilnius',
  },
  {
    id: 16,
    title: 'Classical Music Concert',
    description: 'Performance by the Vilnius Philharmonic Orchestra.',
    date: '2025-11-10', // Fixed date
    time: '19:30',
    position: [BASE_POSITION[0] - 0.018, BASE_POSITION[1] + 0.005], // Fixed position
    categories: ['Music'],
    location: 'Lithuanian National Philharmonic Society, Aušros Vartų g. 5, Vilnius',
  },
  {
    id: 17,
    title: 'Basketball Championship',
    description: 'Watch the final game of the national basketball league.',
    date: '2025-11-11', // Fixed date
    time: '18:00',
    position: [BASE_POSITION[0] + 0.01, BASE_POSITION[1] + 0.01], // Fixed position
    categories: ['Sports'],
    imageUrl: 'https://picsum.photos/seed/basketball/800/400',
    location: 'Avia Solutions Group Arena, Ozo g. 14, Vilnius',
  },
  {
    id: 18,
    title: 'Cycling Race',
    description: 'Annual city-wide cycling competition.',
    date: '2025-11-12', // Fixed date
    time: '07:00',
    position: [BASE_POSITION[0] - 0.009, BASE_POSITION[1] - 0.022], // Fixed position
    categories: ['Sports'],
    location: 'Velo City Track, Vilnius',
  },
  {
    id: 19,
    title: 'Vegan Food Fair',
    description: 'Taste delicious plant-based dishes from local vendors.',
    date: '2025-11-13', // Fixed date
    time: '11:00',
    position: [BASE_POSITION[0] + 0.006, BASE_POSITION[1] + 0.001], // Fixed position
    categories: ['Food', 'Community'],
    imageUrl: 'https://picsum.photos/seed/veganfood/800/400',
    location: 'Loftas, Švitrigailos g. 29, Vilnius',
  },
  {
    id: 20,
    title: 'Cooking Class: Lithuanian Cuisine',
    description: 'Learn to cook traditional Lithuanian dishes.',
    date: '2025-11-14', // Fixed date
    time: '16:00',
    position: [BASE_POSITION[0] - 0.004, BASE_POSITION[1] + 0.013], // Fixed position
    categories: ['Food', 'Education'],
    location: 'Culinary Studio Čiop Čiop, Žvejų g. 2, Vilnius',
  },
  {
    id: 21,
    title: 'Language Exchange Meetup',
    description: 'Practice different languages with native speakers.',
    date: '2025-11-15', // Fixed date
    time: '18:00',
    position: [BASE_POSITION[0] + 0.011, BASE_POSITION[1] - 0.009], // Fixed position
    categories: ['Education', 'Community'],
    imageUrl: 'https://picsum.photos/seed/language/800/400',
    location: 'National Library of Lithuania, Gedimino pr. 51, Vilnius',
  },
  {
    id: 22,
    title: 'University Open Day',
    description: 'Explore study programs and campus facilities.',
    date: '2025-11-16', // Fixed date
    time: '10:00',
    position: [BASE_POSITION[0] - 0.013, BASE_POSITION[1] - 0.004], // Fixed position
    categories: ['Education'],
    location: 'Vilnius University, Universiteto g. 3, Vilnius',
  },
  {
    id: 23,
    title: 'Neighborhood Festival',
    description: 'A celebration of local culture with music, food, and games.',
    date: '2025-11-17', // Fixed date
    time: '13:00',
    position: [BASE_POSITION[0] + 0.009, BASE_POSITION[1] + 0.02], // Fixed position
    categories: ['Community'],
    imageUrl: 'https://picsum.photos/seed/festival/800/400',
    location: 'Old Town, Vilnius',
  },
  {
    id: 24,
    title: 'Volunteer Day at Animal Shelter',
    description: 'Help care for animals in need.',
    date: '2025-11-18', // Fixed date
    time: '09:00',
    position: [BASE_POSITION[0] - 0.006, BASE_POSITION[1] + 0.007], // Fixed position
    categories: ['Community'],
    location: 'VšĮ "Gyvūnų gerovės iniciatyvos", Vilnius',
  },
  {
    id: 25,
    title: 'Mental Wellness Workshop',
    description: 'Learn techniques for stress reduction and mindfulness.',
    date: '2025-11-19', // Fixed date
    time: '14:00',
    position: [BASE_POSITION[0] + 0.004, BASE_POSITION[1] - 0.018], // Fixed position
    categories: ['Health'],
    imageUrl: 'https://picsum.photos/seed/wellness/800/400',
    location: 'Health and Wellness Center, Vilnius',
  },
  {
    id: 26,
    title: 'Free Health Checkup Camp',
    description: 'Get basic health checkups and consultations.',
    date: '2025-11-20', // Fixed date
    time: '10:00',
    position: [BASE_POSITION[0] - 0.01, BASE_POSITION[1] + 0.016], // Fixed position
    categories: ['Health', 'Community'],
    location: 'Vilnius City Polyclinic, Pylimo g. 3, Vilnius',
  },
  {
    id: 27,
    title: 'Entrepreneurship Forum',
    description: 'Networking event for entrepreneurs and investors.',
    date: '2025-11-21', // Fixed date
    time: '17:00',
    position: [BASE_POSITION[0] + 0.013, BASE_POSITION[1] - 0.003], // Fixed position
    categories: ['Business'],
    imageUrl: 'https://picsum.photos/seed/entrepreneurship/800/400',
    location: 'Lietuvos parodų ir kongresų centras LITEXPO, Laisvės pr. 5, Vilnius',
  },
  {
    id: 28,
    title: 'Digital Marketing Masterclass',
    description: 'Advanced strategies for digital marketing.',
    date: '2025-11-22', // Fixed date
    time: '13:00',
    position: [BASE_POSITION[0] - 0.002, BASE_POSITION[1] - 0.01], // Fixed position
    categories: ['Business', 'Education'],
    location: 'ISM University of Management and Economics, Arklių g. 18, Vilnius',
  },
  {
    id: 29,
    title: 'Science Fair for Kids',
    description: 'Interactive science experiments and exhibits for children.',
    date: '2025-11-23', // Fixed date
    time: '10:00',
    position: [BASE_POSITION[0] + 0.007, BASE_POSITION[1] + 0.006], // Fixed position
    categories: ['Science', 'Education'],
    imageUrl: 'https://picsum.photos/seed/sciencefair/800/400',
    location: 'National Museum of Lithuania, Arsenalo g. 3, Vilnius',
  },
  {
    id: 30,
    title: 'Astrophotography Workshop',
    description: 'Learn to capture stunning images of the night sky.',
    date: '2025-11-24', // Fixed date
    time: '20:00',
    position: [BASE_POSITION[0] - 0.016, BASE_POSITION[1] + 0.011], // Fixed position
    categories: ['Science', 'Art'],
    imageUrl: 'https://picsum.photos/seed/astrophotography/800/400',
    location: 'Vilnius University Astronomical Observatory, M. K. Čiurlionio g. 29, Vilnius',
  },
];
