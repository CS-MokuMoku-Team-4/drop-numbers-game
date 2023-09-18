import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const ReturnToTopButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Link href={'/'}>
      <div className={styles.return_to_top_btn} onClick={onClick}>
        Return to Top Page
      </div>
    </Link>
  );
};

export default ReturnToTopButton;
