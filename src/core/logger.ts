class Logger {
    static getTimestamp() {
        return new Date().toISOString();
    }

    static log(message: string) {
        console.log(`[${this.getTimestamp()}] [LOG] ${message}`);
    }

    static info(message: string) {
        console.info(`[${this.getTimestamp()}] [INFO] ${message}`);
    }

    static warn(message: string) {
        console.warn(`[${this.getTimestamp()}] [WARN] ${message}`);
    }

    static error(message: string, error: any) {
        console.error(`[${this.getTimestamp()}] [ERROR] ${message}: ${error}`);
    }

    static debug(message: string) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`);
        }
    }
}

export default Logger;