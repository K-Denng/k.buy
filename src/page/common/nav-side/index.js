/*
* @Author: k_denng
* @Date:   2017-07-30 14:03:38
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-11 17:10:27
*/

'use strict';

require('./index.less');
var _tools = require('../../../util/tools.js');
var htmlTemplate = require('./index.string');
var navSide = {
  data: {
    active: '',
    navList: [
      {
        name:'user-center',
        describe:'个人中心',
        href:'./user-center.html'
      },
      {
        name:'order-list',
        describe:'我的订单',
        href:'./order-list.html'
      },
      {
        name:'user-password-update',
        describe:'修改密码',
        href:'./user-password-update.html'
      },
      {
        name:'about',
        describe:'关于我们',
        href:'./about.html'
      },
    ]
  },
  init: function(option){
    // 合并选项，弱继承，只能继承到data的子属性，所以对navlist没有改变
    // 只改变active属性，即我们所要激活的部分，对所默认选人的内容无影响
    $.extend(this.data,{active:option});
    this.renderNav();
  },
  /**
   * 根据条件渲染
   * @return {[type]} [description]
   */
  renderNav: function(){
    var listLength = this.data.navList.length;
    for(var i=0;i<listLength;i++){
      // 仅有当所输入的active字符串为数组中的name属性的时候才会带有true
      // 渲染的时候通过判断是否为true进行区分渲染
      if(this.data.navList[i].name === this.data.active){
        this.data.navList[i].isActive = true;
      }
    };
    var html = _tools.renderHtml(htmlTemplate,{
      list: this.data.navList
    });
    $('.nav-side').html(html);
  }
};
module.exports = navSide;


