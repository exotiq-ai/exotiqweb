import { useEffect, useState } from 'react';
import { X, Clock, Flame } from 'lucide-react';
import { founderConfig } from '../../data/pricingData';

export default function FounderBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isDismissed, setIsDismissed] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = founderConfig.deadline.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Don't show if dismissed or expired
  if (isDismissed || !isActive) return null;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FF5733] via-[#FF5733] to-[#E04020] border-b border-[#FF5733]/50 shadow-xl animate-pulse-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/30 rounded-full text-xs font-bold text-white">
                <Flame className="w-3 h-3" />
                FOUNDER PRICING
              </span>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-white" />
                <span className="font-montserrat text-sm font-bold text-white">
                  Expires: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              </div>
            </div>
            <p className="font-montserrat text-base sm:text-lg font-bold text-white">
              Lock in lifetime rates as a founding member • Your rate never increases
              <span className="hidden sm:inline font-normal text-white/90 ml-2">
                • Limited to first {founderConfig.spotsRemaining} fleets
              </span>
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
