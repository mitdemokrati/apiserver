import config from 'config';
import Koa from 'koa';

import errorHandler from '~/middleware/server/errorHandler';
import {getLatestVoteId} from '~/services/latestVoteIdService';

const PORT = config.get('server.port') as string;

export default () => {
  const app = new Koa();

  app.use(errorHandler);

  app.use(async (ctx) => {
    const latestId = await getLatestVoteId();
    ctx.body = `LatestId is ${latestId.id} @ ${latestId.date}`;
  });

  app.listen(PORT);
};
