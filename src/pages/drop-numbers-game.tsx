import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Board from '@/components/Board';

const DropNumbersGame = () => {
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
