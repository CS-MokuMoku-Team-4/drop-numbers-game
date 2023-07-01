import type { Block, MyAppState } from '@/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '@/config';
import { blockList1 } from '@/consts/blocks';
import Board from '@/components/Board';
import NextBlock from '@/components/NextBlock';
import { myAppActions } from './store/myApp';
import styles from '../styles/Home.module.scss';
import { initialBoard } from '@/model/board';

const DropNumbersGame = () => {
  const dispatch = useDispatch();
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const currentRow = useSelector((state: MyAppState) => state.myApp.currentRow);
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const isBeginning = useSelector((state: MyAppState) => state.myApp.isBeginning);
  const [nextBlockIndex, setNextBlockIndex] = useState(
    Math.floor(Math.random() * 7) % blockList1.length,
  );

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

  const prepareNextBlock = () => {
    setNextBlockIndex(Math.floor(Math.random() * 7) % blockList1.length);
    dispatch(myAppActions.setNextBlock(blockList1[nextBlockIndex]));
  };

  const updateBoad = (rowIndex: number) => {
    const cloneBoard = structuredClone(board);
    const emptyBlock: Block = {
      num: 0,
      color: 'bg-black',
      topColor: 'border-t-black',
      leftColor: 'border-l-black',
      borderColor: 'border-black',
      textSize: 'text-4xl',
      textSizeNext: 'text-3xl',
      rowIndex: 0,
      colIndex: 0,
    };

    if (rowIndex >= 0) {
      cloneBoard[rowIndex][currentColumn] = emptyBlock;
    }

    console.log(currentBlock);
    cloneBoard[rowIndex + 1][currentColumn] = currentBlock;
    console.log(cloneBoard);
    dispatch(myAppActions.setBoard(cloneBoard));
  };

  const startDropping = (rowIndex: number) => {
    dispatch(myAppActions.setCurrentBlock(blockList1[nextBlockIndex]));
    prepareNextBlock();
    dropBlock(rowIndex);
  };

  const dropBlock = (rowIndex: number) => {
    if (!isGameOver()) {
      if (isSpace(rowIndex)) {
        updateBoad(rowIndex);
        dispatch(myAppActions.setCurrentRow(rowIndex + 1));
        console.log(rowIndex, currentRow);
        dropBlock(rowIndex + 1);
      } else {
        dispatch(myAppActions.setCurrentRow(-1));
        startDropping(-1);
      }
    } else {
      console.log('Game Over!!');
      console.log(board[0][2].num);
    }
  };

  const isSpace = (rowIndex: number) => {
    console.log(board);
    console.log(rowIndex);

    return rowIndex + 1 < board.length && board[rowIndex + 1][currentColumn].num === 0;
  };

  const isGameOver = () => {
    if (board[0] !== undefined) {
      return board[0][2].num !== 0;
    } else return false;
  };

  const gameStart = () => {
    console.log('Start!!');
    prepareNextBlock();
    dispatch(myAppActions.setIsBeginning(false));
    startDropping(currentRow);
  };

  useEffect(() => {
    if (isBeginning) {
      gameStart();
    } else {
      if (!isSpace(currentRow)) {
        dispatch(myAppActions.setCurrentBlock(blockList1[nextBlockIndex]));
        prepareNextBlock();
      }

      startDropping(currentRow);
    }
  }, [
    isBeginning,
    currentRow,
    isSpace,
    dispatch,
    prepareNextBlock,
    gameStart,
    nextBlockIndex,
    startDropping,
  ]);

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
