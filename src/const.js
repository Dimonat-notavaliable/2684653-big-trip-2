const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = [
  {
    name: 'Amsterdam',
    description: 'Amsterdam description',
    photos: ['1.jpg', '2.jpg']
  },
  {
    name: 'Geneva',
    description: 'Geneva description',
    photos: ['3.jpg', '4.jpg']
  },
  {
    name: 'Chamonix',
    description: 'Chamonix description',
    photos: ['5.jpg']
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

export {EVENT_TYPES, DESTINATIONS, OFFERS};
