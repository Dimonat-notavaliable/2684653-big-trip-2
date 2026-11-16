import { eventSort } from '../utils/sort.js';

const generateSort = () => Object.entries(eventSort).map(
  ([sortType, sortFunc]) => ({
    type: sortType,
    isActive: Boolean(sortFunc)
  })
);

export {generateSort};
