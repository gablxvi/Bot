'use strict';

const http = require('http');
const https = require('https');
const { URL } = require('url');

/**
 * @typedef {{
 *      statusCode: number,
 *      statusMessage: string,
 *      headers: import('http').IncomingHttpHeaders,
 *      body: string
 * }} response - response type
 */

/**
 * @typedef { import('http').OutgoingHttpHeaders } headers
 */

/**
 * Internal request function
 *
 * @param {string} method - GET, POST, PUT, PATCH, DELETE
 * @param {string} url - url address
 * @param {*} payload - payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const request = (method, url, payload, headers) => {
    const parsedUrl = new URL(url);
    const options = {
        method,
        headers
    };
    return new Promise((resolve, reject) => {
        const service = parsedUrl.protocol === 'https' ? https : http;
        const req = service.request(url, options, (response) => {
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => {
                resolve({
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage,
                    headers: response.headers,
                    body: body.join('')
                });
            });
        });
        if (!!payload) {
            req.write(payload);
        }
        req.on('error', (err) => reject(err));
        req.end();
    });
};

/**
 * GET request
 *
 * @param {string} url - url address
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const get = (url, headers) => {
    return request('GET', url, null, headers);
};

/**
 * POST request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const post = (url, payload, headers) => {
    return request('POST', url, payload, headers);
};

/**
 * PUT request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const put = (url, payload, headers) => {
    return request('PUT', url, payload, headers);
};

/**
 * PATCH request
 *
 * @param {string} url - url address
 * @param {*} payload
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const patch = (url, payload, headers) => {
    return request('PATCH', url, payload, headers);
};

/**
 * DELETE request
 *
 * @param {string} url - url address
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
const del = (url, headers) => {
    return request('DELETE', url, null, headers);
};

module.exports = {
    get,
    post,
    put,
    patch,
    delete: del
};
