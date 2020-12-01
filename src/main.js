
import Information from "./view/information.js";
import PriceTotal from "./view/price-total.js";
import HeaderMenu from "./view/header-menu.js";
import FilterEvents from "./view/filter-events.js";
import FilterSort from "./view/filter-sort.js";
// import {createEventListTemplate} from "./view/event-list.js";
import EventList from "./view/event-list.js";
import {createFormEvent} from "./view/form-event.js";
import {createEventItem} from "./view/event-item.js";
import {generatePoint} from "./mock/point.js";
import {renderHtml, renderElement} from "./utils.js";
import {RenderPosition} from "./utils.js";

const POINT_COUNT = 5;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const header = document.querySelector(`.page-header`);
export const headerMain = header.querySelector(`.trip-main`);
const pointPrice = points.map((point) => point.price);


const sumCheckOfferPrice = (offers) => {
  const offersPrice = [];
  if (offers.length > 0) {
    for (const offer of offers) {
      if (offer.isChecked) {
        offersPrice.push(offer.price);
      }
    }
  }

  return offersPrice.reduce((sum, current) => sum + current, 0);
};

const totalPriceOffersCheck = points.map((point) => sumCheckOfferPrice(point.offers)).reduce((sum, current) => sum + current, 0);
const totalPrice = pointPrice.reduce((sum, current) => sum + current, 0) + totalPriceOffersCheck;

const informationCity = points.map((point) => point.city);

// renderHtml(headerMain, createInformationTemplate(informationCity), `afterbegin`);
renderElement(headerMain, new Information(informationCity).getElement(), RenderPosition.AFTERBEGIN);
// new Information(informationCity).getElement();

export const headerInformation = headerMain.querySelector(`.trip-info`);
new PriceTotal(totalPrice).getElement();
// renderHtml(headerInformation, createPriceTotalTemplate(totalPrice), `beforeend`);

const headerControl = headerMain.querySelector(`.trip-controls`);
export const headerTitle = headerControl.querySelectorAll(`h2`);

// renderHtml(headerTitle[0], createHeaderMenuTemplate(), `afterend`);
// renderElement(headerControl, new HeaderMenu().getElement(), RenderPosition.AFTERBEGIN);
// renderElement(headerTitle[0], new HeaderMenu().getElement(), RenderPosition.AFTEREND);
new HeaderMenu().getElement();

// renderHtml(headerTitle[1], createFilterEventsTemplate(), `afterend`);
new FilterEvents().getElement();

export const containerContent = document.querySelector(`.trip-events`);
new FilterSort().getElement();

new EventList().getElement();
// renderElement(containerContent, new FilterSort().getElement(), RenderPosition.BEFOREEND);
// renderHtml(container, createFilterSortTemplate(), `beforeend`);

// renderHtml(containerContent, createEventListTemplate(), `beforeend`);
// renderElement(containerContent, new EventList().getElement(), RenderPosition.BEFOREEND);

const eventList = containerContent.querySelector(`.trip-events__list`);
renderHtml(eventList, createFormEvent(points[0]), `beforeend`);

for (const point of points) {
  renderHtml(eventList, createEventItem(point), `beforeend`);
}

