/*
* @Author: k_denng
* @Date:   2017-08-01 10:10:05
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-07 15:35:02
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
  },
  /**
   * 获取购物车列表
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getCartList: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/list.do'),
      success: success,
      error: error
    });
  },
  /**
   * 全选
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  selectAll: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/select_all.do'),
      success: success,
      error: error
    });
  },
  /**
   * 全不选
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  unSelectAll: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/un_select_all.do'),
      success: success,
      error: error
    });
  },
  selectProduct: function(productId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/select.do'),
      data: productId,
      method: 'POST',
      success: success,
      error: error
    });
  },
  unSelectProduct: function(productId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/un_select.do'),
      data: productId,
      method: 'POST',
      success: success,
      error: error
    });
  },
  updateCart: function(cartInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/update.do'),
      data: cartInfo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  deleteProduct: function(productId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/cart/delete_product.do'),
      data: productId,
      method: 'POST',
      success: success,
      error: error
    });
  }

}

module.exports = cart;