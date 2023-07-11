import styles from '../../styles/Home.module.scss';

const GameOverSVG = () => {
  return (
    <div className={`${styles.shadow_container} flex`}>
      <svg viewBox='0 0 400 70' width='400' height='70' xmlns='http://www.w3.org/2000/svg'>
        <text
          x='200'
          y='35'
          fontSize='3rem'
          textAnchor='middle'
          dominantBaseline='central'
          stroke='#fff'
          strokeWidth='0.6rem'
          strokeLinejoin='round'
        >
          Game Over...
        </text>
        <text
          x='200'
          y='35'
          fontSize='3rem'
          textAnchor='middle'
          dominantBaseline='central'
          stroke='#002e8a'
          strokeWidth='0.3rem'
          strokeLinejoin='round'
        >
          Game Over...
        </text>
        <text
          fill='url(#gradient100)'
          x='200'
          y='35'
          fontSize='3rem'
          textAnchor='middle'
          dominantBaseline='central'
        >
          Game Over...
        </text>
        <defs>
          <linearGradient id='gradient100' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#0050b9' />
            <stop offset='100%' stopColor='#fff' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GameOverSVG;
