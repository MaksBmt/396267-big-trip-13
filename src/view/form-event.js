import {CITIES} from "../const.js";
import {TYPES} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {filterOffers} from "../mock/point.js";
import {AddInterval} from "../const.js";
import Abstract from "./abstract.js";

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

const createFormEvent = (data = {}) => {
  const {type, city, price, offers, destination: {descriptions, srcImg}, dueDate
  } = data;

  const randomMinute = getRandomInteger(AddInterval.MIN, AddInterval.MAX);

  const increasedGap = dueDate.add(randomMinute, `minute`);

  const sectionDestination = hasDestination(city)
    ? createDestinationSection(descriptions, srcImg)
    : ``;

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
              ${createListDestination(CITIES)}
        </div>
            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dueDate.format(`YY/MM/DD hh:mm`)}">
                &mdash;
         <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${increasedGap.format(`YY/MM/DD hh:mm`)}">
        </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                         &euro;
          </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  ${createButtonFormEdit()}
     </header>
                <section class="event__details">

                  ${createListOffers(offers)}
                 
                  ${sectionDestination}
                </section>
   </form>
</li>`);
};

export default class FormEvent extends Abstract {
  constructor(point = {}) {
    super();
    this._point = point;
    this._data = FormEvent.parsePointToData(point);

    this._editFormClickHandler = this._editFormClickHandler.bind(this);
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._typeChangeClickHandler = this._typeChangeClickHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormEvent(this._data);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditSubmitHandler(this._callback.editFormSubmit);
    this.setEditClickHandler(this._callback.editFormClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`click`, this._typeChangeClickHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._cityInputHandler);
  }

  setEditSubmitHandler(callback) {
    this._callback.editFormSubmit = callback;

    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._editFormSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editFormClick = callback;

    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editFormClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign({}, point, {type: point.type, offers: point.offers});
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }

  _editFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.editFormClick(FormEvent.parseDataToPoint(this._point));
  }

  _editFormSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.editFormSubmit(FormEvent.parseDataToPoint(this._data));
    const valueCity = evt.target.querySelector(`.event__input--destination`).value;
    evt.target.querySelector(`.event__input--destination`).setCustomValidity(``);

    const selectionCity = CITIES.find((item) => item === valueCity);

    if (selectionCity === undefined) {
      evt.target.querySelector(`.event__input--destination`).setCustomValidity(`Лучше выбрать из списка - доберешься быстрее`);
    }
    evt.target.querySelector(`.event__input--destination`).setCustomValidity(``);
    evt.target.reportValidity();
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
    // this.updateData({
    //   city: evt.target.value
    // }, true);
    evt.target.setCustomValidity(``);
    if (evt.target.value !== ``) {
      if (evt.target.value.match(/[a-z]/ig) !== null) {
        if (evt.target.value !== (evt.target.value.match(/[a-z]/ig).join(``))) {
          evt.target.setCustomValidity(`Чувак, надо писать город, а не номер телефона соседки!`);
        } else {
          evt.target.setCustomValidity(``);

          this.updateData({
            city: evt.target.value
          }, true);
        }
      } else {
        evt.target.setCustomValidity(`Пора взяться за ум и начать писать правильно!`);
      }
    } else {
      evt.target.setCustomValidity(`Зеро не всегда выигрывает - надо бы заполнить!`);
    }

    this.getElement().querySelector(`form`).reportValidity();
  }
}

