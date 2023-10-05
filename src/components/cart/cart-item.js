import React from 'react';

import * as styles from './cart-item.module.css';
import { formatEuro } from './cart-utils';

const QuantityButton = ({ text, onClick }) => (
  <div onClick={onClick} role="button" tabIndex="0" className={styles.quantityButton}>
    {text}
  </div>
);

const CartItem = ({ product, increase, decrease }) => {
  const price = formatEuro(product.price * product.quantity);

  return (
    <div className={styles.container}>
      <a className={styles.link} href={product.backlink} rel="noreferrer" target="_blank">
        <div className={styles.content}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.quantity}>
            <QuantityButton text="-" onClick={() => decrease(product.id)} />
            <div className={styles.quantityText}>{product.quantity}</div>
            <QuantityButton text="+" onClick={() => increase(product.id)} />
          </div>
          <div>{price}</div>
        </div>
      </a>
    </div>
  );
};

export default CartItem;
