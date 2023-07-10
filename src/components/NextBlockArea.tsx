import type { MyAppState } from '@/types';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

const NextBlockArea = () => {
  const nextBlockArea = useSelector((state: MyAppState) => state.myApp.nextBlockArea);

  return (
    <div className='flex justify-center items-center bg-slate-800 border-4 border-slate-900 border-b-slate-700 border-r-slate-700 mb-3'>
      {nextBlockArea.map((col, colIndex) => {
        return (
          <div
            key={colIndex}
            className={
              col.num === 0
                ? `${styles.cell} bg-slate-800`
                : `${styles.next_block} ${col.fromColor} ${col.toColor} ${col.textSizeSmall} ${col.topColor} ${col.leftColor} ${col.borderColor} border-4 flex justify-center items-center text-white rounded-lg bg-gradient-to-b visible opacity-100 duration-[500ms]`
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
