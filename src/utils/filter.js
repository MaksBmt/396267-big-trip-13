import {FilterType} from "../const";
import {isFuture, isPast} from "../utils/common.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateEnd)),
};
