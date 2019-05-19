import mongoose from 'mongoose';

import ILatestVoteId from '~/interfaces/ILatestVoteId';

interface ILatestVoteIdInterface extends mongoose.Document, ILatestVoteId {
  id: number;
}

export default ILatestVoteIdInterface;
