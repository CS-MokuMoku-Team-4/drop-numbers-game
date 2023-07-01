import type { MyAppState } from '@/types';
import styles from '../styles/Home.module.scss';
import { useSelector } from 'react-redux';

const Board = () => {
  const board = useSelector((state: MyAppState) => state.myApp.board);

  return (
    <div className={`${styles.metallic} mb-10 p-5`}>
      {board.map((row, index) => {
        return (
          <div key={index} className='flex justify-center items-center'>
            {row.map((col, index) => {
              return (
                <div
                  key={index}
                  className={
                    col.color === null || col.num === 0
                      ? `${styles.cell} bg-black border-4 border-black`
                      : `${styles.cell} ${col.color} ${col.textSize} ${col.topColor} ${col.leftColor} ${col.borderColor} border-4 flex justify-center items-center text-white`
                  }
                >
                  {col.num}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
