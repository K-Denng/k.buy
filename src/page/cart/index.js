/*
* @Author: k_denng
* @Date:   2017-08-06 20:50:18
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-07 16:08:38
*/

'use strict';
require('./index.less');
require('../common/head-search/head-search.js');
var _nav = require('../common/nav/index.js');
var _tools = require('../../util/tools.js');
var _cart = require('../../service/cart-service.js');
var templateHtml = require('./index.string');

var page = {
  data: {

  },
  init: function(){
    this.loadList();
    this.bindEvent();
  },
  loadList: function(){
    var _this = this;
    _cart.getCartList(function(result){
      _this.renderCart(result);
    },function(errorMsg){
      console.log(errorMsg);
    });
    // 更新导航栏的购物车数据
    _nav.loadCartCount();
  },
  bindEvent: function(){
    var _this = this;

    // 全选点击
    $(document).on('click','.select-all',function(){
      if($(this).is(':checked')){
        _cart.selectAll(function(result){
          _this.renderCart(result);
        },function(errorMsg){
          console.log(errorMsg);
        });
      }else{
        _cart.unSelectAll(function(result){
          _this.renderCart(result);
        },function(errorMsg){
          console.log(errorMsg);
        });
      }
    });
    // 选取／不选某一商品
    $(document).on('click','.product-selete',function(){
      var productId = $(this).parents('.cart-table').data('product-id');
      if($(this).is(':checked')){
        _cart.selectProduct({
          productId: productId
        },function(result){
          _this.renderCart(result);
        },function(errorMsg){
          console.log(errorMsg);
        });
      }else{
        _cart.unSelectProduct({
          productId: productId
        },function(result){
          _this.renderCart(result);
        },function(errorMsg){
          console.log(errorMsg);
        });
      }
    });
    // 变更商品数量
    $(document).on('click','.count-btn',function(){
      var productId = $(this).parents('.cart-table').data('product-id'),
          newCount = 0,
          productCount = parseInt($(this).siblings('.count-input').val()),
          minCount = 1,
          maxCount = parseInt($(this).siblings('.count-input').data('max')),
          type = $(this).hasClass('plus') ? 'plus' : 'minus';

      if(type === 'minus'){
        if(productCount<=minCount){
          return;
        }
        newCount = productCount - 1;
      }else if(type === 'plus'){
        if(productCount==maxCount){
          _tools.errorTips('已经没有更多的库存了...');
          return;
        }
        newCount = productCount + 1;
      }
      _cart.updateCart({
        productId: productId,
        count: newCount
      },function(result){
        _this.renderCart(result);

      },function(errorMsg){
        console.log(errorMsg);
      });
    });

    // 删除单个商品
    $(document).on('click','.delete',function(){
      var productId = $(this).parents('.cart-table').data('product-id');
      _cart.deleteProduct({
        productIds: productId
      },function(result){
        _this.renderCart(result);
      },function(errorMsg){
        console.log(errorMsg);
      });
    });

    // 删除选中商品
    $(document).on('click','.delete-all',function(){
      var select = $('.product-selete:checked');
      var productIds = [];
      for(var i=0;i<select.length;i++){
        productIds.push($(select[i]).parents('.cart-table').data('product-id'));
      }
      // 按接口要求转换为字符串
      productIds = productIds.join(',');
      _cart.deleteProduct({
        productIds: productIds
      },function(result){
        _this.renderCart(result);
      },function(errorMsg){
        console.log(errorMsg);
      });
    });
    
    $(document).on('click','.btn-submit',function(){
      // 仅当所存储的数据存在且总金额>0时有效
      if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
        window.location.href = './confirm.html';
      }else {
        _tools.errorTips('请选择商品后再提交');
      }
    });
  },
  /**
   * 渲染购物车
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  renderCart: function(data){
    this.filter(data);
    this.data.cartInfo = data;
    var html = _tools.renderHtml(templateHtml,data);
    $('.page-wrap').html(html);
  },
  /**
   * 判断商品个数并返回
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  filter: function(data){
    data.notEmpty = !! data.cartProductVoList.length;
  }
};

module.exports = page;
$(function(){
  page.init();
})

