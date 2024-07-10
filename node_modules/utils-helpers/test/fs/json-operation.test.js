'use strict';

const Path = require('path');
const { updateJson, getJsonData } = require('../../src/fs/json-operation');
const { createTempFolder, deleteTempFolderByTag, rewriteFile } = require('../../src/fs');
const { jsonOperationData } = require('./structure');

describe('test json-operation', () => {
    const tempFolderTag = 'jsonOperations';
    let path = '';

    beforeAll(async () => {
        path = await createTempFolder(tempFolderTag);
    });

    afterAll(async () => {
        await deleteTempFolderByTag(tempFolderTag);
    });

    describe(('test getJsonData'), () => {
        const readFile = 'readFile.json';
        beforeAll(async () => {
            await rewriteFile(Path.join(path, readFile), jsonOperationData);
        });

        it('should return data', async () => {
            const data = await getJsonData(Path.join(path, readFile));
            expect(data).toMatchObject(JSON.parse(jsonOperationData));
        });
    });

    describe('test updateJson', () => {
        it('should update json', async () => {
            const originalData = JSON.parse(jsonOperationData);
            const filePath = Path.join(path, 'updateFile.json');
            await rewriteFile(filePath, jsonOperationData);

            await updateJson(filePath, 'testData', 'newValue');
            const newObject = { ...originalData, testData: 'newValue' };
            expect(await getJsonData(filePath)).toMatchObject(newObject);

            await updateJson(filePath, '"testDict"."data"', 'newValue2');
            expect((await getJsonData(filePath)).testDict.data).toMatch('newValue2');

            await updateJson(filePath, 'testDict', undefined);
            expect((await getJsonData(filePath)).testDict).toBeUndefined();
        });
    });
});
