// @ts-nocheck
'use client';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Context } from '../context';
import { useState } from 'react';
import { THEME } from './constants/paging';

const inter = Inter({ subsets: ['latin'] });

export default function App({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<string>(THEME.LIGHT);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ appearance, setAppearance }}>
        <Theme
          appearance={appearance}
          accentColor="amber"
          grayColor="sand"
          radius="small"
          scaling="95%"
        >
          <main>
            {/* <Nav /> */}
            {children}
          </main>
        </Theme>
      </Context.Provider>
    </QueryClientProvider>
  );
}
