import {createElement, renderHtml} from "../utils.js";
import {containerContent} from "../main.js";

const createEventListTemplate = () => {
  return `
  <ul class="trip-events__list">   
  </ul>`;
};

export default class EventList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this._element) {
      // this._element = createElement(this.getTemplate());
      this._element = renderHtml(containerContent, this.getTemplate(), `beforeend`);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

