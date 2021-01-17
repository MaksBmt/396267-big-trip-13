
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
