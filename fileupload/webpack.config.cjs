/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const path = require('path')
const DotenvWebpackPlugin = require('dotenv-webpack')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const plugins = [
  new DotenvWebpackPlugin(),
  isDevelopment && new WebpackShellPluginNext({
    onBuildEnd: {
      scripts: ['npm run serve:dev'],
      blocking: false,
      parallel: true
    }
  })
].filter(Boolean)

module.exports = {
  entry: './src/fileServer.ts',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  mode: NODE_ENV,
  target: 'node',
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    },
    extensions: ['.ts', '.js']
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.(ts?)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: "/node_modules/",
        use: ['ts-loader']
      }
    ]
  },
  cache: true,
  watch: isDevelopment,
  plugins: plugins
}
