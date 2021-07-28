import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './partner.module.css'

export default ({ partner }) => (
  <Link className={styles.link} to={partner.website}>
    <div className={styles.container}>
      <Img className={styles.image} alt={partner.title} fluid={partner.image.fluid} />
      <h3 className={styles.title}>{partner.title}</h3>
    </div>
  </Link>
)
