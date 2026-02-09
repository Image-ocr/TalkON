type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogMetadata {
  [key: string]: unknown;
}

class Logger {
  private serviceName: string;
  private minLevel: LogLevel;

  constructor(serviceName: string, minLevel: LogLevel = 'info') {
    this.serviceName = serviceName;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.minLevel);
  }

  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const meta = metadata ? ` ${JSON.stringify(metadata)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] [${this.serviceName}] ${message}${meta}`;
  }

  error(message: string, error?: Error, metadata?: LogMetadata): void {
    if (!this.shouldLog('error')) return;
    const meta = {
      ...metadata,
      ...(error && {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
      }),
    };
    console.error(this.formatMessage('error', message, meta));
  }

  warn(message: string, metadata?: LogMetadata): void {
    if (!this.shouldLog('warn')) return;
    console.warn(this.formatMessage('warn', message, metadata));
  }

  info(message: string, metadata?: LogMetadata): void {
    if (!this.shouldLog('info')) return;
    console.log(this.formatMessage('info', message, metadata));
  }

  debug(message: string, metadata?: LogMetadata): void {
    if (!this.shouldLog('debug')) return;
    console.log(this.formatMessage('debug', message, metadata));
  }
}

export const createLogger = (serviceName: string, minLevel?: LogLevel): Logger => {
  return new Logger(serviceName, minLevel || (process.env.LOG_LEVEL as LogLevel) || 'info');
};

export { Logger, LogLevel };
