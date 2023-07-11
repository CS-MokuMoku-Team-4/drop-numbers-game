import React from 'react';
import { useDispatch } from 'react-redux';
import { myAppActions } from '@/store/myApp';
import GameOverSVG from '@/components/svgFiles/GameOverSVG';
import ReturnTopButton from '@/components/ui/buttons/ReturnTopButton';
import styles from '../../../styles/Home.module.scss';

const GameOverWindow = () => {
  const dispatch = useDispatch();

  const startNewGame = () => {
    dispatch(myAppActions.setShowGameOverWindow(false));
  };

  return (
    <div className={styles.modal} style={{ width: '400px', height: '200px' }}>
      <div
        className={`${styles.window_open} flex flex-col justify-center items-center text-center bg-white w-full h-full p-5 z-20`}
      >
        <div className='flex justify-center items-center text-center w-full h-full m-5'>
          <GameOverSVG />
        </div>
        <div className='flex justify-center items-center text-center w-full h-full mb-5'>
          <ReturnTopButton onClick={startNewGame} />
        </div>
      </div>
    </div>
  );
};

export default GameOverWindow;
