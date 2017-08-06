/*
* @Author: K_Denng
* @Date:   2017-07-26 16:40:02
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-03 17:14:23
*/

'use strict';
require('./index.less');
require('../../util/slider/index.js');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
// var navSide = require('../common/nav-side/index.js');
var templateSlider = require('./index.string');

$(function() {
  var templateHtml = _tools.renderHtml(templateSlider);
  $('.banner-content').html(templateHtml);
  $('.banner').unslider({
      speed: 500,               
      delay: 3000,
      dots: true,
      autoplay:true,//自动滑块,
      infinite:true  //无限滑块
    });
});


