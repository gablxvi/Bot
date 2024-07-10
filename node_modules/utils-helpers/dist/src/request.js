'use strict';
var http = require('http');
var https = require('https');
var URL = require('url').URL;
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
var request = function (method, url, payload, headers) {
    var parsedUrl = new URL(url);
    var options = {
        method: method,
        headers: headers
    };
    return new Promise(function (resolve, reject) {
        var service = parsedUrl.protocol === 'https' ? https : http;
        var req = service.request(url, options, function (response) {
            var body = [];
            response.on('data', function (chunk) { return body.push(chunk); });
            response.on('end', function () {
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
        req.on('error', function (err) { return reject(err); });
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
var get = function (url, headers) {
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
var post = function (url, payload, headers) {
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
var put = function (url, payload, headers) {
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
var patch = function (url, payload, headers) {
    return request('PATCH', url, payload, headers);
};
/**
 * DELETE request
 *
 * @param {string} url - url address
 * @param {headers} headers - request headers
 * @returns {Promise<response>}
 */
var del = function (url, headers) {
    return request('DELETE', url, null, headers);
};
module.exports = {
    get: get,
    post: post,
    put: put,
    patch: patch,
    "delete": del
};
//# sourceMappingURL=request.js.map