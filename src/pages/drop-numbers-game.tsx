import type { Block, MyAppState } from '@/types';
import Head from 'next/head';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blockList1 } from '@/consts/blocks';
import Board from '@/components/Board';
import NextBlock from '@/components/NextBlock';
import { myAppActions } from './store/myApp';
import styles from '../styles/Home.module.scss';

const DropNumbersGame = () => {
  const SPEED = 1000;
  const dispatch = useDispatch();
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const isBeginning = useSelector((state: MyAppState) => state.myApp.isBeginning);
  const isMoving = useSelector((state: MyAppState) => state.myApp.isMoving);
  const colIndex = useRef(currentColumn);

  // const nextBlockIndexRef = useRef(Math.floor(Math.random() * 7) % blockList1.length);
  // const currentBlockIndexRef = useRef(Math.floor(Math.random() * 7) % blockList1.length);

  // const initializeBoard = () => {
  // const initialBoard: Block[][] = [];
  // let initialRow: Block[] = [];

  // for (let i = 0; i < Config.board.size.col; i++) {
  //   initialRow = [];
  //   for (let j = 0; j < Config.board.size.row; j++) {
  //     const emptyBlock: Block = {
  //       num: 0,
  //       color: 'bg-black',
  //       topColor: 'border-t-black',
  //       leftColor: 'border-l-black',
  //       borderColor: 'border-black',
  //       textSize: 'text-4xl',
  //       textSizeNext: 'text-3xl',
  //       rowIndex: j,
  //       colIndex: i,
  //     };
  //     initialRow.push(emptyBlock);
  //   }
  //   initialBoard.push(initialRow);
  // }

  // dispatch(myAppActions.setBoard(initialBoard));
  // };

  const prepareNextBlock = useCallback((): number => {
    const index = Math.floor(Math.random() * 7) % blockList1.length;

    dispatch(myAppActions.setNextBlock(blockList1[index]));

    return index;
  }, [dispatch]);

  const updateBoard = useCallback(
    (rowIndex: number, currentBoard: Block[][], currentBlockIndex: number): Block[][] => {
      const cloneBoard = structuredClone(currentBoard);

      cloneBoard[rowIndex][colIndex.current] = blockList1[currentBlockIndex];
      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [dispatch],
  );

  const isBottom = useCallback(
    (rowIndex: number, currentBoard: Block[][]) => {
      return rowIndex >= board.length - 1 || currentBoard[rowIndex + 1][colIndex.current].num !== 0;
    },
    [board.length],
  );

  const dropBlock = useCallback(
    (
      rowIndex: number,
      currentBoard: Block[][],
      currentBlockIndex: number,
      nextBlockIndex: number,
    ): void => {
      if (!isGameOver(currentBoard)) {
        setTimeout(() => {
          updateBoard(rowIndex, currentBoard, currentBlockIndex);

          if (isBottom(rowIndex, currentBoard)) {
            // 一番下に到達した場合
            const newBoard = updateBoard(rowIndex, currentBoard, currentBlockIndex);
            dispatch(myAppActions.setCurrentRow(0));
            dropNextBlock(0, newBoard, nextBlockIndex); // 次のブロック
          } else {
            dispatch(myAppActions.setCurrentRow(rowIndex + 1));
            dropBlock(rowIndex + 1, currentBoard, currentBlockIndex, nextBlockIndex);
          }
        }, SPEED);
      } else {
        console.log('Game Over!!');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, isBottom, updateBoard],
  );

  const dropNextBlock = useCallback(
    (rowIndex: number, currentBoard: Block[][], nextBlockIndex: number): void => {
      dispatch(myAppActions.setIsMoving(false));
      dropBlock(rowIndex, currentBoard, nextBlockIndex, prepareNextBlock());
    },
    [dispatch, dropBlock, prepareNextBlock],
  );

  const isGameOver = (currentBoard: Block[][]): boolean => {
    console.log(currentBoard);

    return currentBoard[0][colIndex.current].num !== 0;
  };

  const gameStart = useCallback(() => {
    console.log('Start!!');
    dispatch(myAppActions.setIsBeginning(false));

    const currentBlockIndex = Math.floor(Math.random() * 7) % blockList1.length;

    dropNextBlock(0, board, currentBlockIndex);
  }, [board, dispatch, dropNextBlock]);

  useEffect(() => {
    if (isBeginning) {
      gameStart();
    }

    if (!isMoving) {
      colIndex.current = currentColumn;
    }
  }, [isBeginning, gameStart, currentColumn, colIndex, isMoving]);

  // キー入力
  // const handleKeyDown = useCallback((event: { keyCode: number }) => {
  //   switch (event.keyCode) {
  //     case 39:
  //       columnIndex++;
  //       dispatch(myAppActions.setCurrentColumn(columnIndex));
  //       break;
  //     case 37:
  //       columnIndex--;
  //       dispatch(myAppActions.setCurrentColumn(columnIndex));
  //       break;
  //     case 40:
  //       console.log('down arrow key is pressed!');
  //       break;
  //     default:
  //       break;
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown, false);
  // }, []);

  return (
    <>
      <Head>
        <title>Drop Numbers Game</title>
        <meta
          name='description'
          content='You can play a drop numbers game on this page.'
          key='desc'
        />
      </Head>
      <div className={styles.curtain_open}>
        <div className='bg-gradient-to-b from-cyan-800 to-black w-screen h-screen flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center m-5'>
            <NextBlock />
          </div>
          <Board />
        </div>
      </div>
    </>
  );
};

export default DropNumbersGame;
