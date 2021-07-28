import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './product-preview.module.css'

export default ({ product }) => (
  <div className={styles.preview}>
    <Link className={styles.link} to={`/verkoop/${product.slug}`}>
      <Img className={styles.image} alt={product.slug} fluid={product.images[0].fluid} />
      <h3 className={styles.title}>{product.title}</h3>
    </Link>
  </div>
)
