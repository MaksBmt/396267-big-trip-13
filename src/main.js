
import HeaderMenu from "./view/header-menu.js";
import Button from "./view/button-event.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {generatePoint} from "./mock/point.js";
import {renderElement} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";

const POINT_COUNT = 11;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

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

