import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import expressWinston from 'express-winston'
import path from 'path'
import morgan from 'morgan'

import config from './env'
import winstonInstance from './winston'
import routes from '../modules/routes'
import passportInit from './passport'

const app = express()

app.use(cookieParser(config.secret))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compress())
app.use(helmet())
app.use(cors())

// Static content
app.use('/public', express.static(path.join(__dirname, '../../../public')))
app.use(morgan(config.env === 'development' ? 'common' : 'tiny'))

if (config.securityMode) {
  passportInit(app)
}

app.use('/', routes)

app.use((req, res, next) => {
  return res.json({
    code: 404,
    head: 'Page not found',
    message: 'Something goes wrong'
  })
})

app.use((err, req, res, next) => {
  return res.json({
    code: 500,
    head: 'Server error',
    message: JSON.stringify(err)
  })
})

if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }))
}

export default app
