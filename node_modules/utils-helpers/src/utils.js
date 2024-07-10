'use strict';

const syncify = async (fn) => {
    try {
        const result = await fn();
        return () => { return result; };
    } catch (e) {
        return () => { throw e; };
    }
};

/**
 * Generate random hex number
 *
 * @param {number} size - length of generated hex number
 * @returns {string}
 */
const randHex = (size) => {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

module.exports = { syncify, randHex };
