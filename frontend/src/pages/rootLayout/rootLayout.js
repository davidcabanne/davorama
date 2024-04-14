import styled from 'styled-components';
import * as _var from '@/styles/variables';

import { Inter } from 'next/font/google';
const fontInter = Inter({ subsets: ['latin'] });

import Header from '@/components/Header';

const Page = styled.div``;

export default function RootLayout({ children }) {
  return (
    <main className={fontInter.className}>
      <Header />
      <Page>{children}</Page>
    </main>
  );
}
