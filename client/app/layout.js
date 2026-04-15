import './globals.css';
import LenisScroll from '../components/lenis-scroll';
import QueryProvider from './QueryProvider';
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <LenisScroll />
            <body className={`${inter.className}`}>
                <QueryProvider>
                    {children}
                     <Toaster />
                </QueryProvider>
            </body>
        </html>
    );
}
