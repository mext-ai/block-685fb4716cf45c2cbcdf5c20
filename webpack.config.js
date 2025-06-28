const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const fs = require('fs');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'source-map',
  devServer: {
    port: 3001,
    open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'threescene',
      filename: 'remoteEntry.js',
      exposes: {
        './Block': './src/App',
      },
      // CRITICAL: Empty object = no shared dependencies, full isolation
      shared: {},
    }),
    // Copy public assets if public folder exists
    ...(fs.existsSync(path.resolve(__dirname, 'public')) ? [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            globOptions: {
              ignore: ['**/index.html'], // Don't copy index.html from public
            },
          },
        ],
      })
    ] : []),
  ],
  externals: {},
  optimization: {
    splitChunks: false,
    concatenateModules: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'var',
      name: 'threescene'
    },
    publicPath: 'auto',
  },
};
