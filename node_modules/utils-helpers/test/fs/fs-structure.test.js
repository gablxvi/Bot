'use strict';

const Path = require('path');
const { createFsStructure, createTempFolder, deleteTempFolderByTag, exists, readFile } = require('../../src/fs');

describe('test createFsStructure', () => {
    const tempFolderTag = 'structure';

    afterAll(async () => {
        await deleteTempFolderByTag(tempFolderTag);
    });

    it('should create files and folders', async () => {
        const structure = {
            'textFile.txt': 'text',
            folder: {
                'textFile2.txt': 'text2'
            }
        };

        const folderPath = await createTempFolder(tempFolderTag);
        await createFsStructure(folderPath, structure);

        expect(await exists(Path.join(folderPath, 'textFile.txt'))).toBeTruthy();
        expect(await exists(Path.join(folderPath, 'folder'))).toBeTruthy();
        expect(await exists(Path.join(folderPath, 'folder', 'textFile2.txt'))).toBeTruthy();
        expect(await readFile(Path.join(folderPath, 'folder', 'textFile2.txt'))).toMatch('text2');
    });
});
