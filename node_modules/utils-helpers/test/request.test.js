'use strict';

const request = require('../src/request');

describe('test request utils', () => {
    const serverPath = 'http://httpbin.org/';
    describe('test get', () => {
        it('should do something', async () => {
            const data = await request.get(serverPath);
            expect(data.statusCode).toBe(200);
        });
    });
});
