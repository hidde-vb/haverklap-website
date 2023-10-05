import React, { useEffect, useState } from 'react';

import * as styles from './modal.module.css';
import logo from '../images/logo.svg';

const Modal = ({ children }) => {
  const [showModal, setShowModal] = useState(true);

  const handleKeyup = (e) => e.keyCode === 27 && setShowModal(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (showModal) window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  });

  return (
    showModal && (
      <div role="dialog" onClick={toggleModal} onKeyPress={toggleModal} className={styles.modal}>
        <div className={styles.container}>
          <object className={styles.image} type="image/svg+xml" data={logo}>
            {' '}
            Haverklap{' '}
          </object>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
