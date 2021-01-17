import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  set(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  get() {
    return this._points;
  }

  update(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedPoint = Object.assign({}, event, {
      city: event.destination.name,
      destination: {
        descriptions: event.destination.description,
        srcImg: event.destination.pictures,
      },
      price: event.base_price,
      dueDate: event.date_from !== null ? dayjs(event.date_from) : dayjs(event.date_from),
      dateEnd: event.date_to !== null ? dayjs(event.date_to) : dayjs(event.date_to),
      isFavorite: event.is_favorite,
    });

    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.destination.pictures;
    delete adaptedPoint.destination.description;
    delete adaptedPoint.destination.name;

    return adaptedPoint;
  }

  static adaptToServer(event) {
    const adaptedPoint = Object.assign({}, event, {
      "date_from": new Date(event.dueDate) instanceof Date ? new Date(event.dueDate).toISOString() : null,
      "date_to": new Date(event.dateEnd) instanceof Date ? new Date(event.dateEnd).toISOString() : null,
      "is_favorite": event.isFavorite,
      "base_price": event.price,
      "destination": {
        "name": event.city,
        "description": event.destination.descriptions,
        "pictures": event.destination.srcImg,
      },
      "type": event.type.toLowerCase(),
    });

    delete adaptedPoint.dueDate;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.price;
    delete adaptedPoint.city;
    delete adaptedPoint.descriptions;
    delete adaptedPoint.srcImg;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
