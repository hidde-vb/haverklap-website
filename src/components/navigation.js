import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';

import cartGlyph from '../images/cart-glyph.png';
import facebookGlyph from '../images/facebook-glyph.png';
import instagramGlyph from '../images/instagram-glyph.png';
import { CartContext } from './cart/cart-context';
import { amountOfItems } from './cart/cart-utils';
import * as styles from './navigation.module.css';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const cart = useContext(CartContext);

  const items = amountOfItems(cart);

  return (
    <nav role="navigation">
      <div className={styles.navigation}>
        {open && (
          <div className={styles.verticalMenu}>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/">
                haverklap
              </Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/op-het-veld">
                op het veld
              </Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/feest">
                feest
              </Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/verkoop">
                verkoop
              </Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <Link className={styles.menuLink} to="/contact">
                contact
              </Link>
            </div>
            <div className={styles.verticalMenuItem}>
              <a className={styles.menuLink} href="https://www.facebook.com/haverklap.bloemen/" rel="noreferrer" target="_blank">
                <img className={styles.menuIcon} src={facebookGlyph} alt="F" />
              </a>
              <a className={styles.menuLink} href="https://www.instagram.com/haverklap.bloemen/" rel="noreferrer" target="_blank">
                <img className={styles.menuIcon} src={instagramGlyph} alt="I" />
              </a>
            </div>
          </div>
        )}
        <div className={styles.navigationBar}>
          {items && items !== '0' && (
            <div className={styles.floatinCart}>
              <a className={`${styles.menuLink} ${styles.badge} ${styles.bigBadge}`} value={items} href="/winkelwagen">
                <img className={styles.menuIcon} src={cartGlyph} alt="C" />
              </a>
            </div>
          )}
          <div
            className={`${styles.hamburger} ${open && styles.active}`}
            tabIndex={0}
            role="button"
            onClick={() => setOpen(!open)}
          >
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/">
                haverklap
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/op-het-veld">
                op het veld
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/feest">
                feest
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/verkoop">
                verkoop
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={styles.menuLink} to="/contact">
                contact
              </Link>
            </li>
            <li className={styles.menuItem}>
              {items && items !== '0' && (
                <a className={`${styles.menuLink} ${styles.badge}`} value={items} href="/winkelwagen">
                  <img className={styles.menuIcon} src={cartGlyph} alt="C" />
                </a>
              )}
              <a className={styles.menuLink} href="https://www.facebook.com/haverklap.bloemen/" rel="noreferrer" target="_blank">
                <img className={styles.menuIcon} src={facebookGlyph} alt="F" />
              </a>
              <a className={styles.menuLink} href="https://www.instagram.com/haverklap.bloemen/" rel="noreferrer" target="_blank">
                <img className={styles.menuIcon} src={instagramGlyph} alt="I" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
