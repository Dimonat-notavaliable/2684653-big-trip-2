import { getRandomArrayElement } from '../utils.js';
import { DESTINATIONS } from '../const.js';

const mockEvents = [
  {
    eventType: 'flight',
    timeStart: new Date(2019, 3, 19, 0, 0, 0),
    timeEnd: new Date(2019, 3, 19, 0, 0, 0),
    price: 160,
    destination: getRandomArrayElement(DESTINATIONS),
    offers: [1, 2, 3],
    isFavorite: false
  },
  {
    eventType: 'sightseeing',
    timeStart: new Date(2019, 3, 19, 0, 0, 0),
    timeEnd: new Date(2019, 3, 19, 0, 0, 0),
    price: 90,
    destination: getRandomArrayElement(DESTINATIONS),
    offers: [1],
    isFavorite: false
  },
  {
    eventType: 'bus',
    timeStart: new Date(2019, 3, 19, 0, 0, 0),
    timeEnd: new Date(2019, 3, 19, 0, 0, 0),
    price: 5,
    destination: getRandomArrayElement(DESTINATIONS),
    offers: [],
    isFavorite: false
  },
  {
    eventType: 'train',
    timeStart: new Date(2019, 3, 19, 0, 0, 0),
    timeEnd: new Date(2019, 3, 19, 0, 0, 0),
    price: 20,
    destination: getRandomArrayElement(DESTINATIONS),
    offers: [],
    isFavorite: false
  },
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
