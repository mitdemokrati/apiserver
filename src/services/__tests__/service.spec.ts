jest.mock('axios');
jest.mock('~/utilities/logger');

import axios from 'axios';
import logger from '~/utilities/logger';

import {get, post} from '~/services/service';

const mockedAxios = axios as any;
mockedAxios.mockResolvedValue();

const testUrl = 'testUrl';
const testOptions = {
    data: [
        'some data',
    ],
};

describe('the service', () => {
    beforeEach(() => {
        mockedAxios.mockReset();
    });

    it('makes get request using axios with provided url and options', () => {
        const expectedAxiosConfig = {
            ...testOptions,
            method: 'get',
            url: testUrl,
        };

        get(testUrl, testOptions);

        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(expectedAxiosConfig);
    });

    it('makes post requests using axios with provided url and options', () => {
        const expectedAxiosConfig = {
            ...testOptions,
            method: 'post',
            url: testUrl,
        };

        post(testUrl, testOptions);

        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(expectedAxiosConfig);
    });

    it('returns the response data', async () => {
        expect.assertions(1);

        const testResponse = {
            data: 'testData',
        };

        mockedAxios.mockResolvedValueOnce(testResponse);

        const response = await get(testUrl);

        expect(response).toEqual(testResponse.data);
    });

    it('logs an error on exception', async () => {
        expect.assertions(2);

        const testError = Error('testError');

        mockedAxios.mockRejectedValueOnce(testError);

        await get(testUrl);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(testError);
    });
});
