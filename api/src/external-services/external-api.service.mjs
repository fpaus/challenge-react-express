import axios from 'axios'

export class ExternalApiService {
  #axios
  constructor () {
    this.#axios = axios.create({
      baseURL: 'https://echo-serv.tbxnet.com/v1/',
      headers: {
        authorization: 'Bearer aSuperSecretKey'
      }
    })
  }

  /**
   *
   * @param {string} fileName
   * @returns {Promise<string>}
   */
  async getFile (fileName) {
    /**
     * @type {{
     * data: string[]
     * }}
     */
    const { data } = await this.#axios.get(`secret/file/${fileName}`)
    return data
  }

  /**
   *
   * @returns {Promise<string[]>}
   */
  async getFiles () {
    /**
     * @type {{
     * data: {files: string[]}
     * }}
     */
    const { data } = await this.#axios.get('secret/files')
    return data.files
  }
}

const externalApiService = new ExternalApiService()
export default externalApiService
