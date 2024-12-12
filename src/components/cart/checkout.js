import React, { useContext, useState } from 'react';
import PrimaryButton from '../primary-button';
import { CartContext } from './cart-context';
import { formatEuro, totalPrice } from './cart-utils';

import * as styles from './checkout.module.css';

const Checkout = (product) => {
  const cart = useContext(CartContext);
  const [messageContent, setMessageContent] = useState('');
  const [buttonState, setButtonState] = useState('init');
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');

  const redirectToCheckout = async (event) => {
    event.preventDefault();

    if (!product) return;

    setButtonState('loading');
    setError('');

    const body = {
      cart: cart.products,
      message: messageContent,
    };

    try {
      if (coupon) {
        const couponReponse = await fetch(`${process.env.API_URL}/coupon/${coupon}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await couponReponse.json();
        if (json.message === 'ok') {
          body.coupon = coupon;
        } else {
          setError('Onbekende code.');
          throw new Error();
        }
      }

      const redirectReponse = await fetch(`${process.env.API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await redirectReponse.json();
      window.location.href = response.url;
    } catch {
      setButtonState('init');
    }
  };

  const price = formatEuro(totalPrice(cart));

  return (
    <div className={styles.content}>
      <textarea
        id="message"
        className={`${styles.field} ${styles.messageBox}`}
        name="message"
        placeholder="Laat hier je vragen of opmerkingen achter: persoonlijke boodschap bij bestelling, voorkeursdatum voor ophaling, kleurenvoorkeur enz."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      ></textarea>
      <div className={styles.pricing}>
        <div className={styles.title}>Subtotaal</div>
        <div className={styles.price}>{price}</div>
        <div className={styles.group}>
          <label htmlFor="code">
            Cadeaubon
            <input className={styles.field} name="code" placeholder="" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          </label>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <PrimaryButton state={buttonState} initialText="Afrekenen" finishedText="" disabled={buttonState} onClick={redirectToCheckout} />
      </div>
    </div>
  );
};

export default Checkout;
