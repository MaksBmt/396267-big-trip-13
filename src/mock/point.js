import {TYPES, OFFERS, DESCRIPTIONS, Price, LengthFoto, LengthDescription, MaxDaysGap, AddInterval} from "../const.js";
import {getRandomInteger, getRandomBoolean} from "../utils/common.js";
import dayjs from "dayjs";

// const generateCities = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

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

const generateTypes = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

export const citiesData = [
  {
    name: `Sofia`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Burgas`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Blagoevgrad`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Razlog`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Primorsko`,
    // description: generateDescription(),
    description: `13`,
    photos: [`img/photos/1.jpg`, `img/photos/2.jpg`, `img/photos/3.jpg`, `img/photos/4.jpg`, `img/photos/5.jpg`],
  },
  {
    name: `Stara Zagora`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Veliko Tarnovo`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Asenovgrad`,
    description: generateDescription(),
    photos: generateSrc(),
  },
  {
    name: `Smolyan`,
    description: generateDescription(),
    photos: generateSrc(),
  },
];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDate = () => {
  const daysGap = getRandomInteger(1, MaxDaysGap);

  return dayjs().add(daysGap, `h`);
};

export const filterOffers = (type) => {
  return OFFERS.filter((offer) => offer.type.includes(type));
};

export const generatePoint = () => {
  const randomMinute = getRandomInteger(AddInterval.MIN, AddInterval.MAX);
  const resultGenerateDate = generateDate();
  const resultGenerateCity = citiesData[getRandomInteger(0, citiesData.length - 1)];
  const resultGenerateType = generateTypes();
  const resultGenerateOffer = filterOffers(resultGenerateType);

  return {
    id: generateId(),
    type: resultGenerateType,
    city: resultGenerateCity.name,
    destination: {
      descriptions: resultGenerateCity.description,
      srcImg: resultGenerateCity.photos,
    },
    offers: resultGenerateOffer,
    price: Math.round(getRandomInteger(Price.MIN, Price.MAX)),
    isFavorite: getRandomBoolean(),
    dueDate: resultGenerateDate,
    dateEnd: resultGenerateDate.add(randomMinute, `minute`),
  };
};
