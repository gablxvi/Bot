'use strict';

const fs = require('fs');
const Path = require('path');
const readline = require('readline');

/**
 * Rethrow exception other then ENOENT
 *
 * @param {Error} err
 */
const checkENOENT = (err) => {
    if (err.code !== 'ENOENT') throw err;
};

/**
 * Return readline interface and readStream for file
 *
 * @param {string} path - path to file
 * @returns {{lines: readline.Interface, readStream: fs.ReadStream}}
 */
const readLines = (path) => {
    const readStream = fs.createReadStream(path);
    const lines = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    return { lines, readStream };
};

/**
 * Return text from the line
 *
 * @param {string} path - path to file
 * @param {number} lineNumber - number of the line
 * @returns {Promise<string>}
 */
const getLine = (path, lineNumber) => {
    return new Promise((resolve, reject) => {
        const { lines, readStream } = readLines(path);

        let index = 0;
        lines.on('line', (line) => {
            if (index === lineNumber) {
                lines.close();
                readStream.close();
                resolve(line);
            }
            index++;
        });

        lines.on('error', reject);
        readStream.on('error', reject);

        readStream.on('end', () => {
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
const getLineCount = (path) => {
    return new Promise((resolve, reject) => {
        const { lines, readStream } = readLines(path);
        let linesCount = 0;
        lines.on('line', (line) => {
            linesCount++;
        });

        lines.on('error', (err) => {
            reject(err);
        });

        readStream.on('error', (err) => {
            reject(err);
        });

        lines.on('close', () => {
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
const deleteFile = async (path) => {
    try {
        return await fs.promises.unlink(path);
    } catch (err) {
        checkENOENT(err);
        return false;
    }
};

/**
 * Create new file (and path to file is is necessary)
 *
 * @async
 * @param {string} path - path to file
 * @returns {Promise<void>}
 */
const createFile = async (path) => {
    const fileInfo = Path.parse(path);
    await createPath(fileInfo.dir);
    return fs.promises.appendFile(path, '');
};

/**
 * Write text at the end of the file or create new file (and path to file is is necessary) and write tet
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text to append
 * @returns {Promise<void>}
 */
const appendFile = async (path, text) => {
    const fileInfo = Path.parse(path);
    await createPath(fileInfo.dir);
    return fs.promises.appendFile(path, text);
};

/**
 * Create folder (and path to folder is is necessary)
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
const createPath = (path) => {
    return fs.promises.mkdir(path, { recursive: true });
};

/**
 * Delete folder and all content
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
const deleteFolder = async (path) => {
    try {
        const fullContent = await getFolderContent(path);
        await Promise.all(fullContent.map((item) => {
            if (item.isDirectory()) return deleteFolder(Path.join(path, item.name));
            return deleteFile(Path.join(path, item.name));
        }));
        await fs.promises.rmdir(path);
    } catch (err) {
        checkENOENT(err);
    }
};

/**
 * Check if file or folder exists
 *
 * @param {string} path - path to file
 * @returns {Promise<boolean>}
 */
const exists = async (path) => {
    try {
        await fs.promises.access(path, fs.constants.F_OK);
        return true;
    } catch (err) {
        checkENOENT(err);
        return false;
    }
};

/**
 * Rewrite file with text
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text
 * @returns {Promise<void>}
 */
const rewriteFile = async (path, text) => {
    if (await exists(path)) {
        return fs.promises.writeFile(path, text);
    }
    return appendFile(path, text);
};

/**
 * Return text content of the file
 *
 * @param {string} path - path to the file
 * @returns {Promise<string>}
 */
const readFile = (path) => {
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
const updateLine = async (path, lineNumber, text) => {
    const newFilePath = `${path}~`;

    const { lines } = readLines(path);
    const writeSteam = fs.createWriteStream(newFilePath);

    let index = 0;
    for await (const line of lines) {
        writeSteam.write(index === lineNumber ? `${text}\n` : `${line}\n`);
        index++;
    }

    writeSteam.close();

    await deleteFile(path);

    await fs.promises.rename(newFilePath, path);
};

/**
 * Copy file
 *
 * @param {string} sourceFilePath - path of the source file
 * @param {string} newFilePath - path where to paste new file
 * @returns {Promise<void>}
 */
const copyFile = (sourceFilePath, newFilePath) => {
    return fs.promises.copyFile(sourceFilePath, newFilePath);
};

/**
 * Return folder content with types
 *
 * @param {string} path - path to folder
 * @return {Promise<Dirent[]>}
 */
const getFolderContent = (path) => {
    return fs.promises.readdir(path, { withFileTypes: true });
};

/**
 * Return list of files in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
const getFilsesNames = async (path) => {
    const fullContent = await getFolderContent(path);

    return fullContent.reduce((files, item) => {
        if (item.isFile()) files.push(item.name);
        return files;
    }, []);
};

/**
 * Return list of folders in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
const getFoldersNames = async (path) => {
    const fullContent = await getFolderContent(path);

    return fullContent.reduce((files, item) => {
        if (item.isDirectory()) files.push(item.name);
        return files;
    }, []);
};

/**
 * Copy whole folder with all files and folder
 *
 * @async
 * @param {string} sourceFolderPath - path to the source folder
 * @param {string} newFolderPath - path to new folder
 * @returns {Promise<void>}
 */
const copyFolder = async (sourceFolderPath, newFolderPath) => {
    const fullContent = await getFolderContent(sourceFolderPath);
    await createPath(newFolderPath);
    return Promise.all(
        fullContent.map((item) => {
            if (item.isDirectory()) return copyFolder(Path.join(sourceFolderPath, item.name), Path.join(newFolderPath, item.name));
            if (item.isFile()) return copyFile(Path.join(sourceFolderPath, item.name), Path.join(newFolderPath, item.name));
        })
    );
};

module.exports = {
    readLines,
    getLine,
    createFile,
    deleteFile,
    appendFile,
    createPath,
    deleteFolder,
    exists,
    rewriteFile,
    readFile,
    updateLine,
    getLineCount,
    copyFile,
    copyFolder,
    getFilsesNames,
    getFoldersNames,
    checkENOENT
};
