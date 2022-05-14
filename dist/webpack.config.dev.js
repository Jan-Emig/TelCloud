"use strict";

var path = require('path');

var CopyPlugin = require('copy-webpack-plugin');

module.exports = [{
  entry: {
    app: './src/js/electron/app.ts',
    sign_in: './src/js/renderer/windows/sign_in.tsx',
    api_preload: './src/js/preloaders/api_preload.ts',
    zeta: './src/js/zeta.tsx',
    no_connection: './src/js/renderer/windows/no_connection.tsx',
    sign_up: './src/js/renderer/windows/sign_up.tsx',
    explorer: './src/js/renderer/windows/explorer.tsx'
  },
  mode: 'development',
  target: 'electron-main',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/js')
  },
  plugins: [new CopyPlugin({
    patterns: [{
      from: './src/html/*.html',
      to: '../[name].html'
    }, {
      from: './src/assets/*',
      to: '../assets/[name][ext]'
    }]
  })]
}];