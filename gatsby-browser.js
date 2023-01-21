import React from 'react';
import { CartProvider } from './src/components/cart/CartContext';

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>;
};
