import mongoose from 'mongoose';

const LatestVoteIdSchema = new mongoose.Schema({
  date: Date,
  id: { type: Number, required: true },
});

export default LatestVoteIdSchema;
