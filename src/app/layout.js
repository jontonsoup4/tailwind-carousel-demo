import { Inter } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tailwind Carousel Demo',
  description: 'A simple carousel component built with Tailwind CSS and React.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, 'h-full')}>{children}</body>
    </html>
  );
}

export default RootLayout;
