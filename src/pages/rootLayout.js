import Head from "next/head";

import { Inter } from "next/font/google";
const fontInter = Inter({ subsets: ["latin"] });

import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Davorama</title>
        <meta name="description" content="Welcome to Davorama" />
      </Head>
      <main className={fontInter.className}>
        <Header />
        {children}
      </main>
    </>
  );
}
