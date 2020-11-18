import {createInformationTemplate} from "./view/information.js";

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.page-header`);
const headerMainElement = headerElement.querySelector(`.trip-main`);

renderHtml(headerMainElement, createInformationTemplate(), `afterbegin`);
