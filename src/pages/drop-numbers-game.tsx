import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Board from '@/components/Board';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Block } from '@/types';
import { myAppActions } from './store/myApp';
import { Config } from '@/config';

const DropNumbersGame = () => {
  const dispatch = useDispatch();

  const initializeBoard = () => {
    let initialBoard: Block[][] = [];
    let initialRowBoard: Block[] = [];

    for (let i = 0; i < Config.board.size.col; i++) {
      initialRowBoard = [];
      for (let j = 0; j < Config.board.size.row; j++) {
        const block: Block = {
          num: 4,
          color: 'green',
          textSize: '4xl',
          rowIndex: j,
          colIndex: i,
        };
        initialRowBoard.push(block);
      }
      initialBoard.push(initialRowBoard);
    }

    console.log(initialBoard);

    dispatch(myAppActions.setBoard(initialBoard));
  };

  useEffect(() => {
    initializeBoard();
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
        <div className='bg-gradient-to-b from-cyan-800 to-black w-screen h-screen flex justify-center items-end'>
          <div>
            <Board />
          </div>
        </div>
      </div>
    </>
  );
};

export default DropNumbersGame;
