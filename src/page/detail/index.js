/*
* @Author: k_denng
* @Date:   2017-08-05 15:31:16
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-06 20:05:15
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
var _product = require('../../service/product-service.js');
var _cart = require('../../service/cart-service.js');
var templateHtml = require('./index.string');

var page = {
  data: {
    productId: _tools.getUrlParam('productId') || ''
  },
  init: function(){
    this.loadList();
    this.bindEvent();
  },
  loadList: function(){
    var _this = this;
    var html = '';
    if(!_this.data.productId){
      _tools.goHome();
    }
    $('.page-wrap').html('<div class="loading"></div>')
    _product.getProductDetail({
      productId: _this.data.productId
    },function(result){
      _this.data.productInfo = result;
      _this.data.productInfo.subImages = _this.data.productInfo.subImages.split(',');
      console.log(_this.data.productInfo);
      html = _tools.renderHtml(templateHtml,_this.data.productInfo);
      $('.page-wrap').html(html);
    },function(errorMsg){
      window.location.href = './result.html?type=no-product';
    });
  },
  bindEvent: function(){
    var _this = this;
    // 移动显示大图
    $(document).on('mouseenter','.product-img-item',function(){
      var src = $(this).find('img').attr('src');
      $('.mainImage').attr('src',src);
    });
    // 商品个数的增减
    $(document).on('click','.prod-info-position',function(){
      var count = parseInt($('.count').val()),
          minCount = 1,
          maxCount = _this.data.productInfo.stock ||1;
      var type = $(this).hasClass('prod-plus') ? 
      'plus' : 'minus';
      console.log(type);
      if(type === 'plus'){
        $('.count').val(count<maxCount?count+1:maxCount);
      }else if(type === 'minus'){
        $('.count').val(count<=minCount?minCount:count-1);
      }
    });
    // 添加到购物车
    $(document).on('click','.btn-submit',function(){
      // 如果没库存，则提醒用户并直接返回
      if(!_this.data.productInfo.stock){
        window.location.href = './result.html?type=no-stock';
        return;
      }
      _cart.addProductToCart({
        count: parseInt($('.count').val()),
        productId: _this.data.productId
      },function(result){
        window.location.href = './result.html?type=cart-add';
      },function(errorMsg){
        _tools.errorTips(errorMsg);
      });
    });
  }
};

module.exports = page;
$(function(){
  page.init();
})

