/*
* @Author: k_denng
* @Date:   2017-08-01 10:10:05
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-06 19:15:43
*/

'use strict';
var _tools = require('../util/tools.js');
var cart = {
  /**
   * 获取购物车中的数量
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getCartCount: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/get_cart_product_count.do'),
      success: success,
      error: error
    });
  },
  /**
   * 添加产品到购物车
   * @param {[type]} addProductToCart [description]
   * @param {[type]} success          [description]
   * @param {[type]} error            [description]
   */
  addProductToCart: function(addProductToCart,success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/add.do'),
      data: addProductToCart,
      method: 'POST',
      success: success,
      error: error
    });
  }
}

module.exports = cart;