/*
* @Author: K_Denng
* @Date:   2017-07-26 16:40:02
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-02 02:17:53
*/

'use strict';
// require('./index.less');
require('../common/nav/index.js');
require('../common/head-search/head-search.js');
// var _tools = require('util/tools.js');
var _tools = require('../../util/tools.js');
var navSide = require('../common/nav-side/index.js');
navSide.init('user-center');



// var html = '<div>{{ test }}</div>';
// var data = { test:'this is a template'};

// // _tools.renderHtml(html,data);
// console.log(_tools.renderHtml(html,data));


