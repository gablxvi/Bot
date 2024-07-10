'use strict';

const { readFile, rewriteFile } = require('./fs-basic');

const setValueByKeys = (keys, value, object) => {
    const key = keys.shift();
    if (keys.length === 0) return { ...object, [key]: value };
    return { ...object, [key]: setValueByKeys(keys, value, object[key]) };
};

/**
 * Update json key
 *
 * @param {string} path - path to json file
 * @param {*} key - key (parameter or "parameter"."parameter2")
 * @param {*} value - new value (could be string, number, undefined, null, object, ...)
 * @returns {Promise<void>}
 */
const updateJson = async (path, key, value) => {
    const jsonData = await getJsonData(path);
    const keys = key.split('"."').map((item) => item.replace('"', ''));
    const newJsonData = setValueByKeys(keys, value, jsonData);
    await savePrettyJson(path, newJsonData);
};

/**
 * Save prettified json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @param {T} data - json data to save
 */
const savePrettyJson = async (path, data) => {
    await rewriteFile(path, JSON.stringify(data, null, 2));
};

/**
 * Get json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @returns {Promise<T>}
 */
const getJsonData = async (path) => {
    const rawData = await readFile(path);
    const data = JSON.parse(rawData);
    return data;
};

module.exports = {
    updateJson,
    getJsonData,
    savePrettyJson
};
