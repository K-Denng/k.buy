/*
* @Author: K_Denng
* @Date:   2017-07-26 18:45:37
* @Last Modified by:   K_Denng
* @Last Modified time: 2017-07-27 23:50:53
*/

'use strict';

//3.4.0以上版本需添加这一引用，并且含有__dirname
const path = require('path');
const webpack = require('webpack');

// 引入单独打包CSS的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入单独打包HTML模板的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 获取html-webpack-plugin参数的方法
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const getHtmlConfig = function(name){
  return {
    // 原始模板
    template: './src/view/'+name+'.html',
    // 目标文件位置
    filename: 'view/'+name+'.html',

    inject: true,
    hash: true,

    // 允许添加的模块
    chunks: ['common',name]
  }
};

var config = {
  // 页面入口文件配置,配置多个目标源文件
  entry: {
    common: './src/page/common/index.js',
    index: './src/page/index/index.js',
    login: './src/page/login/index.js'
  },
  // 入口文件的输出配置,配置多个目标输出文件
  output: {
    // path: __dirname + '/dist',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  externals : {
    // 引用第三方库作为全局变量
    jquery : 'window.jQuery'
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })
      // },
      // 
      // 
      // 
      // 编译less
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      // 处理图片，字体等文件
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name]_[hash:7].[ext]'
            }
          }
        ]
      },
    ]
  },
  // 插件项
  plugins: [
    // 提取公共模块的插件配置
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      // (the commons chunk name)

      filename: "js/base.js"
      // (the filename of the commons chunk)

      // minChunks: 3,
      // (Modules must be shared between 3 entries)

      // chunks: ["pageA", "pageB"],
      // (Only use these entries)
    }),

    // 独立打包样式文件配置
    new ExtractTextPlugin("css/[name].css"),

    // html模板的处理
    /*new HtmlWebpackPlugin({
      // 原始模板
      template: './src/view/index.html',
      // 目标文件位置
      filename: 'view/index.html',

      inject: true,
      hash: true,

      // 允许添加的模块
      chunks: ['common','index'],
    }),*/

    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ]
  
}


module.exports = config;




