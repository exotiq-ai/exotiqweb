import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(toast.id), 300); // Wait for fade out
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: {
      bg: 'bg-success-50 dark:bg-success-900/30',
      border: 'border-success-200 dark:border-success-800',
      text: 'text-success-700 dark:text-success-300',
      icon: 'text-success-600 dark:text-success-400',
    },
    error: {
      bg: 'bg-error-50 dark:bg-error-900/30',
      border: 'border-error-200 dark:border-error-800',
      text: 'text-error-700 dark:text-error-300',
      icon: 'text-error-600 dark:text-error-400',
    },
    info: {
      bg: 'bg-primary-50 dark:bg-primary-900/30',
      border: 'border-primary-200 dark:border-primary-800',
      text: 'text-primary-600 dark:text-primary-300',
      icon: 'text-primary-500 dark:text-primary-400',
    },
    warning: {
      bg: 'bg-warning-50 dark:bg-warning-900/30',
      border: 'border-warning-200 dark:border-warning-800',
      text: 'text-warning-700 dark:text-warning-300',
      icon: 'text-warning-600 dark:text-warning-400',
    },
  };

  const Icon = icons[toast.type];
  const colorScheme = colors[toast.type];

  return (
    <div
      className={`flex items-start space-x-3 p-4 rounded-lg border ${colorScheme.bg} ${colorScheme.border} shadow-lg min-w-[300px] max-w-md transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <Icon className={`w-5 h-5 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
      <p className={`flex-1 font-montserrat text-sm ${colorScheme.text}`}>{toast.message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(toast.id), 300);
        }}
        className={`flex-shrink-0 ${colorScheme.text} hover:opacity-70 transition-opacity`}
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastComponent;







