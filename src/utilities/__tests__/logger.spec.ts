/* tslint:disable:no-console */

import Log from '/utilities/logger';

console.error = jest.fn();
console.log = jest.fn();

describe('the logger', () => {
    it('logs errors to console', () => {
        const error = new Error('testError');

        Log.error(error);

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(error);
    });

    it('logs info to console', () => {
        const message = 'test info';

        Log.info(message);

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(message);
    });
});
