import {CITYS} from "../const.js";
import {TYPES} from "../const.js";
import {OFFERS} from "../const.js";
import {Price} from "../const.js";
import {getRandomInteger} from "../utils.js";
import {shuffle} from "../utils.js";

const generationTypes = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generationCitys = () => {
  const randomIndex = getRandomInteger(0, CITYS.length - 1);
  return CITYS[randomIndex];
};

const generationDescription = () => {
  const descriptionsLorem = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const randomIndex = getRandomInteger(0, descriptionsLorem.length - 1);
  const randomLength = getRandomInteger(1, 5);
  const descriptions = [];
  for (let i = 1; i <= randomLength; i++) {
    descriptions.push(descriptionsLorem[randomIndex]);
  }
  return descriptions;
};

const generationSrc = () => {
  const pictures = [];

  const randomLength = getRandomInteger(0, 5);
  for (let i = 1; i <= randomLength; i++) {
    pictures.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return pictures;
};

const filterOffers = (type) => {
  const offers = OFFERS.filter((offer) => offer.type.includes(type));

  return shuffle(offers.slice())
    .slice(0, getRandomInteger(0, 5));
};

const filterOffersForm = (type) => {
  return OFFERS.filter((offerForm) => offerForm.type.includes(type));
};

export const generationPoint = () => {
  const resultGenerationType = generationTypes();
  return {
    type: resultGenerationType,
    city: generationCitys(),
    destination: {
      descriptions: generationDescription(),
      srcImg: generationSrc(),
    },
    price: Math.round(getRandomInteger(Price.MIN, Price.MAX)),
    offers: filterOffers(resultGenerationType),
    offersForm: filterOffersForm(resultGenerationType),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
