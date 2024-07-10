'use strict';

const fsBasic = require('./fs-basic');
const fsStructure = require('./fs-structure');
const tempFolder = require('./temp-folder');
const jsonOperation = require('./json-operation');

module.exports = {
    ...fsBasic,
    ...fsStructure,
    ...tempFolder,
    ...jsonOperation
};
