/*
 * Calculate the total price of the cart.
 * When it is more more than 9, it returns 9+
 */
export const amountOfItems = (cart) => {
  const amount = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  if (amount > 9) return '9+';

  return amount.toString();
};

/*
 * Calculate the total price of the cart
 */
export const totalPrice = (cart) => cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);

/*
 * Format stripe prices to a readable format
 */
export const formatEuro = (price) => {
  return new Intl.NumberFormat('nl-BE', {
    currency: 'EUR',
    style: 'currency',
  }).format(price / 100);
};
