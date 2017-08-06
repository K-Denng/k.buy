/*
* @Author: k_denng
* @Date:   2017-08-04 18:46:07
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-05 03:38:01
*/

'use strict';
require('./index.less');
var _tools = require('../tools.js');
var htmlTemplate = require('./index.string');

var Pagination = function(){
  var _this = this;
  // 默认的选项，将容器与回调函数公开定义作为接口
  this.defaultOption = {
    container: null,
    pageNum: 1,
    pageRange: 3,
    onSelectPage: null
  };
  // 渲染之前定义的，只能用事件捕获
  $(document).on('click','.page-item',function(){
    // 如果是不能触发上下页或者是当前激活项，不能点击，并直接返回
    if($(this).hasClass('disable')||$(this).hasClass('active')){
      return;
    }
    // 回调是函数，获取所点击的选项data-value的值，并作为参数传入
    typeof _this.option.onSelectPage === 'function' ?
     _this.option.onSelectPage($(this).data('value')):null;
  });
};
Pagination.prototype.render = function(userInfo){
  this.option = $.extend({},this.defaultOption,userInfo);
  if(!(this.option.container instanceof jQuery)){
    return;
  }
  if(this.option.pages <=1){
    return;
  }
  this.option.container.html(this.getPaginationHtml());
};

Pagination.prototype.getPaginationHtml = function(){
  var pageArray = [],
      html = '',
      star = this.option.pageNum - this.option.pageRange > 0 ?
            this.option.pageNum - this.option.pageRange : 1,
      end = this.option.pageNum + this.option.pageRange < this.option.pages ? 
            this.option.pageNum + this.option.pageRange : this.option.pages;
  pageArray.push({
    name: '上一页',
    value: this.option.prePage,
    disable: (!this.option.hasPreviousPage)
  });
  for(var i=star;i<=end;i++){
    pageArray.push({
      name: i,
      value: i,
      disable: (i===this.option.pageNum)
    })
  };
  pageArray.push({
    name: '下一页',
    value: this.option.nextPage,
    disable: (!this.option.hasNextPage)
  });
  html = _tools.renderHtml(htmlTemplate,{
    pageArray:pageArray,
    pageNum: this.option.pageNum,
    pages: this.option.pages
  });
  return html;
};


module.exports = Pagination;


