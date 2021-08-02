import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

import facebookGlyph from '../images/facebook-glyph.png'
import instagramGlyph from '../images/instagram-glyph.png'

export default () => {
  const [open, setOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useLayoutEffect(() => {
    document.addEventListener('scroll', () => {
      setShowLogo(window.scrollY > window.innerHeight - 50);
    })
  });

  const handleKeyPress = (e) => { if (e.keyCode === 20) setOpen(!open) };

  return (
    <nav role="navigation">
      <div className={styles.navigation}>
        {open &&
          <div className={styles.verticalMenu}>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/">Haverklap</Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/op-het-veld">Op het veld</Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/atelier">Atelier</Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/verkoop">Verkoop</Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/contact">Contact</Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="https://www.instagram.com/haverklap.bloemen/"><img className={styles.menuIcon} src={facebookGlyph} alt="F" /></Link>
              <Link className={styles.menuLink} to="https://www.facebook.com/haverklap.bloemen"><img className={styles.menuIcon} src={instagramGlyph} alt="I" /></Link>
            </div>
          </div>
        }
        <div className={styles.navigationBar}>
          <object className={styles.logo} style={showLogo ? { opacity: 1 } : { opacity: 0 }} type="image/svg+xml">logo</object>
          <div className={`${styles.hamburger} ${open && styles.active}`}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => handleKeyPress(e)}
            onClick={() => setOpen(!open)}
          >
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/">haverklap</Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/op-het-veld">op het veld</Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/atelier">atelier</Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/verkoop">verkoop</Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/contact">contact</Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/"><img className={styles.menuIcon} src={facebookGlyph} alt="F" /></Link>
              <Link className={styles.menuLink} to="/"><img className={styles.menuIcon} src={instagramGlyph} alt="I" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

