export const createOffers = (offer) => {
  // const {offers: {nameOffer, priceOffers}} = offer;
  return (`
  <li class="event__offer">
  <span class="event__offer-title">${offer.nameOffer}</span>
     &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.priceOffers}</span>
</li>
  `);
};
