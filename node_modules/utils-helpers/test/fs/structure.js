'use strict';

const fsUtilsRead = 'text';
const fsUtils = 'one\ntwo\nthree\nfour\n';

const structure = {
    data: {
        data2: {
            'file.txt': ''
        },
        'fs-utils-read.txt': fsUtilsRead,
        'fs-utils.txt': fsUtils
    }
};

const jsonOperationData = '{"testData": "text", "testDict": {"data": "text2"}, "testData2": "text3"}';

module.exports = { structure, jsonOperationData };
