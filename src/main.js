
import HeaderMenu from "./view/header-menu.js";
import Button from "./view/button-event.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {generatePoint} from "./mock/point.js";
import {renderElement} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";

const POINT_COUNT = 11;
const AUTHORIZATION = `Basic **SlvMY$68`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const api = new Api(END_POINT, AUTHORIZATION);

api.getEvents().then((events) => {
  console.log(events);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const pointsModel = new PointsModel();
pointsModel.set(points);

const headerMain = document.querySelector(`.trip-main`);
const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);
renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(headerTitle[1], filterModel);
filterPresenter.init();

const buttonEvent = new Button();
renderElement(headerMain, buttonEvent, RenderPosition.BEFOREEND);

const containerContent = document.querySelector(`.trip-events`);

const travel = new Travel(containerContent, pointsModel, filterModel);
travel.init();

