/*
* @Author: k_denng
* @Date:   2017-08-01 14:27:16
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-01 17:19:05
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
var _user = require('../../service/user-service.js');

var formError = {
  show: function(errorMsg){
    $('.user-box .error').show().find('span').text(errorMsg);
  },
  hide:function(){
    $('.user-box .error').hide().find('span').text('');
  }
};

var page = {
  data : {
    username: '',
    question: '',
    token: ''
  },
  init: function(){
    this.bindEvent();
    this.loadStepUsername();
  },
  bindEvent: function(){
    var _this = this;
    $('#submit-username').on('click',function(){
      var username = $.trim($('#username').val());
      console.log(username);
      if(username){
        _user.getQuestion({
          username: username
        },function(result){
          _this.data.username = username;
          _this.data.question = result;
          // console.log(result);
          _this.loadStepAnswer();
        },function(errorMsg){
          formError.show(errorMsg);
        });
      }else{
        formError.show('请输入正确的用户名');
      }
    });

    $('#submit-answer').on('click',function(){
      var answer = $.trim($('#answer').val());
      if(answer){
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        },function(result){
          _this.data.token = result;
          _this.loadStepNewPassword();
        },function(errorMsg){
          formError.show(errorMsg);
        });
      }
    });

    $('#submit-new-password').on('click',function(){
      var password = $.trim($('#password').val());
      if(password && password.length>6){
        _user.forgetResetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        },function(result){
          window.location.href = './result.html?type=password-reset';

        },function(errorMsg){
          formError.show(errorMsg);
        });
      }else{
        formError.show('密码不能少于6位数');
      }
    });

  },
  loadStepUsername: function(){
    $('#step-username').show();
  },
  loadStepAnswer: function(){
    // 先清除错误的提示
    formError.hide();
    $('#step-username').hide().siblings('#step-answer')
    .show().find('.question').text(this.data.question);
  },
  loadStepNewPassword: function(){
    formError.hide();
    $('#step-answer').hide().siblings('#step-new-password')
    .show();
  }
};
module.exports = page;
$(function(){
  page.init();
});





