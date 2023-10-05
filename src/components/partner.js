import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './partner.module.css';

const partner = ({ partner }) => (
  <a className={styles.link} href={partner.website} rel="noreferrer" target="_blank">
    <div className={styles.container}>
      <GatsbyImage className={styles.image} alt={partner.title} image={partner.image.gatsbyImage} />
      <h3 className={styles.title}>{partner.title}</h3>
    </div>
  </a>
);

export default partner;
