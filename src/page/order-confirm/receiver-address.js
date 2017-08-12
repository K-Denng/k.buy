/*
* @Author: k_denng
* @Date:   2017-08-09 16:29:02
* @Last Modified by:   k_denng
* @Last Modified time: 2017-08-11 01:39:40
*/

'use strict';
var receiverAddressTemplate = require('./receiver-address.string');
var _cities = require('../../util/cities/index.js');
var _order = require('../../service/order-service.js');
var _receiver = require('../../service/receiver-service.js');
var _tools = require('../../util/tools.js');

var receiverAddress = {
  data: {

  },
  show : function(option){
    this.option = option;
    this.option.data = option.data || {};
    this.loadForm();
  },
  hide : function(){
    $('.form-wrap').empty();
  },
  /**
   * 加载表单
   * @return {[type]} [description]
   */
  loadForm : function(){
    var html = _tools.renderHtml(receiverAddressTemplate,{
      isUpdate : this.option.isUpdate,
      data : this.option.data
    });
    $('.form-wrap').html(html);
    this.loadProvince();
    this.bingEvent();
  },
  /**
   * 加载省份选项
   * @return {[type]} [description]
   */
  loadProvince : function(){
    var province = _cities.getProvince() || [];
    $('#receiver-province').html(this.getOption(province));
    if(!!this.option.isUpdate){
      $('#receiver-province').val(this.option.data.receiverProvince);
      this.loadCities(this.option.data.receiverProvince);
    }
  },
  /**
   * 加载城市下拉选项
   * @param  {[type]} provinceName [description]
   * @return {[type]}              [description]
   */
  loadCities : function(provinceName){
    var cities = _cities.getCities(provinceName) || [];
    $('#receiver-cities').html(this.getOption(cities));
    if(!!this.option.isUpdate){
      $('#receiver-cities').val(this.option.data.receiverCity);
    }
  },
  /**
   * 获取下拉框选项
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  getOption : function(array){
    var html = '<option value="">请选择</option>';
    for(var i=0,length = array.length;i<length;i++){
      html += '<option value="'+ array[i] +'">'+array[i]+'</option>';
    }
    return html;
  },
  /**
   * 获取地址表单的信息，返回一个带有状态和信息的对象
   * @return {[type]} [description]
   */
  getReceiverInfo : function(){
    var info = {},
        result  = {
          status : false,
          data : ''
        };
    info.receiverName = $.trim($('#receiver-name').val());
    info.receiverPhone = $.trim($('#receiver-tel').val());
    info.receiverProvince = $.trim($('#receiver-province').val());
    info.receiverCity = $.trim($('#receiver-cities').val());
    info.receiverAddress = $.trim($('#receiver-address').val());
    info.receiverZip = $.trim($('#receiver-zip').val());
    if(this.option.isUpdate){
      info.id = $.trim($('#receiver-id').data('id'));
    }
    if(!info.receiverName){
      result.errorMsg = '收货人不能为空';
    }
    else if(!info.receiverProvince){
      result.errorMsg = '请选择省份';
    }
    else if(!info.receiverCity){
      result.errorMsg = '请选择城市';
    }
    else if(!info.receiverAddress){
      result.errorMsg = '请填写详细地址';
    }
    else if(!_tools.validate(info.receiverPhone,'phone')){
      result.errorMsg = '请输入正确的手机号码';
    }
    else{
      result.status = true;
      result.data = info;
    }
    return result;
  },
  bingEvent : function(){
    var _this = this;
    // 仅有当省份改变时候才会引起城市联动的改变
    $(document).on('change','#receiver-province',function(){
      var provinceName = $(this).val();
      _this.loadCities(provinceName);
    });
    // 点击确认提交新增地址
    $(document).on('click','.btn-submit-address',function(){
      _this.data = _this.getReceiverInfo();
      // 是新增地址并且验证成功
      if(!_this.option.isUpdate && _this.data.status){
        _receiver.saveReceiverInfo(_this.data.data,function(result){
          _tools.successTips('成功添加地址');
          _this.hide();
          typeof _this.option.success === 'function' && _this.option.success(result);
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }else if(_this.option.isUpdate && _this.data.status){
        _receiver.updateReceiverInfo(_this.data.data,function(result){
          _tools.successTips('成功更新地址');
          _this.hide();
          typeof _this.option.success === 'function' && _this.option.success(result);
        },function(errorMsg){
          _tools.errorTips(errorMsg);
        });
      }else{
        _tools.errorTips(_this.data.errorMsg);
      }
    });
    $(document).on('click','.close',function(){
      _this.hide();
    });
  }

};

module.exports = receiverAddress;


