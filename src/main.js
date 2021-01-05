
import HeaderMenu from "./view/header-menu.js";
import Button from "./view/button-event.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType} from "./const.js";
import {renderElement} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic **SlvMY$68`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

export const api = new Api(END_POINT, AUTHORIZATION);

export const pointsModel = new PointsModel();

const headerMain = document.querySelector(`.trip-main`);
const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);
// renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(headerTitle[1], filterModel);
filterPresenter.init();

// const buttonEvent = new Button();
// renderElement(headerMain, buttonEvent, RenderPosition.BEFOREEND);

const containerContent = document.querySelector(`.trip-events`);

const travel = new Travel(containerContent, pointsModel, filterModel, api);
travel.init();

api.getEvents()
  .then((points) => {
    const buttonEvent = new Button();
    renderElement(headerMain, buttonEvent, RenderPosition.BEFOREEND);
    pointsModel.set(UpdateType.INIT, points);
    renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);
  })
  .catch(() => {
    pointsModel.set(UpdateType.INIT, []);
    renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);
    const buttonEvent = new Button();
    renderElement(headerMain, buttonEvent, RenderPosition.BEFOREEND);
  });

