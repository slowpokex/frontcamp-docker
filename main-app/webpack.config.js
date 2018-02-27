const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const webpackMerge = require('webpack-merge')
const path = require('path')

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Paths
const publicFolder = path.join(__dirname, 'public')
const serverFolder = path.join(__dirname, 'src/server')
const clientFolder = path.join(__dirname, 'src/client')
const serverDistFolder = path.join(__dirname, 'dist')
const clientDistFolder = path.join(publicFolder, 'dist')

const baseRules = {
  jsx: {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react'],
        plugins: [ require('babel-plugin-transform-runtime') ]
      }
    }
  },
  css: {
    test: /\.css$/,
    use: [ 'style-loader', 'css-loader' ]
  },
  img: {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['url-loader?limit=10000']
  },
  fonts: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['url-loader?limit=10000']
  }
}

const commonConfig = {
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },

  module: {
    rules: [ ...Object.values(baseRules) ]
  }
}

const clientConfig = {
  entry: [
    'babel-polyfill',
    path.join(clientFolder, 'index.js')
  ],
  output: {
    path: clientDistFolder,
    filename: 'client-bundle.js',
    publicPath: '/public'
  },
  plugins: [
    new CleanWebpackPlugin([clientDistFolder])
  ]
}

const serverconfig = {
  entry: [
    'babel-polyfill',
    path.join(serverFolder, 'index.js')
  ],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: serverDistFolder,
    filename: 'server-bundle.js',
    publicPath: '/public'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new CleanWebpackPlugin([serverDistFolder])
  ]
}

module.exports = [
  webpackMerge(commonConfig, clientConfig),
  webpackMerge(commonConfig, serverconfig)
]
