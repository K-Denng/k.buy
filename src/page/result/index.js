/*
* @Author: k_denng
* @Date:   2017-07-30 14:41:15
* @Last Modified by:   k_denng
* @Last Modified time: 2017-07-30 15:24:19
*/

'use strict';
require('./result.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
var _tools = require('../../util/tools.js');
$(function(){
  var type = _tools.getUrlParam('type') || 'default';
  $('.'+ type+ '-success').show();
})