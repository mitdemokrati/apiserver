import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import logger from '~/utilities/logger';

export const get = async (url: string, options?: AxiosRequestConfig): Promise<any> => {
    const axiosConfig = {
        ...options,
        method: 'get',
        url,
    };

    return await makeRequest(axiosConfig);
};

export const post = async (url: string, options?: AxiosRequestConfig): Promise<any> => {
    const axiosConfig = {
        ...options,
        method: 'post',
        url,
    };

    return await makeRequest(axiosConfig);
};

const makeRequest = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    // Returns Promise
    return axios(config)
        .then((response) => response.data)
        .catch((error) => {
            logger.error(error);
        });
};
