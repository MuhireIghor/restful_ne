import winston from 'winston';

const { combine, timestamp, json } = winston.format;

// Define logger instance with Winston
const logger = winston.createLogger({
  level: 'http', // Log level set to 'http' for HTTP requests
  format: combine(timestamp(), json()), // Formats log entries with timestamp and JSON format
  transports: [
    // Array to hold production transports (not specified here)
  ] 
});

// Add Console transport for non-production environments (like development)
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Simple format for console logs in non-production environments
  }));
}

export { logger as default };
