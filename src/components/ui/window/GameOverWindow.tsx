import React from 'react';
import GameOverSVG from '@/components/svgFiles/GameOverSVG';
import ReturnToTopButton from '@/components/ui/buttons/ReturnToTopButton';
import styles from '../../../styles/Home.module.scss';

const GameOverWindow = () => {
  return (
    <div className={styles.modal} style={{ width: '400px', height: '200px' }}>
      <div
        className={`${styles.window_open} flex flex-col justify-center items-center text-center bg-white w-full h-full p-5 z-20`}
      >
        <div className='flex justify-center items-center text-center w-full h-full m-5'>
          <GameOverSVG />
        </div>
        <div className='flex justify-center items-center text-center w-full h-full mb-5'>
          <ReturnToTopButton />
        </div>
      </div>
    </div>
  );
};

export default GameOverWindow;
