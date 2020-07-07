const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const { join, resolve } = require('path')
const path = require('path');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src') + '/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot|otf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    inline: true,
    port: 4200,
    
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: join(__dirname, 'public', 'index.html')
    }),

    new webpack.HotModuleReplacementPlugin(), // dev
    new webpack.NoEmitOnErrorsPlugin() // dev
  ]
};