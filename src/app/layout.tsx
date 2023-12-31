import { type FC } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:       'Horus',
  description: 'Generated by create next app'
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );

};

export default RootLayout;
