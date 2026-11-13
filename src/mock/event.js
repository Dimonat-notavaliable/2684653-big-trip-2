import { getRandomArrayElement } from '../utils.js';

const DESTINATIONS = [
  {
    id: 1,
    description: 'Amsterdam description',
    name: 'Amsterdam',
    pictures: [
      {
        src: '1.jpg',
        description: 'Event picture'
      },
      {
        src: '2.jpg',
        description: 'Event picture'
      }
    ]
  },
  {
    id: 2,
    description: 'Geneva description',
    name: 'Geneva',
    pictures: [
      {
        src: '3.jpg',
        description: 'Event picture'
      },
      {
        src: '4.jpg',
        description: 'Event picture'
      }
    ]
  },
  {
    id: 3,
    description: 'Chamonix description',
    name: 'Chamonix',
    pictures: [
      {
        src: '5.jpg',
        description: 'Event picture'
      }
    ]
  }
];

const OFFERS = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
      {
        id: 5,
        title: 'Travel by train',
        price: 40
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 30
      }
    ]
  }
];

const destinationIds = DESTINATIONS.map((val) => val.id);

const mockEvents = [
  {
    basePrice: 160,
    dateFrom: '2019-03-18T09:30',
    dateTo: '2019-03-18T10:30',
    destination: getRandomArrayElement(destinationIds),
    isFavorite: false,
    offers: [1, 2, 3],
    type: 'flight'
  },
  {
    basePrice: 90,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: getRandomArrayElement(destinationIds),
    isFavorite: true,
    offers: [1],
    type: 'sightseeing'
  },
  {
    basePrice: 5,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: getRandomArrayElement(destinationIds),
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: getRandomArrayElement(destinationIds),
    isFavorite: true,
    offers: [],
    type: 'train'
  },
];

const getEventPossibleOffers = (event) => {
  const filtered = OFFERS.find(({type}) => type === event.type);
  if (filtered) {
    return filtered['offers'];
  }
  return [];
};
const getEventSelectedOffers = (event) => getEventPossibleOffers(event).filter(({id}) => event.offers.indexOf(id) !== -1);

const getEventDestination = (event) => DESTINATIONS.find(({id}) => id === event.destination);

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent, getEventPossibleOffers, getEventSelectedOffers, getEventDestination};
