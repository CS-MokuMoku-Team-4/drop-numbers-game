import type { MyAppState } from '@/types';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

const NextBlockArea = () => {
  const nextBlockArea = useSelector((state: MyAppState) => state.myApp.nextBlockArea);

  return (
    <div className='flex justify-center items-center bg-slate-800 mb-3'>
      {nextBlockArea.map((col, colIndex) => {
        return (
          <div
            key={colIndex}
            className={
              col.num === 0
                ? `${styles.cell} bg-black border-4 border-black`
                : `${styles.cell} ${col.color} ${col.textSize} ${col.topColor} ${col.leftColor} ${col.borderColor} border-4 flex justify-center items-center text-white visible opacity-100 duration-[500ms] delay-[1000ms]`
            }
          >
            {col.num !== 0 && col.num}
          </div>
        );
      })}
    </div>
  );
};

export default NextBlockArea;
