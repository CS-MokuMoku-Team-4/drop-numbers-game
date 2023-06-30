import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import { MyAppState } from '@/types';

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
                      : `${styles.cell} bg-${col.color}-600 text-${col.textSize} border-t-${col.color}-300 border-l-${col.color}-300 border-${col.color}-800 border-4 flex justify-center items-center text-white`
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
