const path = require('path')
const webpack = require('webpack')
module.exports={
      target:'node',
      entry:{
        app: path.join(__dirname, '../client/server-entry.js'),
      },
      output:{
        filename: 'server-entry.js',
        publicPath:'/public',
        path:path.join(__dirname,'../dist'),
        libraryTarget:'commonjs2'
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
      resolve:{
          extensions:['.js','.jsx']
      }
}
