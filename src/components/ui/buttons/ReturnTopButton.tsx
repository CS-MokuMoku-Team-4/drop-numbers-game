import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const ReturnTopButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.start_btn} type='button' onClick={onClick}>
      Return Top Page
    </button>
  );
};

export default ReturnTopButton;
