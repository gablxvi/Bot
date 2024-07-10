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
var fsBasic = require('./fs-basic');
var fsStructure = require('./fs-structure');
var tempFolder = require('./temp-folder');
var jsonOperation = require('./json-operation');
module.exports = __assign(__assign(__assign(__assign({}, fsBasic), fsStructure), tempFolder), jsonOperation);
//# sourceMappingURL=index.js.map