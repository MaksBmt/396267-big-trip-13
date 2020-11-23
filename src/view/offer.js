export const creationOffer = ({name, price}) => {

  return (`
  <li class="event__offer">
  <span class="event__offer-title">${name}</span>
     &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
</li>
  `);
};
