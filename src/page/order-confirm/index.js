/*
* @Author: k_denng
* @Date:   2017-08-07 21:58:49
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 19:12:16
*/

'use strict';
require('./index.less');
require('../common/head-search/head-search.js');
require('../common/nav/index.js');
var _tools = require('../../util/tools.js');
var _order = require('../../service/order-service.js');
var _receiver = require('../../service/receiver-service.js');
var templateAddress = require('./address.string');
var templateOrder = require('./order.string');
var receiverAddress = require('./receiver-address.js');

var page = {
  data: {

  },
  init: function(){
    this.loadList();
    this.bindEvent();
  },
  loadList: function(){
    this.loadAddressList();
    this.loadProductList();
  },
  bindEvent: function(){
    var _this = this;
    // 选择收获地址
    $(document).on('click','.address-info',function(){
      _this.data.selectedId = $(this).data('id');
      $(this).addClass('active').siblings('.address-info').removeClass('active');
    });
    // 提交生成订单
    $(document).on('click','.btn-submit',function(){
      if(_this.data.selectedId){
        _order.createOrder({
          shippingId: _this.data.selectedId
        },function(result){
          window.location.href = './payment.html?orderNumber=' + result.orderNo;
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }else{
        _tools.errorTips('请选择收货地址后再提交');
      }
    });
    // 点击添加地址
    $(document).on('click','.add-address',function(){
      receiverAddress.show({
        isUpdate: false,
        success: function(){
          _this.loadAddressList();
        }
      });
    });
    // 点击编辑更新
    $(document).on('click','.address-update',function(e){
      // 清除冒泡事件，会影响到点击选中地址的操作
      e.stopPropagation();
      var shippingId = $(this).parents('.address-info').data("id");
      _receiver.getReceiverInfo({
        shippingId: shippingId
      },function(result){
        receiverAddress.show({
          isUpdate: true,
          data: result,
          success: function(){
            _this.loadAddressList();
          }
        });
      },function(errorMsg){
        _tools.errorTips(errorMsg);
      });
    });
    // 删除收货人信息
    $(document).on('click','.address-delete',function(e){
      // 清除冒泡事件，会影响到点击选中地址的操作
      e.stopPropagation();
      var shippingId = $(this).parents('.address-info').data("id");
      if(window.confirm('确定要删除吗？')){
        _receiver.delReceiverInfo({
          shippingId: shippingId
        },function(result){
          _this.loadAddressList();
          _tools.successTip(result);
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }
    });
  },
  /**
   * 加载收货地址列表
   * @return {[type]} [description]
   */
  loadAddressList: function(){
    var _this = this;
    var html = '';
    $('.product-content').html('<div class="loading loading-sm"></div>');
    _receiver.getReceiverList(function(result){
      html = _tools.renderHtml(templateAddress,result);
      $('.address-content').html(html);
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  },
  /**
   * 加载商品列表
   * @return {[type]} [description]
   */
  loadProductList: function(){
    var _this = this;
    var html = '';
    $('.address-content').html('<div class="loading loading-sm"></div>');
    _order.getProductList(function(result){
      html = _tools.renderHtml(templateOrder,result);
      $('.product-content').html(html);
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  }

};

module.exports = page;
$(function(){
  page.init();
})

