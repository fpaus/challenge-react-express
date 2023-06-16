import { Router } from 'express';
import externalApiService from '../../external-services/external-api.service.mjs';
import FilesController from './files.controller.mjs';
const controller = new FilesController(externalApiService)
const router = Router()
router.get('/data', controller.getAllFilesData.bind(controller))
router.get('/list', controller.getAllFilesList.bind(controller))

export default router
