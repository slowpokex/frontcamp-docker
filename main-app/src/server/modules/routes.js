import { Router } from 'express'
import httpStatus from 'http-status'
import apiRouter from './api'
import reactRoute from './react'
import auth from '../config/middlewares/auth'

const router = new Router()

router.use('/api', auth, apiRouter)

router.route('/').get(reactRoute)

export default router
