jest.mock('~/services/service', () => ({
    get: jest.fn()
        .mockReturnValueOnce(new Promise((resolve) => {resolve({value: [{Møde: Date.UTC, id: 1}]}); }))
        .mockReturnValueOnce(new Promise((resolve) => {resolve(); })),
}));

jest.mock('~/utilities/logger', () => ({
    error: jest.fn(),
}));

import config from 'config';

import {getLatestVoteId} from '~/services/latestVoteIdService';
import {get} from '~/services/service';
import Log from '~/utilities/logger';

const expectedUrl = config.get('endpoints.latestVoteId') as string;

describe('the newestVoteId service', () => {
    it('calls service.get with correct parameters', () => {
        getLatestVoteId();

        expect(get).toHaveBeenCalledTimes(1);
        expect(get).toHaveBeenCalledWith(expectedUrl);
    });

    it('logs error when result cannot be parsed', async () => {
        expect.assertions(2);

        const result = await getLatestVoteId();

        expect(result).not.toEqual(expect.anything());
        expect(Log.error).toHaveBeenCalledTimes(1);
    });
});
