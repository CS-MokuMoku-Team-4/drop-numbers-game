import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import { MyAppState } from '@/types';

const CurrentBlock = () => {
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);

  return (
    <div
      className={`${styles.cell} ${currentBlock.color} ${currentBlock.textSize} ${currentBlock.topColor} ${currentBlock.leftColor} ${currentBlock.borderColor} border-4 flex justify-center items-center text-white`}
    >
      {currentBlock.num}
    </div>
  );
};

export default CurrentBlock;
