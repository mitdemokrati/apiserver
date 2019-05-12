jest.mock('/utilities/logger');

import errorHandler from '/middleware/server/errorHandler';
import Log from '/utilities/logger';

const mockedLog = Log as any;

describe('the server error handler', () => {
    beforeEach(() => {
        mockedLog.error.mockClear();
    });

    it('does nothing when no errors thrown', async () => {
        const mockContext = jest.fn() as any;
        const mockNext = jest.fn();

        await errorHandler(mockContext, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith();

        expect(Log.error).toHaveBeenCalledTimes(0);
        expect(mockContext.body).toBeUndefined();
    });

    it('logs error when exception is thrown', async () => {
        const testError = Error('testError');
        const mockContext = {app: {emit: jest.fn()}};
        const mockNext = jest.fn(() => new Promise((resolve, reject) => {reject(testError); }));

        await errorHandler(mockContext, mockNext);

        expect(Log.error).toHaveBeenCalledTimes(1);
        expect(Log.error).toHaveBeenCalledWith(testError);
    });

    it('sets flags on context when exception is thrown', async () => {
        const testError = Error('testError');
        const mockContext = {app: {emit: jest.fn()}} as any;
        const mockNext = jest.fn(() => new Promise((resolve, reject) => {reject(testError); }));

        await errorHandler(mockContext, mockNext);

        expect(mockContext.status).toBe(500);
        expect(mockContext.body).toBe('testError');
        expect(mockContext.app.emit).toHaveBeenCalledTimes(1);
        expect(mockContext.app.emit).toHaveBeenCalledWith('error', testError, mockContext);
    });
});
