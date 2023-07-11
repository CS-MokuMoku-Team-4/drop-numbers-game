import styles from '../../styles/Home.module.scss';

const TitleSVG = () => {
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
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#fff'
          strokeWidth='0.6rem'
          strokeLinejoin='round'
        >
          Let&apos;s Play
        </text>
        <text
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#002e8a'
          strokeWidth='0.3rem'
          strokeLinejoin='round'
        >
          Let&apos;s Play
        </text>
        <text
          fill='url(#gradient100)'
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          Let&apos;s Play
        </text>
        <defs>
          <linearGradient id='gradient100' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#0050b9' />
            <stop offset='100%' stopColor='#ffffff' />
          </linearGradient>
        </defs>
      </svg>
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
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#fff'
          strokeWidth='0.6rem'
          strokeLinejoin='round'
        >
          Drop Number
        </text>
        <text
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#002e8a'
          strokeWidth='0.3rem'
          strokeLinejoin='round'
        >
          Drop Number
        </text>
        <text
          fill='url(#gradient100)'
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          Drop Number
        </text>
        <defs>
          <linearGradient id='gradient100' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#0050b9' />
            <stop offset='100%' stopColor='#ffffff' />
          </linearGradient>
        </defs>
      </svg>
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
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#fff'
          strokeWidth='0.6rem'
          strokeLinejoin='round'
        >
          Game!
        </text>
        <text
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#002e8a'
          strokeWidth='0.3rem'
          strokeLinejoin='round'
        >
          Game!
        </text>
        <text
          fill='url(#gradient100)'
          x='50%'
          y='50%'
          fontSize='2.5rem'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          Game!
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

export default TitleSVG;
