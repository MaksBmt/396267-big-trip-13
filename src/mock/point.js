import {CITIES, SumPriceOffers, TYPES, OFFERS, DESCRIPTIONSLOREM, Price, LengthFoto, LengthDescription, QuantityOffers} from "../const.js";
import {getRandomInteger, shuffle} from "../utils.js";

const generationTypes = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generationCities = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generationDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONSLOREM.length - 1);
  const randomLength = getRandomInteger(LengthDescription.MIN, LengthDescription.MAX);
  const descriptions = [];
  for (let i = 1; i <= randomLength; i++) {
    descriptions.push(DESCRIPTIONSLOREM[randomIndex]);
  }
  return descriptions;
};

const generationSrc = () => {
  const pictures = [];

  const randomLength = getRandomInteger(LengthFoto.MIN, LengthFoto.MAX);
  for (let i = 1; i <= randomLength; i++) {
    pictures.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return pictures;
};

const filterOffers = (type) => {
  const offers = OFFERS.filter((offer) => offer.type.includes(type));

  return shuffle(offers.slice())
    .slice(0, getRandomInteger(QuantityOffers.MIN, QuantityOffers.MAX));
};

const filterOffersForm = (type) => {
  return OFFERS.filter((offerForm) => offerForm.type.includes(type));
};

const offersPrice = [];

const sumRandomOfferPrice = (offers) => {
  if (offers.length > 0) {
    for (const offer of offers) {
      offersPrice.push(offer.price);
    }
  }

  return shuffle(offersPrice.slice())
    .slice(0, getRandomInteger(SumPriceOffers.MIN, SumPriceOffers.MAX)).reduce((sum, current) => sum + current, 0);
};

export const generationPoint = () => {
  const resultGenerationType = generationTypes();
  const resultGenerationOffer = filterOffers(resultGenerationType);
  return {
    type: resultGenerationType,
    city: generationCities(),
    destination: {
      descriptions: generationDescription(),
      srcImg: generationSrc(),
    },
    offers: resultGenerationOffer,
    price: Math.round(getRandomInteger(Price.MIN, Price.MAX)) + sumRandomOfferPrice(resultGenerationOffer),
    offersForm: filterOffersForm(resultGenerationType),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

