import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Abstract from "./abstract.js";
import {TimeCount} from "../const.js";
import {isOnline} from "../utils/common.js";

dayjs.extend(utc);

const transformFormatTime = (dueDate, dateEnd) => {
  const intervalDate = dateEnd.diff(dueDate);
  const hoursInterval = (dayjs(new Date(intervalDate))).utc();

  let resultIntervalFormat = null;
  if (intervalDate < TimeCount.HOUR) {
    resultIntervalFormat = hoursInterval.format(`mm[M]`);
  } else if (intervalDate >= TimeCount.HOUR && intervalDate < TimeCount.DAY) {
    resultIntervalFormat = hoursInterval.format(`HH[H] mm[M]`);
  } else {
    resultIntervalFormat = hoursInterval.format(`DD[D] HH[H] mm[M]`);
  }

  return resultIntervalFormat;
};

const createResultOffers = (offers) => {
  const offersIsChecked = offers.filter((offer) => typeof offer[`isChecked`]);

  if (offersIsChecked.length !== 0) {
    return offers.filter((offer) => offer.isChecked)
      .map((offer) => `<li  class= "event__offer" > 
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`).join(``);
  }

  return ``;
};

const createEventItem = (point) => {
  const {type, city, price, isFavorite, dueDate, offers, dateEnd} = point;

  const resultOffers = createResultOffers(offers);
  const resultTransfomationTime = transformFormatTime(dueDate, dateEnd);

  const favoriteClassName = isFavorite
    ? `event__favorite-btn  event__favorite-btn--active`
    : `event__favorite-btn`;

  return (`<li class="trip-events__item" >
    <div class="event">
      <time class="event__date" datetime="${dueDate.format(`YYYY-MM-DD`)}">${dueDate.format(`MMM D`)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
        <h3 class="event__title">${type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dueDate.format(`YYYY-MM-DDTHH:mm`)}">${dueDate.format(`HH:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateEnd.format(`YYYY-MM-DDTHH:mm`)}">${dateEnd.format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${resultTransfomationTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
           ${resultOffers}
        </ul>
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div >
            </li>
`);
};

export default class EventItem extends Abstract {
  constructor(point, buttonNewPoint) {
    super();
    this._point = point;
    this._buttonNewPoint = buttonNewPoint;

    this.itemFavorite = this.getElement().querySelector(`.event__favorite-btn`);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventItem(this._point);
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;

    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._pointClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.itemFavorite.addEventListener(`click`, this._favoriteClickHandler);
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();

    if (isOnline()) {
      this._buttonNewPoint.enable();
    } else {
      this._buttonNewPoint.disable();
    }
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
