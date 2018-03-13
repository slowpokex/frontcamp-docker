// const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const webpackMerge = require('webpack-merge');
const path = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Paths
const publicFolder = path.join(__dirname, 'public');
const serverFolder = path.join(__dirname, 'src/server');
const clientFolder = path.join(__dirname, 'src/client');
const serverDistFolder = path.join(__dirname, 'dist');
const clientDistFolder = path.join(publicFolder, 'dist');

const baseRules = {
  js: {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react'],
        plugins: [require('babel-plugin-transform-runtime')],
      },
    },
  },
  img: {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['url-loader?limit=10000'],
  },
  fonts: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['url-loader?limit=10000'],
  },
};

const commonConfig = {
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
};

const clientConfig = {
  name: 'client',
  entry: [
    'babel-polyfill',
    path.resolve(path.join(clientFolder, 'index.jsx')),
  ],

  target: 'web',
  output: {
    path: path.resolve(clientDistFolder),
    filename: 'client-bundle.js',
    publicPath: '/public',
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      ...Object.values(baseRules),
    ],
  },

  plugins: [
    new CleanWebpackPlugin([clientDistFolder]),
  ],
};

const serverconfig = {
  name: 'server',
  entry: [
    'babel-polyfill',
    path.resolve(path.join(serverFolder, 'index.js')),
  ],

  target: 'node',
  externals: [nodeExternals()],

  output: {
    path: path.resolve(serverDistFolder),
    filename: 'server-bundle.js',
    publicPath: '/public',
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      ...Object.values(baseRules),
    ],
  },

  plugins: [
    new CleanWebpackPlugin([serverDistFolder]),
  ],
};

module.exports = [
  webpackMerge(commonConfig, clientConfig),
  webpackMerge(commonConfig, serverconfig),
];
