import React from 'react';

import * as styles from './primary-button.module.css';

const states = {
  init: 'init',
  finished: 'finished',
  loading: 'loading',
};

const PrimaryButton = ({ state, initialText, finishedText, onClick }) => (
  <button type="button" className={`button ${styles.buttonPrimary} ${state === states.loading && styles.buttonLoading}`} onClick={onClick} disabled={state === states.finished}>
    <span className={styles.text}>{state === states.finished ? finishedText : initialText}</span>
  </button>
);

export default PrimaryButton;
