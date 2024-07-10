/// <reference types="node" />
declare const _exports: {
    updateJson: (path: string, key: any, value: any) => Promise<void>;
    getJsonData: <T>(path: string) => Promise<T>;
    savePrettyJson: <T_1>(path: string, data: T_1) => Promise<void>;
    createTempFolder: (tag?: string | undefined) => Promise<string>;
    deleteTempFolderByTag: (tag: string) => Promise<void>;
    getTempFolderPathByTag: (tag: string) => Promise<string>;
    createFsStructure: (path: string, structure: any) => Promise<void>;
    readLines: (path: string) => {
        lines: import("readline").Interface;
        readStream: import("fs").ReadStream;
    };
    getLine: (path: string, lineNumber: number) => Promise<string>;
    createFile: (path: string) => Promise<void>;
    deleteFile: (path: string) => Promise<void>;
    appendFile: (path: string, text: string) => Promise<void>;
    createPath: (path: string) => Promise<void>;
    deleteFolder: (path: string) => Promise<void>;
    exists: (path: string) => Promise<boolean>;
    rewriteFile: (path: string, text: string) => Promise<void>;
    readFile: (path: string) => Promise<string>;
    updateLine: (path: string, lineNumber: number, text: string) => Promise<void>;
    getLineCount: (path: string) => Promise<number>;
    copyFile: (sourceFilePath: string, newFilePath: string) => Promise<void>;
    copyFolder: (sourceFolderPath: string, newFolderPath: string) => Promise<void>;
    getFilsesNames: (path: string) => Promise<string[]>;
    getFoldersNames: (path: string) => Promise<string[]>;
    checkENOENT: (err: Error) => void;
};
export = _exports;
