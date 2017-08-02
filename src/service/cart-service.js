/*
* @Author: k_denng
* @Date:   2017-08-01 10:10:05
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-01 10:22:37
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
  }
}

module.exports = cart;