import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyBrowserFixes, detectBrowser } from './utils/mobileDetect';
import logger from './utils/logger';

// Mobile browser detection and fixes
const browserInfo = detectBrowser();
logger.info('Browser detected', browserInfo);

// Apply browser-specific fixes
applyBrowserFixes();

if (browserInfo.isMobile) {
  logger.info('Mobile device detected - starting React app', { userAgent: navigator.userAgent });
}

// Add error handling for React loading
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  if (browserInfo.isMobile) {
    logger.info('React app started successfully on mobile');
  } else {
    logger.info('React app started successfully');
  }
} catch (error) {
  logger.error('Failed to start React app', { error });
  if (browserInfo.isMobile) {
    logger.error('Mobile React loading failed', { error, userAgent: navigator.userAgent });
  }
}
