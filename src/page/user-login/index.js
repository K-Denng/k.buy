/*
* @Author: K_Denng
* @Date:   2017-07-26 20:10:54
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 21:40:52
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
    $('.user-box .error').show().find('span').text('');
  }
};
var page = {
  init: function(){
    this.bingEvent();
  },
  bingEvent: function(){
    var _this = this;
    $('.btn-submit').on('click',function(){
      _this.submit();
    });
    $('.user-input').on('keyup',function(event){
      if(event.keyCode === 13){
        _this.submit();
      }
    });
  },
  /**
   * 提交验证
   * @return {[type]} [description]
   */
  submit:function(){
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    };
    var validateResult = this.formValidate(formData);
    // 验证成功
    if(validateResult.status){
      _user.login(formData,function(result){
        // window.location.href = _tools.getUrlParam('redirect') || './index.html';
        window.location.href = './index.html';
      },function(errorMsg){
        formError.show(errorMsg);
      })
    }else {
      formError.show(validateResult.msg);
    }
  },

  /**
   * 验证函数，返回一个result对象
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  formValidate: function(data){
    var result = {
      status: false,
      msg: ''
    };
    if(!_tools.validate(data.username,'require')){
      result.msg = '用户名不能为空'
      return result;
    }
    if(!_tools.validate(data.password,'require')){
      result.msg = '密码不能为空'
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

