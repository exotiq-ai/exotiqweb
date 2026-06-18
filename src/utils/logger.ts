// Centralized logging utility

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private isProduction = import.meta.env.PROD;

  private log(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();

    // Console logging
    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(`[${timestamp}] ${message}`, context || '');
        }
        break;
      case 'info':
        console.info(`[${timestamp}] ${message}`, context || '');
        break;
      case 'warn':
        console.warn(`[${timestamp}] ${message}`, context || '');
        break;
      case 'error':
        console.error(`[${timestamp}] ${message}`, context || '');
        break;
    }

    // Send to analytics in production
    if (this.isProduction && window.gtag) {
      window.gtag('event', `log_${level}`, {
        event_category: 'Logging',
        event_label: message,
        value: level === 'error' ? 1 : 0
      });
    }

    // Send errors to error tracking service (if configured)
    if (level === 'error' && this.isProduction) {
      // TODO: Integrate with error tracking service (e.g., Sentry)
    }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  // Performance logging
  performance(metricName: string, value: number, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(`[Performance] ${metricName}: ${value}ms`, context || '');
    }

    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: metricName,
        value: Math.round(value),
        ...context
      });
    }
  }

  // User action logging
  userAction(action: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(`[User Action] ${action}`, context || '');
    }

    if (window.gtag) {
      window.gtag('event', action, {
        event_category: 'User Action',
        ...context
      });
    }
  }
}

export const logger = new Logger();
export default logger;







