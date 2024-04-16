import { Inter } from 'next/font/google';
const fontInter = Inter({ subsets: ['latin'] });

import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <main className={fontInter.className}>
      <Header />
      {children}
    </main>
  );
}
