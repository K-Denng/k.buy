/*
* @Author: k_denng
* @Date:   2017-08-02 02:07:03
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 12:40:45
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
    this.bindEvent();
  },
  loadUserInfo : function(){
    var html = '';
    _user.getUserInformation(function(result){
      html = _tools.renderHtml(htmlTemplate,result);
      $('.panner-body').html(html);
    },function(errorMsg){
      _tools.errorTips(errorMsg);
    });
  },
  bindEvent : function(){
    var _this = this;
    // 因为是用js动态创建，直接在元素上绑定事件是在执行的时候找不到
    // 所以需要在更高一级监听事件，通过冒泡方法监听
    $(document).on('click','.btn-submit',function(){
      var data = {
        email: $.trim($('#email').val()),
        phone: $.trim($('#phone').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
      };
      var validate = _this.formValidate(data);
      if(validate.status){
        _user.updateInfo(data,function(result){
          _tools.successTips(result.msg);
          window.location.href = './user-center.html';
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }
    });
  },
  formValidate: function(data){
    var result = {
      status: false,
      msg: ''
    };

    if(!_tools.validate(data.phone,'phone')){
      result.msg = '请输入正确的手机号';
      return result;
    }
    if(!_tools.validate(data.email,'email')){
      result.msg = '邮箱格式不正确';
      return result;
    }
    if(!_tools.validate(data.question,'require')){
      result.msg = '密码提示问题不能为空';
      return result;
    }
    if(!_tools.validate(data.answer,'require')){
      result.msg = '密码提示答案不能为空';
      return result;
    }
    result.msg = '验证通过';
    result.status = true;
    return result;
  }
};

$(function(){
  page.init();
});