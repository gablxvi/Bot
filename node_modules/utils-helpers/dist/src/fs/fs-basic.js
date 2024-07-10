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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var fs = require('fs');
var Path = require('path');
var readline = require('readline');
/**
 * Rethrow exception other then ENOENT
 *
 * @param {Error} err
 */
var checkENOENT = function (err) {
    if (err.code !== 'ENOENT')
        throw err;
};
/**
 * Return readline interface and readStream for file
 *
 * @param {string} path - path to file
 * @returns {{lines: readline.Interface, readStream: fs.ReadStream}}
 */
var readLines = function (path) {
    var readStream = fs.createReadStream(path);
    var lines = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });
    return { lines: lines, readStream: readStream };
};
/**
 * Return text from the line
 *
 * @param {string} path - path to file
 * @param {number} lineNumber - number of the line
 * @returns {Promise<string>}
 */
var getLine = function (path, lineNumber) {
    return new Promise(function (resolve, reject) {
        var _a = readLines(path), lines = _a.lines, readStream = _a.readStream;
        var index = 0;
        lines.on('line', function (line) {
            if (index === lineNumber) {
                lines.close();
                readStream.close();
                resolve(line);
            }
            index++;
        });
        lines.on('error', reject);
        readStream.on('error', reject);
        readStream.on('end', function () {
            resolve(null);
        });
    });
};
/**
 * Return number of the lines in the file
 *
 * @param {string} path - path to file
 * @returns {Promise<number>}
 */
var getLineCount = function (path) {
    return new Promise(function (resolve, reject) {
        var _a = readLines(path), lines = _a.lines, readStream = _a.readStream;
        var linesCount = 0;
        lines.on('line', function (line) {
            linesCount++;
        });
        lines.on('error', function (err) {
            reject(err);
        });
        readStream.on('error', function (err) {
            reject(err);
        });
        lines.on('close', function () {
            resolve(linesCount);
        });
    });
};
/**
 * Delete file
 *
 * @async
 * @param {string} path - path to file
 * @returns {Promise<void>}
 */
var deleteFile = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.promises.unlink(path)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                checkENOENT(err_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Create new file (and path to file is is necessary)
 *
 * @async
 * @param {string} path - path to file
 * @returns {Promise<void>}
 */
var createFile = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var fileInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileInfo = Path.parse(path);
                return [4 /*yield*/, createPath(fileInfo.dir)];
            case 1:
                _a.sent();
                return [2 /*return*/, fs.promises.appendFile(path, '')];
        }
    });
}); };
/**
 * Write text at the end of the file or create new file (and path to file is is necessary) and write tet
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text to append
 * @returns {Promise<void>}
 */
var appendFile = function (path, text) { return __awaiter(void 0, void 0, void 0, function () {
    var fileInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileInfo = Path.parse(path);
                return [4 /*yield*/, createPath(fileInfo.dir)];
            case 1:
                _a.sent();
                return [2 /*return*/, fs.promises.appendFile(path, text)];
        }
    });
}); };
/**
 * Create folder (and path to folder is is necessary)
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
var createPath = function (path) {
    return fs.promises.mkdir(path, { recursive: true });
};
/**
 * Delete folder and all content
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
var deleteFolder = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var fullContent, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, getFolderContent(path)];
            case 1:
                fullContent = _a.sent();
                return [4 /*yield*/, Promise.all(fullContent.map(function (item) {
                        if (item.isDirectory())
                            return deleteFolder(Path.join(path, item.name));
                        return deleteFile(Path.join(path, item.name));
                    }))];
            case 2:
                _a.sent();
                return [4 /*yield*/, fs.promises.rmdir(path)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                checkENOENT(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Check if file or folder exists
 *
 * @param {string} path - path to file
 * @returns {Promise<boolean>}
 */
var exists = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.promises.access(path, fs.constants.F_OK)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                err_3 = _a.sent();
                checkENOENT(err_3);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Rewrite file with text
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text
 * @returns {Promise<void>}
 */
var rewriteFile = function (path, text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exists(path)];
            case 1:
                if (_a.sent()) {
                    return [2 /*return*/, fs.promises.writeFile(path, text)];
                }
                return [2 /*return*/, appendFile(path, text)];
        }
    });
}); };
/**
 * Return text content of the file
 *
 * @param {string} path - path to the file
 * @returns {Promise<string>}
 */
var readFile = function (path) {
    return fs.promises.readFile(path, { encoding: 'utf-8' });
};
/**
 * Update nth line
 *
 * @async
 * @param {string} path - path to file
 * @param {number} lineNumber - number fo the line to update
 * @param {string} text - text
 * @returns {Promise<void>}
 */
var updateLine = function (path, lineNumber, text) { return __awaiter(void 0, void 0, void 0, function () {
    var newFilePath, lines, writeSteam, index, lines_1, lines_1_1, line, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newFilePath = path + "~";
                lines = readLines(path).lines;
                writeSteam = fs.createWriteStream(newFilePath);
                index = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 12]);
                lines_1 = __asyncValues(lines);
                _b.label = 2;
            case 2: return [4 /*yield*/, lines_1.next()];
            case 3:
                if (!(lines_1_1 = _b.sent(), !lines_1_1.done)) return [3 /*break*/, 5];
                line = lines_1_1.value;
                writeSteam.write(index === lineNumber ? text + "\n" : line + "\n");
                index++;
                _b.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _b.trys.push([7, , 10, 11]);
                if (!(lines_1_1 && !lines_1_1.done && (_a = lines_1["return"]))) return [3 /*break*/, 9];
                return [4 /*yield*/, _a.call(lines_1)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12:
                writeSteam.close();
                return [4 /*yield*/, deleteFile(path)];
            case 13:
                _b.sent();
                return [4 /*yield*/, fs.promises.rename(newFilePath, path)];
            case 14:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Copy file
 *
 * @param {string} sourceFilePath - path of the source file
 * @param {string} newFilePath - path where to paste new file
 * @returns {Promise<void>}
 */
var copyFile = function (sourceFilePath, newFilePath) {
    return fs.promises.copyFile(sourceFilePath, newFilePath);
};
/**
 * Return folder content with types
 *
 * @param {string} path - path to folder
 * @return {Promise<Dirent[]>}
 */
var getFolderContent = function (path) {
    return fs.promises.readdir(path, { withFileTypes: true });
};
/**
 * Return list of files in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
var getFilsesNames = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var fullContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFolderContent(path)];
            case 1:
                fullContent = _a.sent();
                return [2 /*return*/, fullContent.reduce(function (files, item) {
                        if (item.isFile())
                            files.push(item.name);
                        return files;
                    }, [])];
        }
    });
}); };
/**
 * Return list of folders in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
var getFoldersNames = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var fullContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFolderContent(path)];
            case 1:
                fullContent = _a.sent();
                return [2 /*return*/, fullContent.reduce(function (files, item) {
                        if (item.isDirectory())
                            files.push(item.name);
                        return files;
                    }, [])];
        }
    });
}); };
/**
 * Copy whole folder with all files and folder
 *
 * @async
 * @param {string} sourceFolderPath - path to the source folder
 * @param {string} newFolderPath - path to new folder
 * @returns {Promise<void>}
 */
var copyFolder = function (sourceFolderPath, newFolderPath) { return __awaiter(void 0, void 0, void 0, function () {
    var fullContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFolderContent(sourceFolderPath)];
            case 1:
                fullContent = _a.sent();
                return [4 /*yield*/, createPath(newFolderPath)];
            case 2:
                _a.sent();
                return [2 /*return*/, Promise.all(fullContent.map(function (item) {
                        if (item.isDirectory())
                            return copyFolder(Path.join(sourceFolderPath, item.name), Path.join(newFolderPath, item.name));
                        if (item.isFile())
                            return copyFile(Path.join(sourceFolderPath, item.name), Path.join(newFolderPath, item.name));
                    }))];
        }
    });
}); };
module.exports = {
    readLines: readLines,
    getLine: getLine,
    createFile: createFile,
    deleteFile: deleteFile,
    appendFile: appendFile,
    createPath: createPath,
    deleteFolder: deleteFolder,
    exists: exists,
    rewriteFile: rewriteFile,
    readFile: readFile,
    updateLine: updateLine,
    getLineCount: getLineCount,
    copyFile: copyFile,
    copyFolder: copyFolder,
    getFilsesNames: getFilsesNames,
    getFoldersNames: getFoldersNames,
    checkENOENT: checkENOENT
};
//# sourceMappingURL=fs-basic.js.map