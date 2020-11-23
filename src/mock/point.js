const Price = {
  MIN: 20,
  MAX: 250,
};

const CITYS = [`Sofia`, `Burgas`, `Blagoevgrad`, `Razlog`, `Primorsko`];

const OFFERS = [
  {
    name: `Rent a car`,
    price: 75,
    type: [`Sightseeing`, `Restaurant`, `Train`]
  },
  {
    name: `Order Uber`,
    price: 50,
    type: [`Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
  {
    name: `Add luggage`,
    price: 30,
    type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
  {
    name: `Switch to comfort`,
    price: 45,
    type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
  {
    name: `Add breakfast`,
    price: 25,
    type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
  {
    name: `Book tickets`,
    price: 10,
    type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
  {
    name: `Lunch in city`,
    price: 25,
    type: [`Transport`, `Drive`]
  },
  {
    name: `Add meal`,
    price: 28,
    type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
  },
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffle = (gang) => {
  for (let i = gang.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gang[i], gang[j]] = [gang[j], gang[i]];
  }
  return gang;
};

const generationTypes = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
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
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {CITYS};
