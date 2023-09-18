import styles from '../../styles/Home.module.scss';

const AreYouReadySVG = () => {
  return (
    <div className={`${styles.shadow_container} flex-row`}>
      <svg
        viewBox='0 0 320 70'
        width='320'
        height='70'
        xmlns='http://www.w3.org/2000/svg'
        display='inline-block'
      >
        <text
          x='50%'
          y='50%'
          fontSize='2.2rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#fff'
          strokeWidth='0.6rem'
          strokeLinejoin='round'
        >
          Are You Ready?
        </text>
        <text
          x='50%'
          y='50%'
          fontSize='2.2rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#002e8a'
          strokeWidth='0.3rem'
          strokeLinejoin='round'
        >
          Are You Ready?
        </text>
        <text
          fill='url(#gradient100)'
          x='50%'
          y='50%'
          fontSize='2.2rem'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          Are You Ready?
        </text>
        <defs>
          <linearGradient id='gradient100' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#0050b9' />
            <stop offset='100%' stopColor='#ffffff' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AreYouReadySVG;
