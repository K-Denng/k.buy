/*
* @Author: k_denng
* @Date:   2017-07-30 14:41:15
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 22:43:54
*/

'use strict';
require('./result.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
$(function(){
  // 通过结果判断该显示哪些提示模块
  var type = _tools.getUrlParam('type') || 'default';
  $('.'+ type+ '-success').show();
  if(type === 'payment'){
    var orderNo = _tools.getUrlParam('orderNumber');
    $('.order-number').attr('href','./order-detail.html?orderNumber='+orderNo);
  }
});
