import React from 'react'
import Img from 'gatsby-image'

import styles from './imageGrid.module.css'

export default ({ data }) => (
  <ul className={styles.imageGrid}>
    {data.map(( image ) => {
      return (
        <li lassName={styles.parent} key={image.id}>
        <Img
            className={styles.image}
            alt={image.id}
            fluid={image.fluid}
          />
        </li>
      )
    })}
  </ul>
)
