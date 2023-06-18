import axios from 'axios'

export class Fetcher {
  #axios
  constructor () {
    this.#axios = axios.create({
      baseURL: 'http://localhost:8080/'
    })
  }

  /**
   *
   * @param {string} [filename]
   * @returns {Promise<ParsedFile[]>}
   */
  async getFiles (filename) {
    /**
     * @type {{
     * data: ParsedFile[]
     * }}
     */
    const { data } = await this.#axios.get('files/data', {
      params: {
        filename
      }
    })
    return data
  }
}

const fetcher = new Fetcher()
export default fetcher
/**
 * @typedef {Object} Line
 * @property {string} text
 * @property {number} number
 * @property {string} hex
 */
/**
 * @typedef {Object} ParsedFile
 * @property {string} file
 * @property {Line[]} lines
 */
