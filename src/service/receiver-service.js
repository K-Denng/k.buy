/*
* @Author: k_denng
* @Date:   2017-08-08 13:48:43
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-10 23:23:47
*/

'use strict';
var _tools = require('../util/tools.js');
var receiver = {
  /**
   *  获取收货人地址列表
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getReceiverList: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/shipping/list.do'),
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 保存收货人信息
   * @param  {[type]} receiverInfo [description]
   * @param  {[type]} success      [description]
   * @param  {[type]} error        [description]
   * @return {[type]}              [description]
   */
  saveReceiverInfo: function(receiverInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/shipping/add.do'),
      data: receiverInfo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 更新收货人信息
   * @param  {[type]} receiverInfo [description]
   * @param  {[type]} success      [description]
   * @param  {[type]} error        [description]
   * @return {[type]}              [description]
   */
  updateReceiverInfo: function(receiverInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/shipping/update.do'),
      data: receiverInfo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 查看收货人信息
   * @param  {[type]} shippingId [description]
   * @param  {[type]} success    [description]
   * @param  {[type]} error      [description]
   * @return {[type]}            [description]
   */
  getReceiverInfo: function(shippingId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/shipping/select.do'),
      data: shippingId,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 删除收货人信息
   * @param  {[type]} shippingId [description]
   * @param  {[type]} success    [description]
   * @param  {[type]} error      [description]
   * @return {[type]}            [description]
   */
  delReceiverInfo: function(shippingId,success,error){
    _tools.request({
      url: _tools.getServerUrl('/shipping/del.do'),
      data: shippingId,
      method: 'POST',
      success: success,
      error: error
    });
  }

};

module.exports = receiver;


