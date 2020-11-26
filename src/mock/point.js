import {CITIES, SumPriceOffers, TYPES, OFFERS, DESCRIPTIONS, Price, LengthFoto, LengthDescription} from "../const.js";
import {getRandomInteger, shuffle} from "../utils.js";
import dayjs from "dayjs";

const generateTypes = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const generateCities = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(1, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};
console.log('data ', generateDate())

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const randomLength = getRandomInteger(LengthDescription.MIN, LengthDescription.MAX);
  const randomDescriptions = [];
  for (let i = 1; i <= randomLength; i++) {
    randomDescriptions.push(DESCRIPTIONS[randomIndex]);
  }
  return randomDescriptions;
};

const generateSrc = () => {
  const pictures = [];

  const randomLength = getRandomInteger(LengthFoto.MIN, LengthFoto.MAX);
  for (let i = 1; i <= randomLength; i++) {
    pictures.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return pictures;
};

const filterOffers = (type) => {
  return OFFERS.filter((offer) => offer.type.includes(type));
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

export const generatePoint = () => {
  const resultGenerateType = generateTypes();
  const resultGenerateOffer = filterOffers(resultGenerateType);
  return {
    type: resultGenerateType,
    city: generateCities(),
    destination: {
      descriptions: generateDescription(),
      srcImg: generateSrc(),
    },
    offers: resultGenerateOffer,
    price: Math.round(getRandomInteger(Price.MIN, Price.MAX)),
    priceOffersCheck: sumRandomOfferPrice(resultGenerateOffer),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    dueDate: generateDate(),
  };
};

