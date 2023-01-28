// webpack.config.js
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  target: "node",
  externals: [nodeExternals()], 
  entry: {
    server: "./server/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [ 
          {
            loader: 'isomorphic-style-loader-react18'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    // file extensions
    extensions: [".js", ".jsx", ".scss"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
  })
  ],
  optimization: {
    minimize: true,
  },
};
