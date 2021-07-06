import React from 'react'
import Img from 'gatsby-image'

import styles from './footer.module.css'

export default ({ data }) => (
  <div className={styles.footer}>
    <div className={styles.wrapper}>
      <Img
        className={styles.footerImage}
        fluid={data}
      />
      <div className={styles.row}>
        <ul className={styles.list}>
          <li><b>Contact</b></li>
          <li>Bieke Van Gils</li>
          <li>0494 79 17 81</li>
          <li>info@haverklapbloemen.be</li>
          <li>BE88 7360 6537 5741</li>
        </ul>
        <ul className={styles.list}>
          <li>Haven Incubator cvba-so</li>
          <li>De Wittestraat 2</li>
          <li>2600 Berchem</li>
          <li>België</li>
          <li>BE0654.987.352</li>
        </ul>
      </div>
      <div className={styles.row}>
        <ul className={styles.list}>
          <li><b>Sitemap</b></li>
          <li>Haverklap</li>
          <li>Op het veld</li>
          <li>Atelier</li>
          <li>Contact</li>
          <li>BE0654.987.352</li>
        </ul>
      </div>
    </div>
    <div className={styles.bottom}>
      <a href="./voorwaarden.html">Privacy & Algemene Voorwaarden</a>
      &nbsp;- © 2021 Haverklap -&nbsp;
      <a href="http://hidde.cc">Hidde van Bavel</a>
    </div>
  </div>

)
