import { SortType } from '../const.js';


const compareEventStart = (eventA, eventB) => new Date(eventB.dateFrom) - new Date(eventA.dateFrom);
const compareEventDuration = (eventA, eventB) => {
  const eventADuration = new Date(eventA.dateTo) - new Date(eventA.dateFrom);
  const eventBDuration = new Date(eventB.dateTo) - new Date(eventB.dateFrom);
  return eventBDuration - eventADuration;
};
const compareEventPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const eventSort = {
  [SortType.DAY]: compareEventStart,
  [SortType.EVENT]: null,
  [SortType.TIME]: compareEventDuration,
  [SortType.PRICE]: compareEventPrice,
  [SortType.OFFER]: null
};

export {eventSort};
