import React from 'react'

import './base.css'
import Navigation from './navigation'
import Footer from './footer'
import styles from './layout.module.css'
import Logo from '../images/logo.svg'
class Template extends React.Component {
  render() {
    const { children, footerImage, hasBigLogo } = this.props

    return (
      <div className={styles.wrapper}>
        <Navigation />
        <object className={`${styles.logo} ${hasBigLogo ? styles.bigLogo : ''}` } type="image/svg+xml" data={Logo}> Haverklap </object>
        <div className={styles.content}>
          {children}
          <Footer data={footerImage} />
        </div>
      </div>
    )
  }
}

export default Template
