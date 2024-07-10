'use strict';

const utils = require('../src');

describe('tests for utils', () => {
    describe('test randHex', () => {
        it('should generate random hex number', () => {
            const length = 5;
            const hex = utils.utils.randHex(length);
            expect(hex.length).toBe(length);
            expect(hex).toMatch(/[0-9a-fA-F]+/);
        });
    });
});
