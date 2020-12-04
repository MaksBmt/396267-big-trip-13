
import Information from "./view/information.js";
import PriceTotal from "./view/price-total.js";
import HeaderMenu from "./view/header-menu.js";
import FilterEvents from "./view/filter-events.js";
import FilterSort from "./view/filter-sort.js";
import EventList from "./view/event-list.js";
import FormEvent from "./view/form-event.js";
import EventItem from "./view/event-item.js";
import NoPoint from "./view/no-point.js";
import {generatePoint} from "./mock/point.js";
import {renderElement} from "./utils.js";
import {RenderPosition} from "./utils.js";

const POINT_COUNT = 5;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const header = document.querySelector(`.page-header`);
const headerMain = header.querySelector(`.trip-main`);
const pointPrice = points.map((point) => point.price);


const sumCheckOfferPrice = (offers) => {

  const offersPrice = offers
    .filter((offer) => offer.isChecked)
    .map((offer) => offer.price);

  return offersPrice.reduce((sum, current) => sum + current, 0);
};

const totalPriceOffersCheck = points.map((point) => sumCheckOfferPrice(point.offers)).reduce((sum, current) => sum + current, 0);
const totalPrice = pointPrice.reduce((sum, current) => sum + current, 0) + totalPriceOffersCheck;

const informationCity = points.map((point) => point.city);

const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);

renderElement(headerTitle[0], new HeaderMenu().getElement(), RenderPosition.AFTEREND);

renderElement(headerTitle[1], new FilterEvents().getElement(), RenderPosition.AFTEREND);

const containerContent = document.querySelector(`.trip-events`);

if (POINT_COUNT === 0) {
  renderElement(containerContent, new NoPoint().getElement(), RenderPosition.BEFOREEND);
} else {

  renderElement(headerMain, new Information(informationCity).getElement(), RenderPosition.AFTERBEGIN);

  const headerInformation = headerMain.querySelector(`.trip-info`);

  renderElement(headerInformation, new PriceTotal(totalPrice).getElement(), RenderPosition.BEFOREEND);


  renderElement(containerContent, new FilterSort().getElement(), RenderPosition.BEFOREEND);

  const listContent = new EventList();
  renderElement(containerContent, listContent.getElement(), RenderPosition.BEFOREEND);

  const renderPoint = (listElement, point) => {
    const formEvent = new FormEvent(point);
    const itemEvent = new EventItem(point);

    const replaceCardToForm = () => {
      listElement.replaceChild(formEvent.getElement(), itemEvent.getElement());
    };

    const replaceFormToCard = () => {
      listElement.replaceChild(itemEvent.getElement(), formEvent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    itemEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    formEvent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    formEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceFormToCard();
    });

    renderElement(listElement, itemEvent.getElement(), RenderPosition.BEFOREEND);
  };

  for (const point of points) {
    renderPoint(listContent.getElement(), point);
  }
}
