/*
* @Author: k_denng
* @Date:   2017-08-12 21:17:17
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 22:33:37
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
var _pay = require('../../service/pay-service.js');
var htmlTemplate = require('./index.string');

var page = {
  data : {
    orderNo : _tools.getUrlParam('orderNumber')
  },
  init : function(){
    this.loadOrderDetail();
  },
  loadOrderDetail : function(){
    var _this = this;
    var html = '';
    $('.page-wrap').html('<div class="loading"></div>');
    _pay.toPay({
      orderNo: _this.data.orderNo
    },function(result){
      html = _tools.renderHtml(htmlTemplate,result);
      $('.page-wrap').html(html);
      _this.listenOrderStatus();
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  },
  listenOrderStatus: function(){
    var _this = this;
    window.setInterval(function(){
      _pay.searchOrderStatus({
      orderNo: _this.data.orderNo
    },function(result){
      if(result){
        window.location.href = 
          './result.html?type=payment&orderNumber=' + _this.data.orderNo;
      }
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
    },5000);
  }
};

$(function(){
  page.init();
});