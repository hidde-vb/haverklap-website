import React from 'react'
import './base.css'
import Navigation from './navigation'
import styles from './layout.module.css'
import Logo from '../images/logo.svg'
class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className={styles.wrapper}>
        <Navigation />
        <object className={styles.logo} type="image/svg+xml" data={Logo}> Haverklap </object>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}

export default Template
