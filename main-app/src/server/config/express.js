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

// import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
// import webpackConfig from '../../../webpack.config'
// const compiler = webpack(webpackConfig)

const app = express()

// Pasers
app.use(cookieParser(config.secret))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Hot reloading middleware
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: '/static/'
// }))
// app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
// app.use(webpackHotServerMiddleware(compiler))

// Addons
app.use(compress())
app.use(helmet())
app.use(cors())

// Static content
app.use('/public', express.static(path.join(__dirname, '../../../public')))
app.use(morgan(config.env === 'development' ? 'common' : 'tiny'))

// Security
if (config.securityMode) {
  passportInit(app)
}

// Routes
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

// Logger
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }))
}

export default app
