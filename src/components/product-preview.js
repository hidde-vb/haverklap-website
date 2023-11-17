import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './product-preview.module.css';

const productPreview = ({ product }) => {
  const image = product.images && product.images[0].gatsbyImage;
  return (
    <div className={styles.preview}>
      <Link className={styles.link} to={`/verkoop/${product.slug}`}>
        <GatsbyImage className={styles.image} alt={product.slug} image={image} />
        <h3 className={styles.title}>{product.title}</h3>
      </Link>
    </div>
  );
};

export default productPreview;
