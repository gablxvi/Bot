'use strict';
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
var os = require('os');
var Path = require('path');
var _a = require('./fs-basic'), exists = _a.exists, createPath = _a.createPath, getFoldersNames = _a.getFoldersNames, deleteFolder = _a.deleteFolder;
var utils = require('../utils');
/**
 * Crate temporally folder
 *
 * @async
 * @param {string=} tag - tag for folder name
 * @returns {Promise<string>}
 */
var createTempFolder = function (tag) { return __awaiter(void 0, void 0, void 0, function () {
    var tmpDir, path, random, folderName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tmpDir = os.tmpdir();
                path = '';
                _a.label = 1;
            case 1:
                random = utils.randHex(10);
                folderName = !!tag ? "tmpdir-" + random + "-" + tag : "tmpdir-" + random;
                path = Path.join(tmpDir, folderName);
                _a.label = 2;
            case 2: return [4 /*yield*/, exists(path)];
            case 3:
                if (_a.sent()) return [3 /*break*/, 1];
                _a.label = 4;
            case 4: return [4 /*yield*/, createPath(path)];
            case 5:
                _a.sent();
                return [2 /*return*/, path];
        }
    });
}); };
/**
 * Check if folder is tmpdir and contain tag
 *
 * @param {*} tag - tag to find
 * @param {*} folderName - folder name to check
 * @returns {boolean}
 */
var isTempFolder = function (tag, folderName) {
    var regexp = new RegExp("^tmpdir-[0-9a-fA-F]{10}-" + tag + "$");
    return regexp.test(folderName);
};
/**
 * Delete all temp folders with tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<void>}
 */
var deleteTempFolderByTag = function (tag) { return __awaiter(void 0, void 0, void 0, function () {
    var tmpDir, folderNames, _i, folderNames_1, folderName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tmpDir = os.tmpdir();
                return [4 /*yield*/, getFoldersNames(tmpDir)];
            case 1:
                folderNames = _a.sent();
                _i = 0, folderNames_1 = folderNames;
                _a.label = 2;
            case 2:
                if (!(_i < folderNames_1.length)) return [3 /*break*/, 5];
                folderName = folderNames_1[_i];
                if (!isTempFolder(tag, folderName)) return [3 /*break*/, 4];
                return [4 /*yield*/, deleteFolder(Path.join(tmpDir, folderName))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Get folder path by tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<string>}
 */
var getTempFolderPathByTag = function (tag) { return __awaiter(void 0, void 0, void 0, function () {
    var tmpDir, folderNames, _i, folderNames_2, folderName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tmpDir = os.tmpdir();
                return [4 /*yield*/, getFoldersNames(tmpDir)];
            case 1:
                folderNames = _a.sent();
                for (_i = 0, folderNames_2 = folderNames; _i < folderNames_2.length; _i++) {
                    folderName = folderNames_2[_i];
                    if (isTempFolder(tag, folderName))
                        return [2 /*return*/, Path.join(tmpDir, folderName)];
                }
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createTempFolder: createTempFolder,
    deleteTempFolderByTag: deleteTempFolderByTag,
    getTempFolderPathByTag: getTempFolderPathByTag
};
//# sourceMappingURL=temp-folder.js.map