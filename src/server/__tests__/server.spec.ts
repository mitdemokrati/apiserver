jest.mock('koa');

import Koa from 'koa';

import server from '/server/server';

describe('the server', () => {
    it('starts a koa server', () => {
        server();

        expect(Koa).toHaveBeenCalledTimes(1);
    });
});
