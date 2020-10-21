import {promises as fs} from 'fs'

const API_KEY_FILE = './api-key.txt'

/**
 * Clears Api Key from file storage
 */
export async function clearApiKey() {
  try {
    await fs.unlink(API_KEY_FILE)
  } catch (error) {
  /**
   * Eating this error if the file does not exist
   * because the file has already been cleared.
   */
  }
}

/**
 * Set's Api Key to file storage
 * @param {string} key the value to be persisted to file storage
 */
export async function setApiKey(key: string) {
  try {
    await fs.writeFile(API_KEY_FILE, key, 'utf8')
  } catch (error) {
    throw new Error('Api Key could not be saved.')
  }
}

/**
 * Gets Api key from file storage
 * @returns {Promise<string>} Promise the returns an Api key string.
 */
export async function getApiKey(): Promise<string> {
  try {
    const key = await fs.readFile(API_KEY_FILE, 'utf8')
    return key
  } catch (error) {
    throw new Error("You must be logged in to make this request. See 'shipped login'.\n\nSee 'shipped --help' for more options.")
  }
}
