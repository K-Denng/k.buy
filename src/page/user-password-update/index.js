/*
* @Author: k_denng
* @Date:   2017-08-02 13:10:10
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 14:53:19
*/

'use strict';
require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');

var navSide = require('../common/nav-side/index.js');
var _tools = require('../../util/tools.js');
var _user = require('../../service/user-service.js');


var page = {
  init : function(){
    navSide.init('user-password-update');
    this.bindEvent();
  },
  bindEvent : function(){
    var _this = this;
    $('.btn-submit').on('click',function(){
      var data = {
        password: $.trim($('#password').val()),
        passwrodNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val())
      };
      var validate = _this.formValidate(data);
      if(validate.status){
        _user.resetPassword({
          passwordOld: data.password,
          passwordNew: data.passwrodNew
        },function(result){
          _tools.successTips(result);
          window.location.href = './user-login.html';
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }else{
        _tools.errorTips(validate.msg);
      }
    });
  },
  formValidate: function(data){
    var result = {
      status: false,
      msg: ''
    };

    if(!_tools.validate(data.passwrodNew,'require')||!_tools.validate(data.passwrodNew,'require')){
      result.msg = '密码不能为空';
      return result;
    }
    if(data.passwrodNew.length<6){
      result.msg = '密码长度必须大于六位数';
      return result;
    }
    if(data.passwrodNew!==data.passwordConfirm){
      result.msg = '两次输入的密码不一致';
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