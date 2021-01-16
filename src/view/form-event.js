
import {TYPES} from "../const.js";
import Smart from "./smart.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export const BLANK_POINT = {
  type: TYPES[0],
  city: ``,
  destination: {
    descriptions: ``,
    srcImg: [],
  },
  price: ``,
  offers: [],
  isFavorite: false,
  dueDate: dayjs(),
  dateEnd: dayjs(),
};

const generateIdFromName = (sentence) => sentence.toLowerCase().split(` `).join(`_`);

const createListDestination = (cities) => {
  const citiesList = cities.get();
  return (`<datalist id="destination-list-1"> 
   ${citiesList.map((item) => `<option value="${item.name}"></option>`).join(``)}
    </datalist>`
  );
};

const layoutOffers = (offers) => {
  return offers.map((offer) => {

    const id = generateIdFromName(offer.title);
    return `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${offer.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${id}-1">
         <span class="event__offer-title">${offer.title}</span>
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
  return srcImg.map((foto) => `<img class="event__photo" src = "${foto.src}" alt = "${foto.descriptions}">`).join(``);
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

const createFormEvent = (data, isNewPoint, citiesList) => {
  const {type, city, price, destination, dueDate, dateEnd, offers, isDisabled, isSaving, isDeleting
  } = data;
  const {descriptions, srcImg} = destination;

  const sectionDestination = hasDestination(city)
    ? createDestinationSection(descriptions, srcImg)
    : ``;

  const sectionOffers = hasOffers(offers)
    ? createListOffers(offers)
    : ``;

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
              ${createListDestination(citiesList)}
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

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Deleting...` : `Delete`}</button>
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
  constructor(point = BLANK_POINT, isNewPoint, offersModel, destinationsModel, button) {
    super();
    this._isNewPoint = isNewPoint;
    this._point = point;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._button = button;


    this._data = FormEvent.parsePointToData(this._point);
    this._setStartDatepicker = null;
    this._setEndDatepicker = null;

    this._editFormClickHandler = this._editFormClickHandler.bind(this);
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeClickHandler = this._typeChangeClickHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();
    this._destroyDatepicker();
  }

  reset(item) {
    this.updateData(FormEvent.parsePointToData(item));
  }

  getTemplate() {
    return createFormEvent(this._data, this._isNewPoint, this._destinationsModel);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
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

  _destroyDatepicker() {
    if (this._setStartDatepicker) {
      this._setStartDatepicker.destroy();
      this._setStartDatepicker = null;
    }
    if (this._setEndDatepicker) {
      this._setEndDatepicker.destroy();
      this._setEndDatepicker = null;
    }
  }

  _setDatepicker() {
    this._destroyDatepicker();

    this._setStartDatepicker = flatpickr(this.getInputDateOne(), {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      dateDefault: this._data.dueDate,
      defaultDate: `${this._data.dueDate}`,
      onChange: this._startDateChangeHandler
    });

    this._setEndDatepicker = flatpickr(this.getInputDateSecond(), {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      minDate: `${this._data.dueDate}`,
      dateDefault: this._data.dateEnd,
      defaultDate: `${this._data.dateEnd}`,
      onChange: this._endDateChangeHandler
    });
  }

  getInputDateOne() {
    return this.getElement().querySelector(`.event__input--time[name = event-start-time]`);
  }

  getInputDateSecond() {
    return this.getElement().querySelector(`.event__input--time[name = event-end-time]`);
  }

  _validateCity(cityValue) {
    if (cityValue.match(/[a-z]/ig) === null) {
      return `Пора взяться за ум и начать писать правильно!`;
    }

    if (cityValue.match(/[a-z\s-]/ig).length !== cityValue.length) {
      return `Чувак, надо писать город, а не номер телефона соседки!`;
    }

    if (!this._destinationsModel.getCities().includes(cityValue)) {
      return `Лучше выбрать из списка - доберешься быстрее`;
    }

    return ``;
  }

  _validatePrice(priceValue) {
    return (priceValue <= 0) ? `Число должно быть больше нуля` : ``;
  }

  _validateDate(dateValue) {
    return (dateValue <= 0) ? `Машины времени пока нет - конечная дата должна быть больше начальной` : ``;
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
  }

  _editFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormClick(FormEvent.parseDataToPoint(this._data));
    this._button.enableNewPointButton();
  }

  _editFormSubmitHandler(evt) {
    evt.preventDefault();

    const itemOffers = this._data.offers;
    if (itemOffers) {
      this.getElement()
        .querySelectorAll(`.event__offer-checkbox`)
        .forEach((offer, i) => {
          // offer.checked ? itemOffers[i].isChecked = true : itemOffers[i].isChecked = false;
          if (offer.checked) {
            itemOffers[i].isChecked = true;
          } else {
            itemOffers[i].isChecked = false;
          }
        });
    }

    this._callback.editFormSubmit(FormEvent.parseDataToPoint(this._data));
  }

  _typeChangeClickHandler(evt) {
    evt.preventDefault();
    const typeUpdate = this.getElement().querySelector(`.event__type-output`).textContent = this.getElement().querySelector(`#${evt.target.htmlFor}`).value;

    this.updateData({
      type: typeUpdate,
      offers: this._offersModel.filter(typeUpdate),
    });
  }

  _cityInputHandler(evt) {
    evt.preventDefault();

    const cityTargetValue = evt.target.value.trim();
    const validationMessageCity = this._validateCity(cityTargetValue);

    evt.target.setCustomValidity(validationMessageCity);

    if (validationMessageCity === ``) {
      const destinationCity = this._destinationsModel.get().find((item) => (item.name === cityTargetValue));

      if (destinationCity) {
        this.updateData({
          city: destinationCity.name,
          destination: {
            descriptions: destinationCity.description,
            srcImg: destinationCity.pictures,
          }
        });
      }
    }

    evt.target.reportValidity();
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    const priceTargetValue = +evt.target.value.trim();
    const validationMessagePrice = this._validatePrice(priceTargetValue);
    evt.target.setCustomValidity(validationMessagePrice);

    if (validationMessagePrice === ``) {
      this.updateData({
        price: priceTargetValue
      }, true);
    }
    evt.target.reportValidity();
  }


  _startDateChangeHandler([userDate]) {
    const inputDateOne = this.getInputDateOne();
    inputDateOne.readOnly = false;
    inputDateOne.addEventListener(`input`, () => {
      const differenceDate = this._data.dateEnd.diff(this._data.dueDate);
      const validationMessageDate = this._validateDate(differenceDate);
      this.getInputDateOne().setCustomValidity(validationMessageDate);
      if (validationMessageDate === ``) {
        this.updateData({
          dueDate: dayjs(userDate)
        }, true);
      }
    });

    this.getInputDateOne().reportValidity();
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
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}

