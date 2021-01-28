import Abstract from "./abstract.js";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

const correctsListCities = (cities) => {
  const listCities = [];
  listCities.push(cities.shift());
  listCities.push(cities.pop());
  return listCities.join(` &mdash; ...  &mdash; `);
};

const createInformationTemplate = (informationCity, dateFinish, dateStart) => {

  const infoCity = informationCity.length < 3
    ? informationCity.join(` &mdash; `)
    : correctsListCities(informationCity);

  return (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${infoCity}</h1>
      <p class="trip-info__dates">${dateStart.utc().format(`MMM D`)}&nbsp;&mdash;&nbsp; ${dateFinish.utc().format(`MMM D`)}</p >
    </div >
  </section>
  `);
};

export default class Information extends Abstract {
  constructor(informationCity, dateEnd, dateStart) {
    super();
    this._informationCity = informationCity;
    this._dateEnd = dateEnd;
    this._dateStart = dateStart;
  }

  getTemplate() {
    return createInformationTemplate(this._informationCity, this._dateEnd, this._dateStart);
  }
}

