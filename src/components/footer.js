import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

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
          <li><a  href="https://goo.gl/maps/VDhZ7FouEU1Wjpg46" rel="noreferrer" target="_blank">Adres Winkel</a></li>
          <li>0494 79 17 81</li>
          <li>bieke@haverklapbloemen.be</li>
          <li>rek. BE88 7360 6537 5741</li>
        </ul>
        <ul className={styles.list}>
          <li>BTW BE0654.987.352</li>
        </ul>
      </div>
    </div>
    <div className={styles.bottom}>
      <Link to="/privacy">Privacy & Cookies</Link>
      &nbsp;- © 2021 Haverklap -&nbsp;
      <a href="http://hidde.cc">Hidde van Bavel</a>
    </div>
  </div>
)
