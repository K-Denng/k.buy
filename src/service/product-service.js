/*
* @Author: k_denng
* @Date:   2017-08-03 19:22:27
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-06 12:16:58
*/

var _tools = require('../util/tools.js');

'use strict';
var product = {
  /**
   * 获取产品列表
   * @param  {[type]} productList [description]
   * @param  {[type]} success     [description]
   * @param  {[type]} error       [description]
   * @return {[type]}             [description]
   */
  getProductList: function(productList,success,error){
    _tools.request({
      url: _tools.getServerUrl('/product/list.do'),
      data: productList,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取产品详细信息
   * @param  {[type]} productDetail [description]
   * @param  {[type]} success       [description]
   * @param  {[type]} error         [description]
   * @return {[type]}               [description]
   */
  getProductDetail: function(productId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/product/detail.do'),
      data: productId,
      method: 'POST',
      success: success,
      error: error
    });
  }

};
module.exports = product;

