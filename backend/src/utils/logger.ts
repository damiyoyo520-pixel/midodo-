import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message;
});

const productionFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message;
});

const createLogger = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const transports: any[] = [];

  transports.push(new winston.transports.Console({
    level: isProduction ? 'info' : 'debug',
    format: isProduction
    ? combine(timestamp(), errors({ stack: true }), productionFormat)
    : combine(colorize(), timestamp(), errors({ stack: true }), logFormat,
  }));

  if (isProduction) {
    transports.push(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: combine(timestamp(), errors({ stack: true }), productionFormat),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: combine(timestamp(), errors({ stack: true }), productionFormat),
      }),
    );
  }

  return winston.createLogger({
    levels: winston.config.npm.levels,
    transports,
  });
};

export const logger = createLogger();
