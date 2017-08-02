/*
* @Author: k_denng
* @Date:   2017-08-02 02:06:50
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 04:16:00
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var navSide = require('../common/nav-side/index.js');
var _tools = require('../../util/tools.js');
var _user = require('../../service/user-service.js');

var htmlTemplate = require('./index.string');

var page = {
  init : function(){
    navSide.init('user-center');
    this.loadUserInfo();
  },
  loadUserInfo : function(){
    var html = '';
    _user.getUserInformation(function(result){
      html = _tools.renderHtml(htmlTemplate,result);
      $('.panner-body').html(html);
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  }
};

$(function(){
  page.init();
});