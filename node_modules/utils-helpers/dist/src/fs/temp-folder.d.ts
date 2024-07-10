/**
 * Crate temporally folder
 *
 * @async
 * @param {string=} tag - tag for folder name
 * @returns {Promise<string>}
 */
export function createTempFolder(tag?: string | undefined): Promise<string>;
/**
 * Delete all temp folders with tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<void>}
 */
export function deleteTempFolderByTag(tag: string): Promise<void>;
/**
 * Get folder path by tag
 *
 * @async
 * @param {string} tag - tag
 * @returns {Promise<string>}
 */
export function getTempFolderPathByTag(tag: string): Promise<string>;
