/*
* @Author: k_denng
* @Date:   2017-08-11 03:58:17
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-12 17:29:22
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var navSide = require('../common/nav-side/index.js');
var _tools = require('../../util/tools.js');
var _pagination = require('../../util/pagination/index.js');
var _order = require('../../service/order-service.js');

var htmlTemplate = require('./index.string');

var page = {
  data : {
    pageInfo: {
      pageSize: 3,
      pageNum : 1
    }
  },
  init : function(){
    navSide.init('order-list');
    this.loadOrderList();
  },
  loadOrderList : function(){
    var _this = this;
    var html = '';
    _order.getOrderList(this.data.pageInfo,function(result){
      html = _tools.renderHtml(htmlTemplate,result);
      $('.panner-body').html(html);
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
  },/**
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
        _this.data.pageInfo.pageNum = pageNum;
        _this.loadOrderList();
      }
    }));
  }
};

$(function(){
  page.init();
});