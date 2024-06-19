import morgan from 'morgan'; // Importing morgan for HTTP request logging
import logger from '../utils/logger'; // Importing custom logger utility

// Define a morgan middleware instance for logging HTTP requests
const httpLogger = morgan('tiny', {
    stream: {
        write: (message) => logger.http(message.trim()), // Define stream function to write log messages to custom logger
    },
});

export { httpLogger }; // Export the httpLogger middleware for use in Express application
