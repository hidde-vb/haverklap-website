import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import { CartContext, cartDispatchContext } from '../components/cart/cart-context';
import Layout from '../components/layout';
import CartItem from '../components/cart/cart-item';
import Checkout from '../components/cart/checkout';

import favicon from '../images/favicon.ico';
import styles from './winkelwagen.module.css';

const WinkelWagenPage = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const contactImage = get(props, 'data.contentfulAsset.contactImage');

  const state = useContext(CartContext);
  const dispatch = useContext(cartDispatchContext);

  const handleIncrease = (id) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
      },
    });
  };

  const handleDecrease = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id,
      },
    });
  };

  return (
    <Layout location={props.location} footerImage={contactImage} hasBigLogo={false}>
      <Helmet title={siteTitle}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="main">
        <h2 className="pageTitle">Winkelwagentje</h2>
        {state.products.length > 0 ? (
          state.products.map((product) => <CartItem key={product.id} product={product} increase={handleIncrease} decrease={handleDecrease} />)
        ) : (
          <div className="warning-container">
            <p>
              Je winkelwagentje is leeg. Bij <Link to="/verkoop">Verkoop</Link> kan je verder gaan met winkelen.
            </p>
          </div>
        )}
        <div className={styles.divider} />
        <div className={styles.checkout}>
          <Checkout />
        </div>
      </div>
    </Layout>
  );
};

export default WinkelWagenPage;

export const pageQuery = graphql`
  query winkelwagenQuery {
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: fluid(maxWidth: 300, maxHeight: 400, background: "rgb:000000") {
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
