'use client';


import { cn } from '@/lib';
import { useThemeStore } from '@/store';
import { useGlobalStateStore } from '@/store/global-store';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { openSidebar } = useGlobalStateStore();
  const { theme, radius } = useThemeStore();
 
  return (
    <body
      className={cn(inter.className, 'theme-' + theme)}
      style={
        {
          '--radius': `${radius}rem`,
        } as React.CSSProperties
      }
    >
      <ThemeProvider
        attribute='class'
        enableSystem={false}
        defaultTheme='light'
      >
        {children}
      </ThemeProvider>
    </body>
  );
};
