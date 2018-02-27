import { Router } from 'express'
import httpStatus from 'http-status'
import users from './users/routes'
import blogs from './blogs/routes'

const apiRouter = new Router()

apiRouter.route('/').all((req, res, next) => {
  res.status(httpStatus.OK).json({ message: 'Welcome to API routes' })
})

apiRouter.use('/users', users)
apiRouter.use('/blogs', blogs)

export default apiRouter
