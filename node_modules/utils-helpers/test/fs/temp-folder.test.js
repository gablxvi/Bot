'use strict';

const { deleteTempFolderByTag, createTempFolder, getTempFolderPathByTag, exists } = require('../../src/fs');

describe('test temporally folder', () => {
    describe('text createTempFolder', () => {
        const folderTag = 'createFolder';

        afterAll(async () => {
            await deleteTempFolderByTag(folderTag);
        });

        it('should crete temporary folder', async () => {
            const folderPath = await createTempFolder(folderTag);
            expect(await exists(folderPath)).toBeTruthy();
        });
    });

    describe('test deleteTempFolderByTag', () => {
        it('should delete temporary folder', async () => {
            const folderTag = 'deleteFolder';
            const folderPath = await createTempFolder(folderTag);

            expect(await exists(folderPath)).toBeTruthy();

            await deleteTempFolderByTag(folderTag);
            expect(await exists(folderPath)).toBeFalsy();
        });
    });

    describe('test getTempFolderPathByTag', () => {
        const folderTag = 'getFolder';

        afterAll(async () => {
            await deleteTempFolderByTag(folderTag);
        });

        it('should check folder path', async () => {
            const folderPath = await createTempFolder(folderTag);

            expect(await getTempFolderPathByTag(folderTag)).toMatch(folderPath);
        });
    });
});
