'use strict';

const Path = require('path');

const { appendFile, createPath } = require('./fs-basic');

const FOLDER = 'FOLDER';
const FILE = 'FILE';

/**
 * @typedef {Object.<string, structureType | string>} structureType
 */

/**
 * Return type of item (FOLDER, FILE)
 *
 * @param {structureType | string} item - item to check
 * @returns {string}
 */
const getType = (item) => {
    if (typeof item === 'string') return FILE;
    return FOLDER;
};

/**
 * Create folders and files
 *
 * @async
 * @param {string} path - path to root directory
 * @param {structureType} structure - structure to create
 * @returns {Promise<void>}
 */
const createFsStructure = async (path, structure) => {
    await createPath(path);

    const createFc = {
        [FOLDER]: createFsStructure,
        [FILE]: appendFile
    };

    for (const item in structure) {
        const type = getType(structure[item]);
        await createFc[type](Path.join(path, item), structure[item]);
    }
};

module.exports = { createFsStructure };
