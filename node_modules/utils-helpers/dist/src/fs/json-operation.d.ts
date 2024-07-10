/**
 * Update json key
 *
 * @param {string} path - path to json file
 * @param {*} key - key (parameter or "parameter"."parameter2")
 * @param {*} value - new value (could be string, number, undefined, null, object, ...)
 * @returns {Promise<void>}
 */
export function updateJson(path: string, key: any, value: any): Promise<void>;
/**
 * Get json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @returns {Promise<T>}
 */
export function getJsonData<T>(path: string): Promise<T>;
/**
 * Save prettified json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @param {T} data - json data to save
 */
export function savePrettyJson<T>(path: string, data: T): Promise<void>;
