import { parseFile } from './files.utils.mjs';
export default class FilesController {
  /**
   * @type {import('../../external-services/external-api.service.mjs').ExternalApiService}
   */
  #externalApiService;
  /**
   * @param {import('../../external-services/external-api.service.mjs').ExternalApiService} externalApiService
   */
  constructor(externalApiService) {
    this.#externalApiService = externalApiService;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAllFilesData(req, res) {
    const { filename } = req.query;
    try {
      if (!filename) {
        const parsedFiles = await this._getParsedFiles();
        res.json(parsedFiles);
      } else {
        const parsedFile = await this._getOneParsedFile(filename);
        res.json([parsedFile]);
      }
    } catch (err) {
      res.status(500).json({
        error: 'Could not retrieve file',
      });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAllFilesList(req, res) {
    const files = await this.#externalApiService.getFiles();
    res.json(files);
  }

  async _getParsedFiles() {
    const files = await this.#externalApiService.getFiles();
    const maybeFiles = await Promise.allSettled(
      files.map((file) => this.#externalApiService.getFile(file)),
    );
    const fulfilledFiles = maybeFiles
      .filter((file) => file.status === 'fulfilled')
      .map((file) => file.value);

    const parsedFiles = fulfilledFiles
      .map((file) => parseFile(file))
      .filter((file) => file.lines.length > 0);
    return parsedFiles;
  }

  /**
   * @param {string} filename
   */
  async _getOneParsedFile(filename) {
    const file = await this.#externalApiService.getFile(filename);
    const parsedFile = parseFile(file);
    return parsedFile;
  }
}
