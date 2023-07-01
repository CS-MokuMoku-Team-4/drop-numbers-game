import { useSelector } from 'react-redux';
import type { MyAppState } from '@/types';
import styles from '../styles/Home.module.scss';

const NextBlock = () => {
  const nextBlock = useSelector((state: MyAppState) => state.myApp.nextBlock);

  return (
    <div
      className={`${styles.next_block} ${nextBlock.color} ${nextBlock.textSizeNext} ${nextBlock.topColor} ${nextBlock.leftColor} ${nextBlock.borderColor} border-4 flex justify-center items-center text-white`}
    >
      {nextBlock.num}
    </div>
  );
};

export default NextBlock;
