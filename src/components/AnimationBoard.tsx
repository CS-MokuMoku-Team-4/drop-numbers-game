import type { MyAppState } from '@/types';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

const AnimationBoard = () => {
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='flex justify-center items-center bg-black '>
            {row.map((col, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className={classNames(
                    col.num === 0
                      ? `invisible opacity-0 duration-[3000ms]`
                      : `visible opacity-100 duration-[1000ms] delay-[1500ms] ${styles.cell} ${col.color} ${col.textSize} ${col.topColor} ${col.leftColor} ${col.borderColor} border-4 flex justify-center items-center text-white`,
                  )}
                >
                  {col.num !== 0 && col.num}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default AnimationBoard;
