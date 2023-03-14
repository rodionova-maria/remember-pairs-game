const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './js/script.js',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        // /паттерн/, \ экранирование спецсимвола, i игнорировать регистр
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'static', to: 'static' }],
    }),
    // на каждую страницу свой new HtmlWebpackPlugin со ссылкой
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devtool: isProduction ? 'hidden-source-map' : 'source-map',
};

// Linux
// "build": "export NODE_ENV=production webpack --config ./webpack.prod.config.js --progress --colors",
// "start": "node ./app.js"
// Windows
// "build": "set NODE_ENV=production webpack --config ./webpack.prod.config.js --progress --colors",
// "start": "node ./app.js"
