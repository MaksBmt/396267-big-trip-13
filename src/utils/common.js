import dayjs from "dayjs";

export const defaultSortPoints = (pointA, pointB) => +dayjs(pointA.dueDate) - +dayjs(pointB.dueDate);

export const priceSortPoints = (pointA, pointB) => pointB.price - pointA.price;

export const intervalSortPoints = (pointA, pointB) => pointB.dateEnd.diff(pointB.dueDate) - pointA.dateEnd.diff(pointA.dueDate);

export const isFuture = (dueDate) => +dayjs(dueDate) > +dayjs();

export const isPast = (dateEnd) => +dayjs(dateEnd) < +dayjs();

export const isOnline = () => window.navigator.onLine;

