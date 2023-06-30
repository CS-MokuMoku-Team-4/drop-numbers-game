import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import { MyAppState } from '@/types';

const NextBlock = () => {
  const nextBlock = useSelector((state: MyAppState) => state.myApp.nextBlock);

  return (
    <div className='flex justify-end items-center'>
      <div className='text-white text-xl mx-5'>NEXT:</div>
      <div
        className={`${styles.next_block} ${nextBlock.color} ${nextBlock.textSizeNext} ${nextBlock.topColor} ${nextBlock.leftColor} ${nextBlock.borderColor} border-4 flex justify-center items-center text-white`}
      >
        {nextBlock.num}
      </div>
    </div>
  );
};

export default NextBlock;
