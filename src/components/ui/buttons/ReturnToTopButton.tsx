import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Home.module.scss';

const ReturnToTopButton = React.forwardRef(() => {
  return (
    <Link href={'/'} passHref>
      <div className={styles.return_to_top_btn}>Return to Top Page</div>
    </Link>
  );
});

export default ReturnToTopButton;
