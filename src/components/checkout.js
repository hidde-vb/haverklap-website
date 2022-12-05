import React, { useState } from "react";

const Checkout = (product) => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (event) => {
    event.preventDefault();

    if (!product) return;

    setLoading(true);

    const res = await fetch(`${process.env.API_URL}/checkout/${product.spec}`, {
      method: "POST",
    });

    const body = await res.json();
    window.location.href = body.url;
  };

  return (
    <button className="button button-checkout" disabled={loading} onClick={redirectToCheckout}>
      Afrekenen
    </button>
  );
};

export default Checkout;
