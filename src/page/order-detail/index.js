/*
* @Author: k_denng
* @Date:   2017-08-12 17:40:22
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 19:05:52
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var navSide = require('../common/nav-side/index.js');
var _tools = require('../../util/tools.js');
var _order = require('../../service/order-service.js');

var htmlTemplate = require('./index.string');

var page = {
  data : {
    orderNo : _tools.getUrlParam('orderNumber')
  },
  init : function(){
    navSide.init('order-list');
    this.loadOrderDetail();
    this.bindEvent();
  },
  loadOrderDetail : function(){
    var _this = this;
    var html = '';
    _order.getOrderDetail({
      orderNo: _this.data.orderNo
    },function(result){
      _this.filter(result);
      html = _tools.renderHtml(htmlTemplate,result);
      $('.panner').html(html);
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  },
  bindEvent: function(){
    var _this = this;
    var html = '';
    $(document).on('click','.cancel-order',function(){
      if(window.confirm("你确定要取消订单吗？")){
        _this.filter(result);
        _order.cancelOrder({
          orderNo: _this.data.orderNo
        },function(result){
          _this.loadOrderDetail();
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }
    });
  },
  filter : function(data){
    data.isCancel = data.status == 10;
  }
};

$(function(){
  page.init();
});

