import { Router } from 'express'
import apiRouter from './api'
import reactRoute from '../../client/handler'
import auth from '../config/middlewares/auth'

const router = new Router()

router.use('/api', auth, apiRouter)

router.route('*').get(reactRoute)

export default router
