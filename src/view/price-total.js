export const creationPriceTotalTemplate = (pointPrice) => {
  const totalPrice = pointPrice.reduce((sum, current) => sum + current, 0);
  return (`
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
   </p>
  `);
};
