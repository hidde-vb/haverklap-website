import React, { createContext, useEffect, useReducer } from 'react';

const storageKey = 'cart';

export const CartContext = createContext();
export const cartDispatchContext = createContext();

const initialState = {
  products: [],
};

const saveState = (state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
  return state;
};

/* ACTIONS */

const addToCart = (products, selected) => {
  const product = products.find((p) => p.id === selected.id);
  let values;
  if (product) {
    if (product.quantity < 9) product.quantity += 1;
    values = products.filter((p) => p.id !== selected.id);
    values.push(product);
  } else {
    values = [...products, { ...selected, quantity: 1 }];
  }

  return values.sort((a, b) => a.title.localeCompare(b.title));
};

const removeFromCart = (products, selected) => {
  const product = products.find((p) => p.id === selected.id);
  const values = products.filter((p) => p.id !== selected.id);

  if (product?.quantity > 1) {
    product.quantity -= 1;
    values.push(product);
  }

  return values.sort((a, b) => a.title.localeCompare(b.title));
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
    case 'LOAD_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return saveState({
        ...state,
        products: addToCart(state.products, action.payload),
      });
    case 'REMOVE_FROM_CART':
      return saveState({
        ...state,
        products: removeFromCart(state.products, action.payload),
      });
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* load state from localStorage */
  useEffect(() => {
    const loadState = async () => {
      const payload = JSON.parse(localStorage.getItem(storageKey));
      if (payload) {
        dispatch({
          type: 'LOAD_CART',
          payload,
        });
      } else {
        saveState(state);
      }
    };

    loadState();
  }, []);

  return (
    <CartContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>{children}</cartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
