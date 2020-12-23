import {FilterType} from "../const";
import {isFuture, isPast} from "../mock/point";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateEnd)),
};
