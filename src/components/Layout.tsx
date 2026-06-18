import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Analytics from './Analytics';
import ChatBotWidget from './ChatBot/ChatBotWidget';
import CookieConsentBanner from './CookieConsentBanner';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
      <Analytics />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBotWidget />
      <CookieConsentBanner />
    </div>
  );
}