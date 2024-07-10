/// <reference types="node" />
/**
 * - response type
 */
export type response = {
    statusCode: number;
    statusMessage: string;
    headers: import('http').IncomingHttpHeaders;
    body: string;
};
export type headers = import("http").OutgoingHttpHeaders;
/**
 * GET request
 *
 * @param {string} url - url address
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
export function get(url: string, headers: headers): Promise<response>;
/**
 * POST request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
export function post(url: string, payload: any, headers: headers): Promise<response>;
/**
 * PUT request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
export function put(url: string, payload: any, headers: headers): Promise<response>;
/**
 * PATCH request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
export function patch(url: string, payload: any, headers: headers): Promise<response>;
/**
 * DELETE request
 *
 * @param {string} url - url address
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
declare function del(url: string, headers: headers): Promise<response>;
export { del as delete };
