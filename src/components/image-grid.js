import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image'

import * as styles from './image-grid.module.css';

const imageGrid = ({ data }) => (
  <ul className={styles.imageGrid}>
    {data &&
      data.map((image) => {
        return (
          <li key={image.id}>
            <GatsbyImage className={styles.image} alt={image.id} image={image.gatsbyImage} />
          </li>
        );
      })}
  </ul>
);

export default imageGrid;
