import {createElement} from "../utils.js";

const correctsListCities = (cities) => {
  const listCities = [];
  listCities.push(cities.shift());
  listCities.push(cities.pop());
  return listCities.join(` &mdash; ...  &mdash; `);
};


const createInformationTemplate = (informationCity) => {

  const infoCity = informationCity.length < 3
    ? informationCity.join(` &mdash; `)
    : correctsListCities(informationCity);
  return (`
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${infoCity}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>
    `);
};

export default class Information {
  constructor(informationCity) {
    this._element = null;
    this.informationCity = informationCity;
  }

  getTemplate() {
    return createInformationTemplate(this.informationCity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.informationCity));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

