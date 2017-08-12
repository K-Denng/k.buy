/*
* @Author: k_denng
* @Date:   2017-08-12 22:10:41
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 22:26:17
*/

'use strict';
var _tools = require('../util/tools.js');

var _pay = {
  /**
   * 支付接口
   * @param  {[type]} orderNo [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  toPay: function(orderNo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/pay.do'),
      data: orderNo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  searchOrderStatus: function(orderNo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/order/query_order_pay_status.do'),
      data: orderNo,
      method: 'POST',
      success: success,
      error: error
    });
  }

};
module.exports = _pay;