import {creationInformationTemplate} from "./view/information.js";
import {creationPriceTotalTemplate} from "./view/price-total.js";
import {creationHeaderMenuTemplate} from "./view/header-menu.js";
import {creationFilterEventsTemplate} from "./view/filter-events.js";
import {creationFilterSortTemplate} from "./view/filter-sort.js";
import {creationEventListTemplate} from "./view/event-list.js";
import {creationFormEvent} from "./view/form-event.js";
import {creationEventItem} from "./view/event-item.js";
import {generationPoint} from "./mock/point.js";
import {creationOffer} from "./view/offer.js";

const POINT_COUNT = 5;

const points = new Array(POINT_COUNT).fill().map(generationPoint);

const header = document.querySelector(`.page-header`);
const headerMain = header.querySelector(`.trip-main`);

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const informationCity = [];
for (let i = 0; i < POINT_COUNT; i++) {
  informationCity.push(points[i].city);
}
const infoCity = informationCity.join(` &mdash; `);
renderHtml(headerMain, creationInformationTemplate(infoCity), `afterbegin`);

const headerInformation = headerMain.querySelector(`.trip-info`);
renderHtml(headerInformation, creationPriceTotalTemplate(), `beforeend`);

const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);
renderHtml(headerTitle[0], creationHeaderMenuTemplate(), `afterend`);

renderHtml(headerTitle[1], creationFilterEventsTemplate(), `afterend`);

const container = document.querySelector(`.trip-events`);
renderHtml(container, creationFilterSortTemplate(), `beforeend`);

renderHtml(container, creationEventListTemplate(), `beforeend`);

const eventList = container.querySelector(`.trip-events__list`);
renderHtml(eventList, creationFormEvent(points[0]), `beforeend`);

for (let i = 0; i < POINT_COUNT; i++) {
  renderHtml(eventList, creationEventItem(points[i]), `beforeend`);
  const listOffers = eventList.querySelectorAll(`.event__selected-offers`);
  if (points[i].offers.length > 0) {
    for (const offer of points[i].offers) {
      renderHtml(listOffers[i], creationOffer(offer), `afterBegin`);
    }
  }
}
