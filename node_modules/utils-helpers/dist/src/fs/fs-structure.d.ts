export type structureType = any;
/**
 * Create folders and files
 *
 * @async
 * @param {string} path - path to root directory
 * @param {structureType} structure - structure to create
 * @returns {Promise<void>}
 */
export function createFsStructure(path: string, structure: any): Promise<void>;
