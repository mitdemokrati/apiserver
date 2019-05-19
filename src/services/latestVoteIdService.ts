import config from 'config';

import ILatestVoteId from '~/interfaces/ILatestVoteId';
import {get} from '~/services/service';
import Log from '~/utilities/logger';

const latestVoteIdUrl = config.get('endpoints.latestVoteId') as string;

export const getLatestVoteId = async (): Promise<ILatestVoteId> => {
    const response = await get(latestVoteIdUrl);

    return parseLatestVoteId(response);
};

const parseLatestVoteId = (data): ILatestVoteId => {
    try {
        return {
            date: new Date(Date.parse(data.value[0].Møde.dato)),
            id: data.value[0].id,
        };
    } catch (err) {
        Log.error(err);
    }
};
