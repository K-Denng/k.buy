/*
* @Author: k_denng
* @Date:   2017-07-31 14:24:43
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 13:28:36
*/

'use strict';
var _tools = require('../util/tools.js');
var user = {
  /**
   * 用户登录请求
   * @param  {[type]} userInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  login: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 检查用户名是否存在
   * @param  {[type]} username [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  checkUsername: function(username,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/check_valid.do'),
      data: {
        str: username,
        type: 'username'
      },
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 新用户注册请求
   * @param  {[type]} userInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  register: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 退出登陆请求
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  logout: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取登录用户的信息
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getUserInfo: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取用户信息附带强制登陆
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   * @return {[type]}         [description]
   */
  getUserInformation: function(success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/get_information.do'),
      method: 'POST',
      success: success,
      error: error
    });
  },
  /**
   * 获取修改密码时所要回答的问题
   * @param  {[type]} userInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  getQuestion: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/forget_get_question.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    })
  },
  checkAnswer: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    })
  },
  forgetResetPassword: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    })
  },
  /**
   * 更新个人信息
   * @param  {[type]} userInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  updateInfo: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/update_information.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    })
  },
  /**
   * 登陆状态中的重制密码
   * @param  {[type]} userInfo [description]
   * @param  {[type]} success  [description]
   * @param  {[type]} error    [description]
   * @return {[type]}          [description]
   */
  resetPassword: function(userInfo,success,error){
    _tools.request({
      url: _tools.getServerUrl('/user/reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: success,
      error: error
    });
  }
};

module.exports = user;


