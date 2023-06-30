import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Board from '@/components/Board';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, MyAppState } from '@/types';
import { myAppActions } from './store/myApp';
import { Config } from '@/config';
import { blockList1 } from '@/consts/blocks';
import CurrentBlock from '@/components/CurrentBlock';
import NextBlock from '@/components/NextBlock';

const DropNumbersGame = () => {
  const dispatch = useDispatch();
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);

  const initializeBoard = () => {
    let initialBoard: Block[][] = [];
    let initialRowBoard: Block[] = [];

    for (let i = 0; i < Config.board.size.col; i++) {
      initialRowBoard = [];
      for (let j = 0; j < Config.board.size.row; j++) {
        let emptyBlock: Block = {
          num: 0,
          color: 'bg-black',
          topColor: 'border-t-black',
          leftColor: 'border-l-black',
          borderColor: 'border-black',
          textSize: 'text-4xl',
          textSizeNext: 'text-3xl',
          rowIndex: j,
          colIndex: i,
        };
        initialRowBoard.push(emptyBlock);
      }
      initialBoard.push(initialRowBoard);
    }

    dispatch(myAppActions.setBoard(initialBoard));
  };

  const setBlock = () => {
    dispatch(
      myAppActions.setCurrentBlock(blockList1[Math.floor(Math.random() * 7) % blockList1.length]),
    );
    dispatch(
      myAppActions.setNextBlock(blockList1[Math.floor(Math.random() * 7) % blockList1.length]),
    );
  };

  useEffect(() => {
    setBlock();
    initializeBoard();

    console.log(currentBlock);
  }, [currentBlock]);

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
            <div className='w-40'></div>
            <CurrentBlock />
            <NextBlock />
          </div>
          <Board />
        </div>
      </div>
    </>
  );
};

export default DropNumbersGame;
