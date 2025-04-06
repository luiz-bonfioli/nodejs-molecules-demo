/**
 * Logger utility class for standardized console logging with timestamps and log levels.
 */
class Logger {
    /**
     * Returns the current timestamp in ISO format.
     * Used to prefix all log messages for consistent timing information.
     */
    static getTimestamp() {
        return new Date().toISOString();
    }

    /**
     * Logs a standard message to the console with the [LOG] level.
     * @param message - The message to log.
     */
    static log(message: string) {
        console.log(`[${this.getTimestamp()}] [LOG] ${message}`);
    }

    /**
     * Logs an informational message to the console with the [INFO] level.
     * @param message - The informational message.
     */
    static info(message: string) {
        console.info(`[${this.getTimestamp()}] [INFO] ${message}`);
    }

    /**
     * Logs a warning message to the console with the [WARN] level.
     * @param message - The warning message.
     */
    static warn(message: string) {
        console.warn(`[${this.getTimestamp()}] [WARN] ${message}`);
    }

    /**
     * Logs an error message to the console with the [ERROR] level.
     * Also includes the error object for more detailed output.
     * @param message - Description of the error.
     * @param error - The error object or message.
     */
    static error(message: string, error: any) {
        console.error(`[${this.getTimestamp()}] [ERROR] ${message}: ${error}`);
    }

    /**
     * Logs a debug message to the console with the [DEBUG] level.
     * This will only be logged when NODE_ENV is set to 'development'.
     * @param message - The debug message.
     */
    static debug(message: string) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`);
        }
    }
}

export default Logger;
