/*
* @Author: k_denng
* @Date:   2017-07-28 23:20:00
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-03 22:27:34
*/

'use strict';
require('./head-search.less');
var _tools = require('../../../util/tools.js');

var headSearch = {
  init: function(){
    this.onLoad();
    this.bingEvent();
  },
  /**
   * 载入后，输入框会变成索要查询的关键字
   * @return {[type]} [description]
   */
  onLoad: function(){
    var keyword = _tools.getUrlParam('keyword');
    if(keyword){
      $('#search-input').val(keyword);
    }
  },
  bingEvent: function(){
    var _this = this;
    /**
     * 点击搜索提交
     * @param  {[type]} event){                   _this.searchSubmit();    } [description]
     * @return {[type]}          [description]
     */
    $('#search-btn').on('click',function(event){
      _this.searchSubmit();
    });
    /**
     * 回车后提交
     * @param  {[type]} event){                   if(event.keyCode [description]
     * @return {[type]}          [description]
     */
    $('#search-input').on('keyup',function(event){
      if(event.keyCode === 13){
        _this.searchSubmit();
      }
    });
  },
  /**
   * 执行搜索的提交函数
   * @return {[type]} [description]
   */
  searchSubmit: function(){
    var keyword = $.trim($('#search-input').val());
    if(keyword){
      window.location.href = './list.html?keyword=' + keyword;
    }else{
      _tools.goHome();
    }
  }
};


headSearch.init();


