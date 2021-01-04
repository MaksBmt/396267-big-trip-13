

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

export const MaxDaysGap = 148;

export const AddInterval = {
  MIN: 60,
  MAX: 300,
};

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

//

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
