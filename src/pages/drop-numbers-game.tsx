import type { Block, MyAppState } from '@/types';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blockList1 } from '@/consts/blocks';
import Board from '@/components/Board';
import NextBlock from '@/components/NextBlock';
import { myAppActions } from './store/myApp';
import styles from '../styles/Home.module.scss';

const DropNumbersGame = () => {
  const dispatch = useDispatch();
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const currentRow = useSelector((state: MyAppState) => state.myApp.currentRow);
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const isBeginning = useSelector((state: MyAppState) => state.myApp.isBeginning);
  const nextBlockIndex = useSelector((state: MyAppState) => state.myApp.nextBlockIndex);

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
    console.log(index, nextBlockIndex);
    return index;
  };

  const updateBoad = (rowIndex: number, nextIndex: number) => {
    const cloneBoard = structuredClone(board);

    if (rowIndex - 1 >= 0) {
      const emptyBlock: Block = {
        num: 0,
        color: 'bg-black',
        topColor: 'border-t-black',
        leftColor: 'border-l-black',
        borderColor: 'border-black',
        textSize: 'text-4xl',
        textSizeNext: 'text-3xl',
        rowIndex: rowIndex,
        colIndex: currentColumn,
      };

      cloneBoard[rowIndex - 1][currentColumn] = emptyBlock;
    }

    cloneBoard[rowIndex][currentColumn] = blockList1[nextIndex];
    console.log(cloneBoard);
    dispatch(myAppActions.setBoard(cloneBoard));
    console.log(board);
  };

  useEffect(() => {
    console.log(nextBlockIndex);
    console.log(currentBlock);
  }, [nextBlockIndex, currentBlock]);

  const dropNextBlock = (rowIndex: number, blockIndex: number) => {
    dispatch(myAppActions.setCurrentBlock(blockList1[blockIndex]));
    dropBlock(rowIndex, blockIndex, prepareNextBlock());
  };

  const dropBlock = (rowIndex: number, currentIndex: number, nextIndex: number) => {
    if (!isGameOver()) {
      setTimeout(() => {
        updateBoad(rowIndex, currentIndex);
        if (isBottom(rowIndex)) {
          // 一番下に到達したかどうか
          rowIndex = 0;
          dispatch(myAppActions.setCurrentRow(rowIndex));
          dropNextBlock(rowIndex, nextIndex); // 次のブロック
        } else {
          rowIndex++;
          dispatch(myAppActions.setCurrentRow(rowIndex));
          console.log(rowIndex, currentRow);
          dropBlock(rowIndex, currentIndex, nextIndex);
        }
      }, 1000);
    } else {
      console.log('Game Over!!');
      console.log(board[0][2].num);
    }
  };

  const isBottom = (rowIndex: number) => {
    console.log(rowIndex);

    return rowIndex >= board.length - 1 || board[rowIndex + 1][currentColumn].num !== 0;
  };

  const isGameOver = () => {
    return board[0][2].num !== 0;
  };

  const gameStart = () => {
    console.log('Start!!');
    dispatch(myAppActions.setIsBeginning(false));
    dropNextBlock(0, prepareNextBlock());
  };

  useEffect(() => {
    if (isBeginning) {
      gameStart();
    }
  }, [isBeginning, gameStart]);

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
