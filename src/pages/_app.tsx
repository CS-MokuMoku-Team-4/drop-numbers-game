import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat, Noto_Sans_JP } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['200', '400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font--montserrat',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['200', '400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font--notoSansJP',
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${montserrat.variable} ${notoSansJP.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
