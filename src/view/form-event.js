import {CITIES} from "../const.js";
import {TYPES} from "../const.js";
import {filterOffers, citiesData, generateId} from "../mock/point.js";
import Smart from "./smart.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export const BLANK_POINT = {
  id: generateId(),
  type: TYPES[0],
  city: ``,
  destination: {
    descriptions: ``,
    srcImg: ``,
  },
  offers: [
    {
      name: `Add luggage`,
      price: 30,
      type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`],
      isChecked: false,
    },
    {
      name: `Switch to comfort`,
      price: 45,
      type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`],
      isChecked: false,
    },
    {
      name: `Add breakfast`,
      price: 25,
      type: [`Taxi`, `Bus`, `Train`, `Ship`, ` Transport`, `Drive`, `Flight`],
      isChecked: false,
    }
  ],
  price: ``,
  isFavorite: false,
  dueDate: dayjs(),
  dateEnd: dayjs(),
};

const createListDestination = () => {
  return (`<datalist id="destination-list-1"> 
 ${CITIES.map((city) => `<option value="${city}"></option>`).join(``)}
  </datalist>`
  );
};

const generateIdFromName = (sentence) => sentence.toLowerCase().split(` `).join(`_`);

const layoutOffers = (offers) => {
  return offers.map((offer) => {
    const id = generateIdFromName(offer.name);
    return `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${offer.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${id}-1">
         <span class="event__offer-title">${offer.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
          </label>
              </div>`;
  }).join(``);
};

const createListOffers = (offers) => {
  return (`<section class="event__section  event__section--offers">    
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
         <div class="event__available-offers">
         ${layoutOffers(offers)}
         </div>
      </section>`
  );
};

const createItemsType = () => {
  return TYPES.map((type) => `<div class="event__type-item" >
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
  ).join(``);
};

const createDestinationPhotos = (srcImg) => {
  return srcImg.map((foto) => `<img class="event__photo" src = "${foto}" alt = "Event photo">`).join(``);
};

const createButtonFormEdit = () => {
  return (`<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
</button>`);
};

const hasDestination = (param) => {
  return param !== ``;
};

const hasOffers = (param) => {
  return param.length !== 0;
};

const createDestinationSection = (descriptions, srcImg) => {
  return `<section class="event__section  event__section--destination">
             <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${descriptions}</p>

                    <div class="event__photos-container">
                     <div class="event__photos-tape">
                ${createDestinationPhotos(srcImg)}
                     </div>
                    </div>
           </section>`;
};

const createFormEvent = (data, isNewPoint) => {
  const {type, city, price, offers, destination: {descriptions, srcImg}, dueDate, dateEnd, isDueDate
  } = data;

  const sectionDestination = hasDestination(city)
    ? createDestinationSection(descriptions, srcImg)
    : ``;

  const sectionOffers = hasOffers(offers)
    ? createListOffers(offers)
    : ``;

  const isSubmitDisabled = isDueDate && dueDate === null;

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                     ${createItemsType(TYPES)}

              </fieldset>
            </div>
        </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1" required>
              ${createListDestination(CITIES)}
        </div>
            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${isNewPoint ? dueDate.format(`YY/MM/DD hh:mm`) : dueDate.format(`YY/MM/DD hh:mm`)}">
                &mdash;
         <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${isNewPoint ? dateEnd.format(`YY/MM/DD hh:mm`) : dateEnd.format(`YY/MM/DD hh:mm`)}">
        </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                         &euro;
          </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" required>
        </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  ${isNewPoint ? `` : createButtonFormEdit()}
     </header>
                <section class="event__details">

                  ${sectionOffers}
                 
                  ${sectionDestination}
                </section>
   </form>
</li>`);
};

export default class FormEvent extends Smart {
  constructor(point = BLANK_POINT, isNewPoint) {
    super();
    this._isNewPoint = isNewPoint;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._data = FormEvent.parsePointToData(point);

    this._editFormClickHandler = this._editFormClickHandler.bind(this);
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeClickHandler = this._typeChangeClickHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(item) {
    this.updateData(FormEvent.parsePointToData(item));
  }

  getTemplate() {
    return createFormEvent(this._data, this._isNewPoint);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditSubmitHandler(this._callback.editFormSubmit);
    this.setEditClickHandler(this._callback.editFormClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setEditSubmitHandler(callback) {
    this._callback.editFormSubmit = callback;

    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._editFormSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editFormClick = callback;
    if (!this._isNewPoint) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editFormClickHandler);
    }
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setDatepicker(datepicker, element, dataDatepicker, handler) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }

    if (dataDatepicker) {
      datepicker = flatpickr(element, {
        dateFormat: `d/m/y H:i`,
        enableTime: true,
        onChange: handler
      });
    }
  }

  _setStartDatepicker() {
    const inputDateOne = this.getElement().querySelector(`.event__input--time[name = event-start-time]`);
    this._setDatepicker(this._startDatepicker, inputDateOne, this._data.dueDate, this._startDateChangeHandler);
  }

  _setEndDatepicker() {
    const inputDateSecond = this.getElement().querySelector(`.event__input--time[name = event-end-time]`);
    this._setDatepicker(this._endDatepicker, inputDateSecond, this._data.dateEnd, this._endDateChangeHandler);
  }


  _validateCity(cityValue) {
    if (cityValue.match(/[a-z]/ig) === null) {
      return `Пора взяться за ум и начать писать правильно!`;
    }

    if (cityValue.match(/[a-z\s-]/ig).length !== cityValue.length) {
      return `Чувак, надо писать город, а не номер телефона соседки!`;
    }

    if (!CITIES.includes(cityValue)) {
      return `Лучше выбрать из списка - доберешься быстрее`;
    }

    return ``;
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`click`, this._typeChangeClickHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._cityInputHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);

    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  _editFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormClick(FormEvent.parseDataToPoint(this._data));
  }

  _editFormSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.editFormSubmit(FormEvent.parseDataToPoint(this._data));
  }

  _typeChangeClickHandler(evt) {
    evt.preventDefault();
    const typeUpdate = this.getElement().querySelector(`.event__type-output`).textContent = this.getElement().querySelector(`#${evt.target.htmlFor}`).value;
    this.updateData({
      type: typeUpdate,
      offers: filterOffers(typeUpdate),
    });
  }

  _cityInputHandler(evt) {
    evt.preventDefault();

    const cityTargetValue = evt.target.value.trim();
    const validationMessage = this._validateCity(cityTargetValue);

    evt.target.setCustomValidity(validationMessage);

    if (validationMessage === ``) {
      const destinationCity = citiesData.find((item) => (item.name === cityTargetValue));

      if (destinationCity) {
        this.updateData({
          city: destinationCity.name,
          destination: {
            descriptions: destinationCity.description,
            srcImg: destinationCity.photos,
          },
        });
      }
    }

    evt.target.reportValidity();
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      price: evt.target.value,
    }, true);
  }


  _startDateChangeHandler([userDate]) {
    this.updateData({
      dueDate: dayjs(userDate)
    }, true);
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dateEnd: dayjs(userDate)
    }, true);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEvent.parseDataToPoint(this._data));
  }

  static parsePointToData(point) {
    return Object.assign({}, point, {
      type: point.type,
      offers: point.offers,
      city: point.city,
      descriptions: point.destination.descriptions,
      srcImg: point.destination.srcImg,
      price: point.price,
      dueDate: point.dueDate,
      dateEnd: point.dateEnd,
      isDueDate: point.dueDate !== null,
    });
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isDueDate) {
      data.dueDate = null;
    }

    delete data.isDueDate;

    return data;
  }
}

