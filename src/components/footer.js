import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import * as styles from './footer.module.css';

const footer = ({ data }) => (
  <div className={styles.footer}>
    <div className={styles.wrapper}>
      <GatsbyImage className={styles.footerImage} image={data} />
      <div className={styles.row}>
        <ul className={styles.list}>
          <li>
            <b>Contact</b>
          </li>
          <li>Bieke Van Gils</li>
          <li>
            <a href="https://goo.gl/maps/VDhZ7FouEU1Wjpg46" rel="noreferrer" target="_blank">
              Adres Winkel
            </a>
          </li>
          <li>0494 79 17 81</li>
          <li>bieke@haverklapbloemen.be</li>
          <li>IBAN BE10 9734 4356 8304</li>
        </ul>
        <ul className={styles.list}>
          <li>BTW BE 0795.571.432</li>
        </ul>
      </div>
    </div>
    <div className={styles.bottom}>
      <Link to="/privacy">Privacy & Cookies</Link>
      &nbsp;- © 2023 Haverklap -&nbsp;
      <a href="http://hidde.cc">Hidde van Bavel</a>
    </div>
  </div>
);

export default footer;
