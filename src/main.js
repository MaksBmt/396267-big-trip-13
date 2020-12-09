
import Information from "./view/information.js";
import PriceTotal from "./view/price-total.js";
import HeaderMenu from "./view/header-menu.js";
import FilterEvents from "./view/filter-events.js";
import Travel from "./presenter/travel.js";
import {generatePoint} from "./mock/point.js";
import {renderElement} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";

const POINT_COUNT = 6;

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

const travel = new Travel(containerContent);

if (POINT_COUNT === 0) {
  travel.init(points);
} else {

  renderElement(headerMain, new Information(informationCity), RenderPosition.AFTERBEGIN);

  const headerInformation = headerMain.querySelector(`.trip-info`);

  renderElement(headerInformation, new PriceTotal(totalPrice), RenderPosition.BEFOREEND);

  travel.init(points);

}
