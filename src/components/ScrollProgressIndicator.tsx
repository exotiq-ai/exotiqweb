import React, { useEffect, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollAnimation';

const ScrollProgressIndicator: React.FC = () => {
  const progress = useScrollProgress();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only show on desktop and when scrolled
  if (progress === 0 || !isDesktop) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-600 to-primary-500 transition-all duration-150 ease-out shadow-lg"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;

