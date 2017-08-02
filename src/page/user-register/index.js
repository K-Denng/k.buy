/*
* @Author: k_denng
* @Date:   2017-07-31 19:17:01
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-01 14:51:56
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');

var _tools = require('../../util/tools.js');
var _user = require('../../service/user-service.js');


var formError = {
  show: function(msg){
    $('.user-box .error').show().find('span').text(msg);
  },
  hide: function(){
    $('.user-box .error').hide().find('span').text('');
  }
};
var page = {
  init: function(){
    this.bingdEvent();
  },
  bingdEvent: function(){
    var _this = this;
    $('#username').on('blur',function(event){
      var username = $(this).val();
      if(!username){
        return;
      }
      _user.checkUsername(username,function(result){
        formError.hide();
      },function(errorMsg){
        formError.show(errorMsg);
      })
    });
    $('.btn-submit').on('click',function(){
      _this.submit();
    });
    $('.user-input').on('keyup',function(event){
      if(event.keyCode === 13){
        _this.submit();
      }
    });
  },
  submit: function(){
    var data = {
        username : $.trim($('#username').val()),
        password : $.trim($('#password').val()),
        passwordAgain: $.trim($('#passwordAgain').val()),
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
    };

    var validate = this.formValidata(data);
    if(validate.status){
      _user.register(data,function(){
        window.location.href = './result.html?type=register';
      },function(error){
        formError.show(error);
      });
    }else{
      formError.show(validate.msg);
    }
  },

  formValidata: function(data){
    var result = {
      status: false,
      msg: ''
    };

    if(!_tools.validate(data.username,'require')){
      result.msg = '用户名不能为空';
      return result;
    }
    if(data.password.length<6){
      result.msg = '密码长度不能小于6位';
      return result;
    }
    if(data.password!==data.passwordAgain){
      result.msg = '两次输入的密码不一致';
      return result;
    }
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
})



