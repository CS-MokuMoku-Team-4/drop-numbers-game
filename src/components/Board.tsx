import type { MyAppState } from '@/types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myAppActions } from '@/pages/store/myApp';
import NextBlockArea from './NextBlockArea';
import styles from '../styles/Home.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const currentRow = useSelector((state: MyAppState) => state.myApp.currentRow);
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const isMoving = useSelector((state: MyAppState) => state.myApp.isMoving);
  const isMoved = useSelector((state: MyAppState) => state.myApp.isMoved);
  const currentColRef = useRef(currentColumn);
  const currentRowRef = useRef(currentRow);
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const handleClick = (colIndex: number) => {
    if (!isMoving && !isMoved) {
      currentRowRef.current = currentRow;
      currentColRef.current = currentColumn;
      let tempCol = currentColRef.current;
      let resultCol = colIndex;

      dispatch(myAppActions.setIsMoving(true));

      if (colIndex > currentColRef.current) {
        while (tempCol + 1 <= colIndex) {
          // クリックした列と現在地の間に障害物がないかどうか調べる
          if (board[currentRowRef.current][tempCol + 1].num === 0) {
            tempCol++;
          } else {
            // 障害物があれば移動しない
            resultCol = currentColRef.current;
            break;
          }
        }
      } else if (colIndex < currentColRef.current) {
        while (tempCol - 1 >= colIndex) {
          // クリックした列と現在地の間に障害物がないかどうか調べる
          if (board[currentRowRef.current][tempCol - 1].num === 0) {
            tempCol--;
          } else {
            // 障害物があれば移動しない
            resultCol = currentColRef.current;
            break;
          }
        }
      }
      dispatch(myAppActions.setCurrentColumn(resultCol));
      dispatch(myAppActions.setIsMoved(true));
      dispatch(myAppActions.setIsMoving(false));
    }
  };

  return (
    <div className={`${styles.metallic} mb-10 p-5`}>
      <NextBlockArea />
      <div className='bg-black border-4 border-slate-800 border-b-slate-700 border-r-slate-700'>
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='flex justify-center items-center'>
              {row.map((col, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    onClick={() => {
                      handleClick(colIndex);
                    }}
                    className={classNames(
                      col.num === 0
                        ? `bg-black border-4 border-black`
                        : col.isMerged
                        ? `visible opacity-100 duration-[500ms]`
                        : ``,
                      `${styles.cell} ${col.color} ${col.textSize} ${col.topColor} ${col.leftColor} ${col.borderColor} border-4 flex justify-center items-center text-white`,
                    )}
                  >
                    {col.num !== 0 && col.num}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
