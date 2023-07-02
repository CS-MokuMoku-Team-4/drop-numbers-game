import type { Block, MyAppState } from '@/types';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blockList1 } from '@/consts/blocks';
import Board from '@/components/Board';
import NextBlock from '@/components/NextBlock';
import { myAppActions } from './store/myApp';
import styles from '../styles/Home.module.scss';

const DropNumbersGame = () => {
  const dispatch = useDispatch();
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const isBeginning = useSelector((state: MyAppState) => state.myApp.isBeginning);
  let columnIndex = currentColumn;

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

  const prepareNextBlock = (): number => {
    const index = Math.floor(Math.random() * 7) % blockList1.length;
    dispatch(myAppActions.setNextBlock(blockList1[index]));
    dispatch(myAppActions.setNextBlockIndex(index));
    return index;
  };

  const animateBlock = (rowIndex: number, nextIndex: number, currentBoard: Block[][]) => {
    const cloneBoard = structuredClone(currentBoard);

    cloneBoard[rowIndex][columnIndex] = blockList1[nextIndex];
    dispatch(myAppActions.setBoard(cloneBoard));
  };

  const dropNextBlock = (rowIndex: number, blockIndex: number, newBoard: Block[][]) => {
    dispatch(myAppActions.setCurrentBlock(blockList1[blockIndex]));
    dropBlock(rowIndex, blockIndex, prepareNextBlock(), newBoard);
  };

  const dropBlock = (
    rowIndex: number,
    currentIndex: number,
    nextIndex: number,
    currentBoard: Block[][],
  ) => {
    if (!isGameOver(currentBoard)) {
      setTimeout(() => {
        animateBlock(rowIndex, currentIndex, currentBoard);
        if (isBottom(rowIndex, currentBoard)) {
          // 一番下に到達したかどうか
          let newBoard = updateBoard(currentIndex, rowIndex, currentBoard);
          rowIndex = 0;
          dispatch(myAppActions.setCurrentRow(rowIndex));
          dropNextBlock(rowIndex, nextIndex, newBoard); // 次のブロック
        } else {
          rowIndex++;
          dispatch(myAppActions.setCurrentRow(rowIndex));
          dropBlock(rowIndex, currentIndex, nextIndex, currentBoard);
        }
      }, 1000);
    } else {
      console.log('Game Over!!');
    }
  };

  const isBottom = (rowIndex: number, currentBoard: Block[][]) => {
    return rowIndex >= board.length - 1 || currentBoard[rowIndex + 1][columnIndex].num !== 0;
  };

  const isGameOver = (currentBoard: Block[][]) => {
    return currentBoard[0][columnIndex].num !== 0;
  };

  const updateBoard = (blockIndex: number, row: number, currentBoard: Block[][]): Block[][] => {
    const cloneBoard = structuredClone(currentBoard);

    cloneBoard[row][columnIndex] = blockList1[blockIndex];
    dispatch(myAppActions.setBoard(cloneBoard));

    return cloneBoard;
  };

  const gameStart = () => {
    console.log('Start!!');
    dispatch(myAppActions.setIsBeginning(false));
    dropNextBlock(0, prepareNextBlock(), board);
  };

  useEffect(() => {
    if (isBeginning) {
      gameStart();
    }
    console.log(currentColumn);
    columnIndex = currentColumn;
  }, [isBeginning, gameStart, currentColumn, columnIndex]);

  const handleKeyDown = useCallback((event: { keyCode: number }) => {
    switch (event.keyCode) {
      case 39:
        columnIndex++;
        dispatch(myAppActions.setCurrentColumn(columnIndex));
        break;
      case 37:
        columnIndex--;
        dispatch(myAppActions.setCurrentColumn(columnIndex));
        break;
      case 40:
        console.log('down arrow key is pressed!');
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, false);
  }, []);

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
