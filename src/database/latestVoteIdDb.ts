import mongoose from 'mongoose';

import ILatestVoteIdInterface from '~/database/schemas/latestVoteIdInterface';
import LatestVoteIdSchema from '~/database/schemas/latestVoteIdSchema';

const LatestVoteId = mongoose.model<ILatestVoteIdInterface>('User', LatestVoteIdSchema);
