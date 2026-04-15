import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
    title: 'Syntra - AI Powered Chatbot',
    description: 'Syntra is an AI-powered chatbot that helps you with your tasks. It can be used for customer support, lead generation, and more.',
    appleWebApp: {
        title: 'Syntra',
    },
};

export default function Layout({ children }) {
  
    return (
        <div className={`${inter.className}`}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
