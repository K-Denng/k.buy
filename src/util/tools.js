/*
* @Author: K_Denng
* @Date:   2017-07-28 07:19:23
* @Last Modified by:   k_denng
* @Last Modified time: 2017-07-30 12:30:16
*/
// 通用工具
'use strict';
const Hogan = require('hogan.js');
// const artTemplate = require('art-template');
var conf = {
  serverHost:''
};
var tools = {
  /**
   * 网络请求
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  request: function(param){
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data ||'',
      success: function(result){
        // 请求成功
        if(0 === result.status){
          typeof param.success === 'function' && param.success(result.data,result.msg);
        }
        // 没有登陆状态的时候要强制登陆
        else if(10 === result.status){
          _this.toLogin();
        }
        else if(1 === result.status){
          typeof param.error === 'function' && param.error(result.msg);
        }
      },
      error: function(err){
        typeof param.error === 'function' && param.error(result.statusText);
      }
    })
  },

  /**
   * 统一登陆处理
   * 跳转到login页面？后为告知是从哪里跳过去，方便登陆完毕后再返回
   * @return {[type]} [description]
   */
  toLogin: function(){
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  /**
   * 回到首页处理
   * @return {[type]} [description]
   */
  goHome: function(){
    window.location.href = './index.html';
  },

  /**
   * 获取服务器地址
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  getServerUrl: function(path){
    return conf.serverHost + path;
  },

  /**
   * 渲染HTML模板
   * @param  {[type]} htmlTemplate [description]
   * @param  {[type]} data         [description]
   * @return {[type]}              [description]
   */
  renderHtml: function(htmlTemplate,data){
    var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
    return result;
  },

  /*renderHtml: function(htmlTemplate,data){
    var template = artTemplate.compile(htmlTemplate),
        result = template.render(data);
        return result;
  },*/

  /**
   * 成功提示
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  successTips: function(msg){
    alert(msg||'操作成功！');
  },

  /**
   * 错误提示
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  errorTips: function(msg){
    alert(msg||'好像哪里不对的样子～');
  },

  validate: function(value,type){
    // 去除两边空格，并伴有强制转换为字符类型的功效
    var value = $.trim(value);
    if('require' === type){
      // 非空验证
      return !!value;
    }else if('phone' === type){
      // 手机号码
      return /^1[34578]\d{9}$/.test(value);
    }else if('email' === type){
      // 邮箱验证
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
    }
  },

  /**
   * 获取url参数
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getUrlParam: function(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result?result[2]:null;
  }

};
module.exports = tools;


