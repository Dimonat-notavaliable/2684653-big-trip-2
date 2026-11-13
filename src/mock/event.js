import { getRandomArrayElement } from '../utils.js';

const mockEvents = [
  {
    id: 1,
    basePrice: 160,
    dateFrom: '2019-03-18T09:30',
    dateTo: '2019-03-18T10:30',
    destination: 1,
    isFavorite: false,
    offers: [1, 2, 3],
    type: 'flight'
  },
  {
    id: 2,
    basePrice: 90,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: 2,
    isFavorite: true,
    offers: [1],
    type: 'sightseeing'
  },
  {
    id: 3,
    basePrice: 5,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: 3,
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    id: 4,
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T10:30',
    destination: 1,
    isFavorite: true,
    offers: [],
    type: 'train'
  },
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
