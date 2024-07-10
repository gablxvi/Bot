'use strict';

const os = require('os');
const Path = require('path');

const { exists, createPath, getFoldersNames, deleteFolder } = require('./fs-basic');
const utils = require('../utils');

/**
 * Crate temporally folder
 *
 * @async
 * @param {string=} tag - tag for folder name
 * @returns {Promise<string>}
 */
const createTempFolder = async (tag) => {
    const tmpDir = os.tmpdir();
    let path = '';
    do {
        const random = utils.randHex(10);
        const folderName = !!tag ? `tmpdir-${random}-${tag}` : `tmpdir-${random}`;
        path = Path.join(tmpDir, folderName);
    } while (await exists(path));

    await createPath(path);

    return path;
};

/**
 * Check if folder is tmpdir and contain tag
 *
 * @param {*} tag - tag to find
 * @param {*} folderName - folder name to check
 * @returns {boolean}
 */
const isTempFolder = (tag, folderName) => {
    const regexp = new RegExp(`^tmpdir-[0-9a-fA-F]{10}-${tag}$`);
    return regexp.test(folderName);
};

/**
 * Delete all temp folders with tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<void>}
 */
const deleteTempFolderByTag = async (tag) => {
    const tmpDir = os.tmpdir();
    const folderNames = await getFoldersNames(tmpDir);
    for (const folderName of folderNames) {
        if (isTempFolder(tag, folderName)) await deleteFolder(Path.join(tmpDir, folderName));
    }
};

/**
 * Get folder path by tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<string>}
 */
const getTempFolderPathByTag = async (tag) => {
    const tmpDir = os.tmpdir();
    const folderNames = await getFoldersNames(tmpDir);
    for (const folderName of folderNames) {
        if (isTempFolder(tag, folderName)) return Path.join(tmpDir, folderName);
    }
};

module.exports = {
    createTempFolder,
    deleteTempFolderByTag,
    getTempFolderPathByTag
};
