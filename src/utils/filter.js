import { FilterType } from '../const.js';
import { isPastEvent, isFutureEvent, isPresentEvent } from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event))
};

export {filter};
