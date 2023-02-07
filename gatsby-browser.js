import React from 'react';
import { CartProvider } from './src/components/cart/cart-context';

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>;
};
