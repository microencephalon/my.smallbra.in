const fs = require('fs');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Create 'logs' directory if it doesn't exist
const dir = 'backend/logs';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Custom log format
const logFormat = winston.format.printf(
  ({ level, message, timestamp, meta }) => {
    return `${timestamp} [${level}]: ${message} ${
      meta ? JSON.stringify(meta) : ''
    }`;
  }
);

// Custom JSON format to place timestamp first
const customJsonFormat = winston.format.printf(
  ({ level, message, timestamp, meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      meta,
    });
  }
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), customJsonFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: 'backend/logs/%DATE%/error.log',
      datePattern: 'YYYY/MM/DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      createTree: true,
    }),
    new winston.transports.File({ filename: 'backend/logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      ),
    })
  );
}

module.exports = logger;
