import React from 'react';
import AreYouReadySVG from '@/components/svgFiles/AreYouReadySVG';
import OKButton from '@/components/ui/buttons/OKButton';
import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const AreYouReadyWindow: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.modal} style={{ width: '400px', height: '200px' }}>
      <div
        className={`${styles.window_open} flex flex-col justify-center items-center text-center bg-white w-full h-full p-5 z-20`}
      >
        <div className='flex justify-center items-center text-center w-full h-full m-5'>
          <AreYouReadySVG />
        </div>
        <div className='flex justify-center items-center text-center w-full h-full mb-5'>
          <OKButton onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default AreYouReadyWindow;
