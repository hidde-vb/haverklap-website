import React from 'react'
import Img from 'gatsby-image'

import styles from './partner.module.css'

export default ({ partner }) => (
  <a className={styles.link} href={partner.website} rel="noreferrer" target="_blank">
    <div className={styles.container}>
      <Img className={styles.image} alt={partner.title} fluid={partner.image.fluid} />
      <h3 className={styles.title}>{partner.title}</h3>
    </div>
  </a>
)
