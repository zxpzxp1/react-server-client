const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config ={
      entry:{
        app: path.join(__dirname, '../client/app.js'),
      },
      output:{
        filename: '[name].[hash].js',
        publicPath:'/public/',
        path:path.join(__dirname,'../dist'),
      },
      resolve:{
          extensions:['.js','.jsx']
      },
      module: {
          rules:[
              {
                  test: /.jsx$/,
                  loader: 'babel-loader'
              },
              {
                  test: /.js$/,
                  loader: 'babel-loader',
                  exclude: [
                      path.join(__dirname, '../node_modules')
                  ]
              }
          ]
      },
    plugins: [new HTMLPlugin({
        template:path.join(__dirname, '../client/template.html')
    })]
};
// localhost:8888/filename
if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        compress: true,
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
            '/api': 'http://localhost:3333'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports= config;
