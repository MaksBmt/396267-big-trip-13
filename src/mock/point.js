const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generationTypes = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generationCitys = () => {
  const citys = [`Sofia`, `Burgas`, `Blagoevgrad`, `Razlog`, `Primorsko`];

  const randomIndex = getRandomInteger(0, citys.length - 1);
  return citys[randomIndex];
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

const generationOffers = () => {
  const offersLorem = [
    {
      nameOffer: `Rent a car`,
      priceOffers: getRandomInteger(20, 120),
      typeOffers: [`Sightseeing`, `Restaurant`, `Train`]
    },
    {
      nameOffer: `Order Uber`,
      priceOffers: getRandomInteger(10, 90),
      typeOffers: [`Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
    {
      nameOffer: `Add luggage`,
      priceOffers: getRandomInteger(5, 50),
      typeOffers: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
    {
      nameOffer: `Switch to comfort`,
      priceOffers: getRandomInteger(20, 120),
      typeOffers: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
    {
      nameOffer: `Add breakfast`,
      priceOffers: getRandomInteger(10, 40),
      typeOffers: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
    {
      nameOffer: `Book tickets`,
      priceOffers: getRandomInteger(5, 30),
      typeOffers: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
    {
      nameOffer: `Lunch in city`,
      priceOffers: getRandomInteger(10, 50),
      typeOffers: [`Transport`, `Drive`]
    },
    {
      nameOffer: `Add meal`,
      priceOffers: getRandomInteger(10, 40),
      typeOffers: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`]
    },
  ];
  const randomLength = getRandomInteger(0, 5);
  const offers = [];

  for (let i = 1; i <= randomLength; i++) {
    const randomIndex = getRandomInteger(0, offersLorem.length - 1);
    offers.push(offersLorem[randomIndex]);
  }
  return offers;
};

const filterOffers = (type) => {
  const tempNameOffers = [];
  const used = {};
  for (const p of generationOffers()) {
    if (p.typeOffers.find((t) => t === type)) {
      tempNameOffers.push(p);
    }
  }

  const filtered = tempNameOffers.filter(function (obj) {
    return obj.nameOffer in used ? 0 : (used[obj] = 1);

  });

  return filtered;
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
    price: Math.round(getRandomInteger(20, 250)),
    offers: filterOffers(resultGenerationType),
  };
};

