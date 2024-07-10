'use strict';

const Path = require('path');

const { structure } = require('./structure');
const { syncify } = require('../../src/utils');
const {
    readLines,
    getLine,
    createFile,
    deleteFile,
    exists,
    appendFile,
    createPath,
    deleteFolder,
    getLineCount,
    updateLine,
    getFilsesNames,
    getFoldersNames,
    rewriteFile,
    readFile,
    copyFile,
    copyFolder,
    createTempFolder,
    createFsStructure
} = require('../../src/fs');

describe('tests work with fs', () => {
    // const path = './test/data/fs-utils.txt';
    let path = '';

    const tempTag = 'fs-utils';

    const fsUtils = Path.join('data', 'fs-utils.txt');
    const fsUtilsRead = Path.join('data', 'fs-utils-read.txt');

    beforeAll(async () => {
        path = await createTempFolder(tempTag);
        await createFsStructure(path, structure);
    });

    afterAll(async () => {
        await deleteFolder(path);
    });

    describe('test read operations', () => {
        describe('test readLines', () => {
            it('should test readLines', async () => {
                const { lines } = readLines(Path.join(path, fsUtils));

                const fileLines = [];

                for await (const line of lines) {
                    fileLines.push(line);
                }

                expect(fileLines).toEqual(['one', 'two', 'three', 'four']);
            });
        });

        describe('test getLine', () => {
            it('should test getLine', async () => {
                const line = await getLine(Path.join(path, fsUtils), 1);

                expect(line).toBe('two');
            });
        });

        describe('test readFile', () => {
            it('should read file', async () => {
                const pathExist = Path.join(path, fsUtilsRead);

                expect(await readFile(pathExist)).toBe('text');
            });

            it('should raise exception for nonexisting file', async () => {
                const pathNotExist = Path.join(path, 'notExists.txt');
                expect(await syncify(() => readFile(pathNotExist))).toThrow();
            });
        });

        describe('test getLineCount', () => {
            let testFile = '';

            beforeAll(async () => {
                testFile = Path.join(path, 'testFile-lineCount.txt');
                await createFile(testFile);
                await appendFile(testFile, 'neco');
            });

            it('should return line count of the file', async () => {
                expect(await getLineCount(Path.join(path, fsUtils))).toBe(4);
                expect(await getLineCount(Path.join(path, 'testFile-lineCount.txt'))).toBe(1);
            });
        });

        describe('test getFilsesNames', () => {
            let folderPath = '';
            const folders = ['folder1', 'folder2'];
            const files = ['file1.txt', 'file2.txt', 'file3.txt'];

            beforeAll(async () => {
                folderPath = Path.join(path, 'testFolderFile');
                await createPath(folderPath);

                for (const file of files) {
                    await createFile(Path.join(folderPath, file));
                }
                for (const folder of folders) {
                    await createPath(Path.join(folderPath, folder));
                }
            });

            afterAll(async () => {
                await deleteFolder(folderPath);
            });

            it('should return names of all files in the folder', async () => {
                const files1 = await getFilsesNames(folderPath);

                expect(files1.sort()).toEqual(files.sort());
            });
        });

        describe('test getFoldersNames', () => {
            let folderPath = '';
            const folders = ['folder1', 'folder2'];
            const files = ['file1.txt', 'file2.txt', 'file3.txt'];

            beforeAll(async () => {
                folderPath = Path.join(path, 'testFolderFolder');
                await createPath(folderPath);

                for (const file of files) {
                    await createFile(Path.join(folderPath, file));
                }
                for (const folder of folders) {
                    await createPath(Path.join(folderPath, folder));
                }
            });

            it('should return names of all folders in the folder', async () => {
                const folders1 = await getFoldersNames(folderPath);

                expect(folders1.sort()).toEqual(folders.sort());
            });
        });

        describe('test exists', () => {
            it('should confirm that file exists', async () => {
                expect(await exists(Path.join(path, fsUtils))).toBeTruthy();
            });

            it('should say that file don not exists', async () => {
                expect(await exists(Path.join(path, 'neexistuje.txt'))).toBeFalsy();
            });

            it('should confirm that folder exists', async () => {
                expect(await exists(Path.join(path, 'data'))).toBeTruthy();
            });
        });
    });

    describe('test write operations', () => {
        describe('test createFile', () => {
            const testFileName = 'testFile-create.txt';

            it('should create file', async () => {
                const testFile = Path.join(path, testFileName);
                await createFile(testFile);
                expect(await exists(testFile)).toBeTruthy();
            });

            it('should create file and path', async () => {
                const testFile = Path.join(path, 'create-folder', testFileName);
                await createFile(testFile);
                expect(await exists(testFile)).toBeTruthy();
            });
        });

        describe('test appendFile', () => {
            const testFile = 'testFile-append.txt';

            beforeAll(async () => {
                await createFile(Path.join(path, testFile));
            });

            it('should write add the end of the file', async () => {
                const text1 = 'something';
                const text2 = 'something2';

                await appendFile(Path.join(path, testFile), text1);
                expect(await readFile(Path.join(path, testFile))).toBe(text1);

                await appendFile(Path.join(path, testFile), text2);
                expect(await readFile(Path.join(path, testFile))).toBe(`${text1}${text2}`);
            });
        });

        describe('test updateLine', () => {
            const testFile = 'testFile-update.txt';

            beforeAll(async () => {
                await createFile(Path.join(path, testFile));
                const { lines } = readLines(Path.join(path, 'data', 'fs-utils.txt'));
                for await (const line of lines) {
                    await appendFile(Path.join(path, testFile), `${line}\n`);
                }
            });

            it('should update single line in file', async () => {
                expect(await getLine(Path.join(path, testFile), 2)).toBe('three');
                await updateLine(Path.join(path, testFile), 2, 'something else');
                expect(await getLine(Path.join(path, testFile), 2)).toBe('something else');
            });

            it('should do nothing, when trying update nonexisting line', async () => {
                await updateLine(Path.join(path, testFile), 222, 'something else');
            });
        });

        describe('test rewriteFile', () => {
            it('should rewrite file', async () => {
                const sourceFilePath = Path.join(path, fsUtilsRead);
                const filePath = Path.join(path, 'rewriteFile-rewrite.txt');
                const text = 'something';

                await copyFile(sourceFilePath, filePath);
                expect(await readFile(filePath)).toBe('text');

                await rewriteFile(filePath, text);
                expect(await readFile(filePath)).toBe(text);
            });

            it('should create new file', async () => {
                const text = 'something';
                const filePath = Path.join(path, 'rewrite-create.txt');

                await rewriteFile(filePath, text);

                expect(await readFile(filePath)).toBe(text);
            });
        });
    });

    describe('test folder operations', () => {
        describe('test createPath', () => {
            it('should crate folder', async () => {
                const folderPath = Path.join(path, 'newFolder-create');

                expect(await exists(folderPath)).toBeFalsy();

                await createPath(folderPath);
                expect(await exists(folderPath)).toBeTruthy();
            });
        });

        describe('test copyFolder', () => {
            it('should recursively copy folder and all content in it', async () => {
                const sourceFolder = Path.join(path, 'data');
                const destinationFolder = Path.join(path, 'data2');

                await copyFolder(sourceFolder, destinationFolder);
                expect(exists(Path.join(destinationFolder, 'data2', 'file.txt')));
            });
        });
    });

    describe('test delete operations', () => {
        describe('test deleteFile', () => {
            it('should delete file', async () => {
                const testFile = Path.join(path, 'testFile-delete.txt');

                await createFile(testFile);
                expect(await exists(testFile)).toBeTruthy();

                await deleteFile(testFile);
                expect(await exists(testFile)).toBeFalsy();
            });

            it('should ignore nonexisting files', async () => {
                const file = Path.join(path, 'file.txt');

                expect(await exists(file)).toBeFalsy();
                await deleteFile(file);
            });
        });

        describe('test deleteFolder', () => {
            it('should delete folder', async () => {
                const folderPath = Path.join(path, 'folderToDelete');

                await createPath(folderPath);
                expect(await exists(folderPath)).toBeTruthy();

                await deleteFolder(folderPath);
                expect(await exists(folderPath)).toBeFalsy();
            });

            it('should ignore nonexisting folder', async () => {
                await deleteFolder(Path.join(path, 'nonexistingFolder'));
            });

            it('should delete folder and all data in it', async () => {
                const folderPath = Path.join(path, 'dataToDelete');

                await copyFolder(Path.join(path, 'data'), folderPath);
                expect(await exists(Path.join(path, fsUtils))).toBeTruthy();

                await deleteFolder(folderPath);
                expect(await exists(folderPath)).toBeFalsy();
            });
        });
    });
});
