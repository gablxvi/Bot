/// <reference types="node" />
/**
 * Return readline interface and readStream for file
 *
 * @param {string} path - path to file
 * @returns {{lines: readline.Interface, readStream: fs.ReadStream}}
 */
export function readLines(path: string): {
    lines: import("readline").Interface;
    readStream: import("fs").ReadStream;
};
/**
 * Return text from the line
 *
 * @param {string} path - path to file
 * @param {number} lineNumber - number of the line
 * @returns {Promise<string>}
 */
export function getLine(path: string, lineNumber: number): Promise<string>;
/**
 * Create new file (and path to file is is necessary)
 *
 * @async
 * @param {string} path - path to file
 * @returns {Promise<void>}
 */
export function createFile(path: string): Promise<void>;
/**
 * Delete file
 *
 * @async
 * @param {string} path - path to file
 * @returns {Promise<void>}
 */
export function deleteFile(path: string): Promise<void>;
/**
 * Write text at the end of the file or create new file (and path to file is is necessary) and write tet
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text to append
 * @returns {Promise<void>}
 */
export function appendFile(path: string, text: string): Promise<void>;
/**
 * Create folder (and path to folder is is necessary)
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
export function createPath(path: string): Promise<void>;
/**
 * Delete folder and all content
 *
 * @param {string} path - path to folder
 * @returns {Promise<void>}
 */
export function deleteFolder(path: string): Promise<void>;
/**
 * Check if file or folder exists
 *
 * @param {string} path - path to file
 * @returns {Promise<boolean>}
 */
export function exists(path: string): Promise<boolean>;
/**
 * Rewrite file with text
 *
 * @async
 * @param {string} path - path to file
 * @param {string} text - text
 * @returns {Promise<void>}
 */
export function rewriteFile(path: string, text: string): Promise<void>;
/**
 * Return text content of the file
 *
 * @param {string} path - path to the file
 * @returns {Promise<string>}
 */
export function readFile(path: string): Promise<string>;
/**
 * Update nth line
 *
 * @async
 * @param {string} path - path to file
 * @param {number} lineNumber - number fo the line to update
 * @param {string} text - text
 * @returns {Promise<void>}
 */
export function updateLine(path: string, lineNumber: number, text: string): Promise<void>;
/**
 * Return number of the lines in the file
 *
 * @param {string} path - path to file
 * @returns {Promise<number>}
 */
export function getLineCount(path: string): Promise<number>;
/**
 * Copy file
 *
 * @param {string} sourceFilePath - path of the source file
 * @param {string} newFilePath - path where to paste new file
 * @returns {Promise<void>}
 */
export function copyFile(sourceFilePath: string, newFilePath: string): Promise<void>;
/**
 * Copy whole folder with all files and folder
 *
 * @async
 * @param {string} sourceFolderPath - path to the source folder
 * @param {string} newFolderPath - path to new folder
 * @returns {Promise<void>}
 */
export function copyFolder(sourceFolderPath: string, newFolderPath: string): Promise<void>;
/**
 * Return list of files in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
export function getFilsesNames(path: string): Promise<string[]>;
/**
 * Return list of folders in the folder
 *
 * @async
 * @param {string} path - path to he folder
 * @returns {Promise<String[]>}
 */
export function getFoldersNames(path: string): Promise<string[]>;
/**
 * Rethrow exception other then ENOENT
 *
 * @param {Error} err
 */
export function checkENOENT(err: Error): void;
