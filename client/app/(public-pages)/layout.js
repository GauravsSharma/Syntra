import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
    title: 'Syntra - AI Powered Chatbot',
    description: 'Syntra is an AI-powered chatbot that helps you with your tasks. It can be used for customer support, lead generation, and more.',
    appleWebApp: {
        title: 'Syntra',
    },
};

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
