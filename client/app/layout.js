import './globals.css';
import LenisScroll from '../components/lenis-scroll';
import QueryProvider from './QueryProvider';
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' className='dark'>
            <LenisScroll />
            <body className={`${inter.className}`}>
                <QueryProvider>
                    {children}
                     <Toaster theme='dark'/>
                </QueryProvider>
            </body>
        </html>
    );
}
