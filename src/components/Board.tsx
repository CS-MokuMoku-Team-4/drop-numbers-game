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
                <div key={index}
                  className={`${styles.cell} bg-black text-white flex justify-center items-center`}
                >
                  {col}
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
