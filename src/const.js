import dayjs from "dayjs";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
};

export const SortType = {
  DEFAULT: `default`,
  INTERVAL: `interval`,
  PRICE: `price`
};

export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};


export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

export const TimeCount = {
  HOUR: 3600000,
  DAY: 86400000,
};

export const StoreOption = {
  OFFERS: `offers`,
  DESTINATIONS: `destinations`
};

export const BLANK_POINT = {
  type: TYPES[0],
  city: ``,
  destination: {
    descriptions: ``,
    srcImg: [],
  },
  price: ``,
  offers: [
    {title: `Upgrade to a business class`, price: 190, isChecked: false},
    {title: `Choose the radio station`, price: 30, isChecked: false},
    {title: `Choose temperature`, price: 170, isChecked: false},
    {title: `Drive quickly, I'm in a hurry`, price: 100, isChecked: false},
    {title: `Drive slowly`, price: 110, isChecked: false}
  ],
  isFavorite: false,
  dueDate: dayjs(),
  dateEnd: dayjs(),
};

export const ActiveFilter = {
  TABLE: false,
  STATS: true
};
