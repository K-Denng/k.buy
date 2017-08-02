/*
* @Author: k_denng
* @Date:   2017-07-28 20:22:48
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-01 10:20:59
*/

'use strict';

require('./index.less');
var _tools = require('../../../util/tools.js');
var _user = require('../../../service/user-service.js');
var _cart = require('../../../service/cart-service.js');

var nav = {
  init: function(){
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
  },
  bindEvent: function(){
    $('.js-login').on('click',function(){
      _tools.toLogin();
    });

    $('.js-register').on('click',function(){
      window.location.href = './user-register.html';
    });

    // 退出登陆
    $('.js-logout').on('click',function(){
      _user.logout(function(result){
        // 只需重新刷新页面即可
        window.location.reload();
      },function(errorMsg){
        _tools.errorTips(errorMsg);
      });
    });

  },
  /**
   * 加载用户名
   * @return {[type]} [description]
   */
  loadUserInfo: function(){
    _user.getUserInfo(function(result){
      $('.user.not-login').hide().siblings('.user.login').show().find('.user-name').text(result.username);
    },function(errorMsg){
      // 不做任何处理
    });
  },
  /**
   * 获取购物车数量请求
   * @return {[type]} [description]
   */
  loadCartCount: function(){
    _cart.getCartCount(function(result){
      $('.cart-count').text(result|| 0);
    },function(errorMsg){
      $('.cart-count').text(0);
    });
  }
}
module.exports = nav;
$(function(){
  nav.init();
})

