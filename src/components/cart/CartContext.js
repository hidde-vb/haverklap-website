import { values } from 'lodash';
import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();
export const cartDispatchContext = createContext();

const initialState = { products: [] };

const addToCart = (products, selected) => {
  const product = products.find((p) => p.id === selected.id);
  let values;
  if (product) {
    if (product.qty < 9) product.qty += 1;
    values = products.filter((p) => p.id !== selected.id);
    values.push(product);
  } else {
    values = [...products, { ...selected, qty: 1 }];
  }

  return values.sort((a, b) => a.name - b.name);
};

const removeFromCart = (products, selected) => {
  const product = products.find((p) => p.id === selected.id);
  const values = products.filter((p) => p.id !== selected.id);

  if (product?.qty > 1) {
    product.qty -= 1;
    values.push(product);
  }

  return values.sort((a, b) => a.name - b.name);
};

/*
 * Formatting of an action:
 *
 * action: {
 *   type: 'ADD_TO_CART',
 *   payload: {
 *     id: 'an-id'
 *     name: 'product-name'
 *     url: 'backlink'
 *     ... more product data for selling the product
 *   }
 * }
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: addToCart(state.products, action.payload),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        products: removeFromCart(state.products, action.payload),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>{children}</cartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
