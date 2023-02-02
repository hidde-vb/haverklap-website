import React, { useContext, useState } from 'react';
import PrimaryButton from '../primary-button';
import { CartContext } from './cart-context';
import { formatEuro, totalPrice } from './cart-utils';

import styles from './checkout.module.css';

const Checkout = (product) => {
  const state = useContext(CartContext);
  const [messageContent, setMessageContent] = useState('');
  const [buttonState, setButtonState] = useState('init');

  const redirectToCheckout = async (event) => {
    event.preventDefault();

    if (!product) return;

    setButtonState('loading');

    const body = {
      cart: state.products,
      message: messageContent,
    };

    try {
      const res = await fetch(`${process.env.API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      window.location.href = response.url;
    } catch {
      setButtonState('init');
    }
  };

  const totalPrice = formatEuro(totalPrice(state.products));

  return (
    <div className={styles.content}>
      <textarea
        id="message"
        className={styles.messageBox}
        name="message"
        placeholder="Is het een cadeau of heb je opmerkingen? Laat het zeker weten!"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      ></textarea>
      <div className={styles.pricing}>
        <div className={styles.title}>Subtotaal</div>
        <div className={styles.price}>{totalPrice}</div>
        <PrimaryButton state={buttonState} initialText="Afrekenen" finishedText="" disabled={buttonState} onClick={redirectToCheckout} />
      </div>
    </div>
  );
};

export default Checkout;
