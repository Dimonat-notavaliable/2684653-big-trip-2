import {filter} from '../utils/filter.js';

const generateFilter = (tasks) => Object.entries(filter).map(
  ([filterType, filterFunc]) => ({
    type: filterType,
    isActive: filterFunc(tasks).length > 0
  })
);

export {generateFilter};
