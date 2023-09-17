import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const OKButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.start_btn} type='button' onClick={onClick}>
      OK
    </button>
  );
};

export default OKButton;
