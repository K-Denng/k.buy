/*
* @Author: k_denng
* @Date:   2017-08-07 22:02:14
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 18:40:36
*/

'use strict';
var _tools = require('../util/tools.js');
var order = {
  /**
   * 获取购物车产品列表
   * @param  {[type]} pageInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  getProductList: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/get_order_cart_product.do'),
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 提交创建订单
   * @param  {[type]} shippingId [description]
   * @param  {[type]} success    [description]
   * @param  {[type]} error      [description]
   * @return {[type]}            [description]
   */
  createOrder: function(shippingId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/create.do'),
      data: shippingId,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取订单列表
   * @param  {[type]} pageInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  getOrderList: function(pageInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/list.do'),
      data: pageInfo||{
        pageSize: 10,
        pageNum : 1
      },
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取订单详情
   * @param  {[type]} orderNo [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getOrderDetail: function(orderNo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/detail.do'),
      data: orderNo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 取消订单
   * @param  {[type]} orderNo [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  cancelOrder: function(orderNo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/cancel.do'),
      data: orderNo,
      method: 'POST',
      success: success,
      error: error
    });
  }

};

module.exports = order;


