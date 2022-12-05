import React, { useEffect, useState } from "react";

import styles from "./modal.module.css";

const Modal = ({ children }) => {
  const [showModal, setShowModal] = useState(true);
  const handleKeyup = (e) => e.keyCode === 27 && setShowModal(false);
  const toggleModal = () => setShowModal(!showModal);
  useEffect(() => {
    if (showModal) window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  });

  return (
    <>
      {showModal && (
        <div onClick={toggleModal} className={styles.modal}>
          <div className={styles.container}>
            <h2>Haverklap</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
