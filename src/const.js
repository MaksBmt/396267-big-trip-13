export const Price = {
  MIN: 20,
  MAX: 250,
};

export const CITYS = [`Sofia`, `Burgas`, `Blagoevgrad`, `Razlog`, `Primorsko`];

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
