import config from 'config';
import Raven from 'raven';

const RAVEN_TOKEN = config.get('server.monitoringToken') as string;

export default () => {
    if (RAVEN_TOKEN) {
        Raven.config(RAVEN_TOKEN).install();
    }
};
