// pages/reward_set/reward_set.js
var app = getApp()
var network = require("../../utils/network.js");
var util = require('../../utils/util');

Page({
  // 页面初始数据
  data: {
    summary:'请填写合作内容',
    flag1:false,
    flag2:true,
    selectData: ['产品合作', '技术合作', '销售渠道', '媒体合作', '土地场地', 'ToB服务', '招商合作'],
    index: "", //选择的下拉列表下标
    
  },

  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      flag1: true,
      flag2: false,
      indexd: e.detail.value,

    });
  }, 
  
  onLoad: function (options) {
	var cooperateId = options.cooperateId;
	if(cooperateId){
	  this.getDetails(cooperateId);
	}
  },
  
  getDetails : function(cooperateId){
	var _this = this;
    var param = {};
	param.cooperateId = cooperateId;
    network.doPost('getCooperateDetailForMy', param, function (res) {
      if(res){
		_this.setData(res);
	  }
    });
  },
  
  inputSubject:function(e){
	var subject = e.detail.value;
	this.setData({
      'subject' : subject
	});
  },
  
  textareaSummary:function(e){
	var summary = e.detail.value;
	this.setData({
      'summary' : summary
	});
  },
  
  checkIndustryShow(e) {
	var _this = this;
	var selectedId = _this.data.tradeId;
	wx.navigateTo({
		url: '../need/need?selectedId=' + selectedId+"&type=3"
	})
  },
  
  checkIndustryResult(data){
    this.setData({
      tradeId:data.id,
      tradeName:data.name
    });
  },
  
  submitCooperate:function(){
	var _this = this;
	var cooperateId = _this.data.cooperateId;
	if(cooperateId){ //修改
      var param = {};
	  param.cooperateId = _this.data.cooperateId;
	 if(util.checkText(_this.data.subject,false)){
		param.subject = _this.data.subject;
	  }else{
		util.alert('请输入主题');
		return;
	  }
	  if(util.checkText(_this.data.tradeId,false)){
		param.tradeId = _this.data.tradeId;
	  }else{
		util.alert('请选择行业');
		return;
	  }
	  if(util.checkText(_this.data.summary,false)){
		param.summary = _this.data.summary;
	  }else{
		util.alert('请输入内容');
		return;
	  }
      network.doPost('updateCooperateDetailForMy', param, function (res) {
        wx.navigateBack(); 
      });
	}else{ //新增
	  var param = {};
	  if(util.checkText(_this.data.subject,false)){
		param.subject = _this.data.subject;
	  }else{
		util.alert('请输入主题');
		return;
	  }
	  if(util.checkText(_this.data.tradeId,false)){
		param.tradeId = _this.data.tradeId;
	  }else{
		util.alert('请选择行业');
		return;
	  }
	  if(util.checkText(_this.data.summary,false)){
		param.summary = _this.data.summary;
	  }else{
		util.alert('请输入内容');
		return;
	  }
      network.doPost('addCooperateForMy', param, function (res) {
        wx.navigateBack(); 
      });
	}
    
  }
  
  
})
