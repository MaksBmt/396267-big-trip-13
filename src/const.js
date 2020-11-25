export const Price = {
  MIN: 20,
  MAX: 250,
};

export const LengthDescription = {
  MIN: 1,
  MAX: 5,
};

export const LengthFoto = {
  MIN: 0,
  MAX: 5,
};

export const QuantityOffers = {
  MIN: 0,
  MAX: 5,
};

export const SumPriceOffers = {
  MIN: 0,
  MAX: 2,
};

export const CITIES = [`Sofia`, `Burgas`, `Blagoevgrad`, `Razlog`, `Primorsko`];

export const DESCRIPTIONSLOREM = [
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

export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const OFFERS = [
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
