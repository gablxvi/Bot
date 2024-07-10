'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('./fs-basic'), readFile = _a.readFile, rewriteFile = _a.rewriteFile;
var setValueByKeys = function (keys, value, object) {
    var _a, _b;
    var key = keys.shift();
    if (keys.length === 0)
        return __assign(__assign({}, object), (_a = {}, _a[key] = value, _a));
    return __assign(__assign({}, object), (_b = {}, _b[key] = setValueByKeys(keys, value, object[key]), _b));
};
/**
 * Update json key
 *
 * @param {string} path - path to json file
 * @param {*} key - key (parameter or "parameter"."parameter2")
 * @param {*} value - new value (could be string, number, undefined, null, object, ...)
 * @returns {Promise<void>}
 */
var updateJson = function (path, key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData, keys, newJsonData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getJsonData(path)];
            case 1:
                jsonData = _a.sent();
                keys = key.split('"."').map(function (item) { return item.replace('"', ''); });
                newJsonData = setValueByKeys(keys, value, jsonData);
                return [4 /*yield*/, savePrettyJson(path, newJsonData)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Save prettified json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @param {T} data - json data to save
 */
var savePrettyJson = function (path, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rewriteFile(path, JSON.stringify(data, null, 2))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Get json data
 *
 * @async
 * @template T
 * @param {string} path - path to json file
 * @returns {Promise<T>}
 */
var getJsonData = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readFile(path)];
            case 1:
                rawData = _a.sent();
                data = JSON.parse(rawData);
                return [2 /*return*/, data];
        }
    });
}); };
module.exports = {
    updateJson: updateJson,
    getJsonData: getJsonData,
    savePrettyJson: savePrettyJson
};
//# sourceMappingURL=json-operation.js.map