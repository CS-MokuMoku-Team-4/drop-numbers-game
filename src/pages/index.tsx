import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { blockList1, initialBoard, initialNextBlocks } from '@/consts/blocks';
import { myAppActions } from '@/store/myApp';
import TitleSVG from '@/components/svgFiles/TitleSVG';
import StartButton from '@/components/ui/buttons/StartButton';
import styles from '@/styles/Home.module.scss';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initializeState = () => {
    dispatch(myAppActions.setBoard(initialBoard));
    dispatch(myAppActions.setNextBlockArea(initialNextBlocks));
    dispatch(myAppActions.setCurrentBlock(blockList1[0]));
    dispatch(myAppActions.setNextBlock(blockList1[1]));
    dispatch(myAppActions.setCurrentColumn(2));
    dispatch(myAppActions.setCurrentRow(-1));
    dispatch(myAppActions.setIsMoving(false));
    dispatch(myAppActions.setIsMoved(false));
    dispatch(myAppActions.setIsMerged(false));
    dispatch(myAppActions.setShowGameOverWindow(false));
  };

  const handleClick = () => {
    initializeState();
    void router.push('/drop-numbers-game');
  };

  return (
    <>
      <Head>
        <title>Drop Numbers Game</title>
        <meta name='description' content='You can play a drop numbers game on this page.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.curtain_open}>
        <div className='flex justify-center items-center'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
            <div className='py-7'>
              <TitleSVG />
            </div>
            <div className='flex items-center justify-center'>
              <StartButton onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
