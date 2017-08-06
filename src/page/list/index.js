/*
* @Author: k_denng
* @Date:   2017-08-03 19:03:33
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-05 03:31:06
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
var _product = require('../../service/product-service.js');
var _pagination = require('../../util/pagination/index.js');
var templateHtml = require('./index.string');

var page = {
  data: {
    product : {
      categoryId: _tools.getUrlParam('categoryId') || '',
      keyword: _tools.getUrlParam('keyword') || '',
      pageNum: _tools.getUrlParam('pageNum') || 1,
      pageSize: _tools.getUrlParam('pageSize') || 2,
      orderBy: _tools.getUrlParam('orderBy') || 'default'
    }
  },
  init: function(){
    this.loadList(),
    this.bindEvent()
  },
  loadList: function(){
    var _this = this;
    var html = '';
    var productList = this.data.product;
    // 保证每次加载成功前都会出现加载样式
    $('.product-content').html('<li class="loading"></li>');
    // 两者只能存一
    productList.categoryId ? (delete productList.keyword):(delete productList.categoryId);
    _product.getProductList(productList,function(result){
      html = _tools.renderHtml(templateHtml,{
        list: result.list
      });
      // 渲染商品列表
      $('.product-content').html(html);
      // 渲染分页项
      _this.loadPagination({
        pages: result.pages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPreviousPage: result.hasPreviousPage,
        prePage: result.prePage,
        pageNum: result.pageNum
      });
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  },
  bindEvent: function(){
    var _this = this;
    // 每次点击排序按钮后，都是在第一页
     _this.data.product.pageNum = 1;
    $('.sort-item').on('click',function(){
      // 判断是否为默认排序
      if($(this).data('type') === 'default'){
        if($(this).hasClass('active')){
          return;
        }else{
          $(this).addClass('active').siblings('.sort-item').removeClass('active asc desc');
          _this.data.product.orderBy = 'default';
        }
      }else if($(this).data('type') === 'price'){
        // 添加激活样式，并去除其他兄弟元素的样式
        $(this).addClass('active').siblings('.sort-item').removeClass('active asc desc');
        // 如果没有升序排列，就添加升序样式
        if(!$(this).hasClass('asc')){
          $(this).addClass('asc').removeClass('desc');
          _this.data.product.orderBy = 'price_asc';
        }else if(!$(this).hasClass('desc')){
          $(this).addClass('desc').removeClass('asc');
          _this.data.product.orderBy = 'price_desc';
        }
      }
       // 仅在点击完毕后重新加载
      _this.loadList();
    });
  },
  /**
   * 加载分页项（封装的分页组件）
   * 传入的组件，变量为组件挂载的容器和页数
   * @param  {[type]} pageInfo [description]
   * @return {[type]}          [description]
   */
  loadPagination: function(pageInfo){
    var _this = this;
    // 定义分页组件的实例
    this.pagination ? '' : (this.pagination = new _pagination());
    this.pagination.render($.extend({}, pageInfo,{
      container: $('.pagination'),
      onSelectPage: function(pageNum){
        _this.data.product.pageNum = pageNum;
        _this.loadList();
      }
    }));
  }
};

module.exports = page;
$(function(){
  page.init();
})


