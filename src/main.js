import {createInformationTemplate} from "./view/information.js";
import {createPriceTotalTemplate} from "./view/price-total.js";
import {createHeaderMenuTemplate} from "./view/header-menu.js";
import {createFilterEventsTemplate} from "./view/filter-events.js";
import {createFilterSortTemplate} from "./view/filter-sort.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createFormEvent} from "./view/form-event.js";
import {createEventItem} from "./view/event-item.js";
import {generatePoint} from "./mock/point.js";
import {createOffer} from "./view/offer.js";

const POINT_COUNT = 5;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const header = document.querySelector(`.page-header`);
const headerMain = header.querySelector(`.trip-main`);

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pointPrice = points.map((point) => point.price);

const totalPriceOffersCheck = points.map((point) => point.priceOffersCheck).reduce((sum, current) => sum + current, 0);
const totalPrice = pointPrice.reduce((sum, current) => sum + current, 0) + totalPriceOffersCheck;

const informationCity = points.map((point) => point.city);

renderHtml(headerMain, createInformationTemplate(informationCity), `afterbegin`);

const headerInformation = headerMain.querySelector(`.trip-info`);
renderHtml(headerInformation, createPriceTotalTemplate(totalPrice), `beforeend`);

const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);
renderHtml(headerTitle[0], createHeaderMenuTemplate(), `afterend`);

renderHtml(headerTitle[1], createFilterEventsTemplate(), `afterend`);

const container = document.querySelector(`.trip-events`);
renderHtml(container, createFilterSortTemplate(), `beforeend`);

renderHtml(container, createEventListTemplate(), `beforeend`);

const eventList = container.querySelector(`.trip-events__list`);
renderHtml(eventList, createFormEvent(points[0]), `beforeend`);

for (let i = 0; i < POINT_COUNT; i++) {
  renderHtml(eventList, createEventItem(points[i]), `beforeend`);
  const listOffers = eventList.querySelectorAll(`.event__selected-offers`);
  if (points[i].offers.length > 0) {
    for (const offer of points[i].offers) {
      renderHtml(listOffers[i], createOffer(offer), `afterBegin`);
    }
  }
}

