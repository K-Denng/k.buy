/*
* @Author: K_Denng
* @Date:   2017-07-26 18:45:37
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 17:38:41
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
const getHtmlConfig = function(name,title){
  return {
    // 原始模板
    template: './src/view/'+name+'.html',
    // 目标文件位置
    filename: 'view/'+name+'.html',
    title: title,
    inject: true,
    hash: true,

    // 允许添加的模块
    chunks: ['common',name]
  }
};

var config = {
  // 页面入口文件配置,配置多个目标源文件
  entry: {
    'common': './src/page/common/index.js',
    'index': './src/page/index/index.js',
    'list': './src/page/list/index.js',
    'detail': './src/page/detail/index.js',
    'cart': './src/page/cart/index.js',
    'order-confirm': './src/page/order-confirm/index.js',
    'order-list': './src/page/order-list/index.js',
    'order-detail': './src/page/order-detail/index.js',
    'user-login': './src/page/user-login/index.js',
    'user-center': './src/page/user-center/index.js',
    'user-center-update': './src/page/user-center-update/index.js',
    'user-register': './src/page/user-register/index.js',
    'user-password-reset': './src/page/user-password-reset/index.js',
    'user-password-update': './src/page/user-password-update/index.js',
    'result': './src/page/result/index.js'
  },
  // 入口文件的输出配置,配置多个目标输出文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  externals : {
    // 引用第三方库作为全局变量
    jquery : 'window.jQuery',
    artTemplate: 'window.template'
  },

  // 关于模块配置
  module: {
    rules: [
    // 模块规则（配置 loader、解析器等选项）
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
              // name: 'images/[name]_[hash:7].[ext]'
              name: 'images/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      {
        test: /\.string$/,
        loader: "html-loader",
      },
    ]
  },

  node: {
    fs: 'empty'
  },

  // 解析模块请求的选项
  resolve: {
    // 模块别名列表
    alias: {
      util: path.resolve(__dirname , 'src/util/'),
      page: path.resolve(__dirname , 'src/page/'),
      service: path.resolve(__dirname , 'src/service/'),
      images: path.resolve(__dirname , 'src/images/')
    }
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

    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
    new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','新用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-password-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-password-update','修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
  ]
  
}


module.exports = config;




