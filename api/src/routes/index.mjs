import { Router } from 'express'
import filesRouter from './files/files.router.mjs'

const router = Router()

router.use('/files', filesRouter)

export default router
