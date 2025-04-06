import Logger from '../src/core/logger';

describe('Logger', () => {
    const originalEnv = process.env;
    const mockConsole = {
        log: jest.spyOn(console, 'log').mockImplementation(() => {}),
        info: jest.spyOn(console, 'info').mockImplementation(() => {}),
        warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
        error: jest.spyOn(console, 'error').mockImplementation(() => {}),
        debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv }; // reset env between tests
    });

    afterAll(() => {
        process.env = originalEnv; // restore original env
        jest.restoreAllMocks();
    });

    it('should log with [LOG] level', () => {
        Logger.log('test log');
        expect(mockConsole.log).toHaveBeenCalledWith(expect.stringContaining('[LOG] test log'));
    });

    it('should log with [INFO] level', () => {
        Logger.info('info message');
        expect(mockConsole.info).toHaveBeenCalledWith(expect.stringContaining('[INFO] info message'));
    });

    it('should log with [WARN] level', () => {
        Logger.warn('warn message');
        expect(mockConsole.warn).toHaveBeenCalledWith(expect.stringContaining('[WARN] warn message'));
    });

    it('should log with [ERROR] level and error message', () => {
        Logger.error('error occurred', 'SomeError');
        expect(mockConsole.error).toHaveBeenCalledWith(expect.stringContaining('[ERROR] error occurred: SomeError'));
    });

    it('should log debug message in development mode', () => {
        process.env.NODE_ENV = 'development';
        Logger.debug('debug message');
        expect(mockConsole.debug).toHaveBeenCalledWith(expect.stringContaining('[DEBUG] debug message'));
    });

    it('should not log debug message outside development mode', () => {
        process.env.NODE_ENV = 'production';
        Logger.debug('should not log');
        expect(mockConsole.debug).not.toHaveBeenCalled();
    });
});
