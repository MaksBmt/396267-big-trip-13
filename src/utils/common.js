import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const shuffle = (gang) => {
  for (let i = gang.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gang[i], gang[j]] = [gang[j], gang[i]];
  }
  return gang;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const defaultSortPoints = (points) => {
  points.sort((a, b) => +dayjs(a.dueDate) - +dayjs(b.dueDate));
};

export const priceSortPoints = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const intervalSortPoints = (pointA, pointB) => {
  return pointB.dateEnd.diff(pointB.dueDate) - pointA.dateEnd.diff(pointA.dueDate);
};
