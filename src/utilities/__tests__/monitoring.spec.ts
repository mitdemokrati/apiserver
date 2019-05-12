jest.mock('raven', () => ({
    config: jest.fn(() => ({
        install: jest.fn(),
    })),
}));

jest.mock('config', () => ({
    get: jest.fn()
        .mockReturnValueOnce('testToken')
        .mockReturnValueOnce(''),
}));

import Raven from 'raven';

const mockRaven: jest.Mocked<Raven> = Raven as any;

describe('the monitoring', () => {
    beforeEach(() => {
        mockRaven.config.mockClear();
    });

    it('starts Raven when token is set', () => {
        const startMonitoring = require('/utilities/monitoring').default;

        startMonitoring();

        expect(Raven.config).toHaveBeenCalledTimes(1);
        expect(Raven.config).toHaveBeenCalledWith('testToken');

        jest.resetModules();
    });

    it('does not start Raven when token is missing', () => {
        const startMonitoring = require('/utilities/monitoring').default;

        startMonitoring();

        expect(Raven.config).toHaveBeenCalledTimes(0);
    });
});
