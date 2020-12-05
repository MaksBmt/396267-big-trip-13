import {CITIES, TYPES, OFFERS, DESCRIPTIONS, Price, LengthFoto, LengthDescription, MaxDaysGap, AddInterval} from "../const.js";
import {getRandomInteger, getRandomBoolean} from "../utils/common.js";
import dayjs from "dayjs";

const generateTypes = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const generateCities = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateDate = () => {
  const daysGap = getRandomInteger(1, MaxDaysGap);

  return dayjs().add(daysGap, `h`);
};

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

export const generatePoint = () => {
  const randomMinute = getRandomInteger(AddInterval.MIN, AddInterval.MAX);
  const resultGenerateType = generateTypes();
  const resultGenerateOffer = filterOffers(resultGenerateType);
  const resultGenerateDate = generateDate();
  return {
    type: resultGenerateType,
    city: generateCities(),
    destination: {
      descriptions: generateDescription(),
      srcImg: generateSrc(),
    },
    offers: resultGenerateOffer,
    price: Math.round(getRandomInteger(Price.MIN, Price.MAX)),
    isFavorite: getRandomBoolean(),
    dueDate: resultGenerateDate,
    dateEnd: resultGenerateDate.add(randomMinute, `minute`),
  };
};

