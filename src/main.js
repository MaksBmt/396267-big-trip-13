
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
import {renderElement} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import {replace} from "./utils/render.js";
// import {getSorting} from "./utils/common.js";

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

renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);

renderElement(headerTitle[1], new FilterEvents(), RenderPosition.AFTEREND);

const containerContent = document.querySelector(`.trip-events`);

if (POINT_COUNT === 0) {
  renderElement(containerContent, new NoPoint(), RenderPosition.BEFOREEND);
} else {

  renderElement(headerMain, new Information(informationCity), RenderPosition.AFTERBEGIN);

  const headerInformation = headerMain.querySelector(`.trip-info`);

  renderElement(headerInformation, new PriceTotal(totalPrice), RenderPosition.BEFOREEND);

  const listContent = new EventList();
  renderElement(containerContent, listContent, RenderPosition.BEFOREEND);

  points.map((point) => {
    point.interval = (point.dateEnd).diff(point.dueDate);
  });

  const renderPoint = (listElement, point) => {
    const formEvent = new FormEvent(point);
    const itemEvent = new EventItem(point);

    const replaceCardToForm = () => {
      replace(formEvent, itemEvent);
    };

    const replaceFormToCard = () => {
      replace(itemEvent, formEvent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    itemEvent.setPointClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const itemFavorite = itemEvent.getElement().querySelector(`.event__favorite-btn`);
    itemEvent.setFavoriteClickHandler(() => {
      point.isFavorite = !point.isFavorite;

      if (itemFavorite.classList.contains(`event__favorite-btn--active`)) {
        itemFavorite.classList.remove(`event__favorite-btn--active`);
      } else {
        itemFavorite.classList.add(`event__favorite-btn--active`);
      }
    });

    formEvent.setEditSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    formEvent.setEditClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(listElement, itemEvent, RenderPosition.BEFOREEND);
  };

  const initRenderPoint = () => {
    for (const point of points) {
      renderPoint(listContent, point);
    }
  };

  const replacePoints = () => {
    listContent.getElement().remove();
    listContent.removeElement();

    renderElement(containerContent, listContent, RenderPosition.BEFOREEND);
    initRenderPoint();
  };

  const titleEventSection = containerContent.querySelector(`h2`);

  const renderFilterSort = () => {
    const filterSort = new FilterSort();

    filterSort.setSortPriceClickHandler(() => {
      points.sort((a, b) => b.price - a.price);
      replacePoints();
    });

    // points.map((point) => {
    //   point.interval = (point.dateEnd).diff(point.dueDate);
    // });


    filterSort.setSortTimeClickHandler(() => {
      points.sort((a, b) => b.interval - a.interval);
      replacePoints();
    });

    renderElement(titleEventSection, filterSort, RenderPosition.AFTEREND);
  };
  initRenderPoint();
  renderFilterSort();
}
