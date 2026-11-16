const getOfferSlug = (offer) => {
  const splittedOffer = offer.split(' ');
  return splittedOffer[splittedOffer.length - 1];
};

const getTypeOffers = (eventType, offers) => {
  const filtered = offers.find(({type}) => type === eventType);
  if (filtered) {
    return filtered['offers'];
  }
  return [];
};

export {getOfferSlug, getTypeOffers};
