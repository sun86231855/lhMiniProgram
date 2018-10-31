//add_reward.js
//获取应用实例
var app = getApp()
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
	  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.removeStorage({
      key:'neetIndustrySelected'
	});
  },
  
  onShow: function(options){
	var _this = this;
	wx.getStorage({
	  key:'neetIndustrySelected',
	  success:function(res){
		var selected = res.data;
		_this.getSelectedIndustry(selected);
	  }
	});   
  },
  
  getSelectedIndustry: function(selectedIndustry){
	var _this = this;
	var ids = [];
	for(var i=0;i<selectedIndustry.length;i++){
	  ids.push(selectedIndustry[i].id);
	} 
	_this.setData({
	  "industryList": selectedIndustry,
	  "industryIds": ids.join(',')
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
  
  check:function(e) {
	var _this = this;
    var industryIds = _this.data.industryIds;
	console.log(industryIds);
    wx.navigateTo({
      url: '../need/need?selectedIndustryIds=' + industryIds
    })
  },
  
  submitCooperate:function(){
	var _this = this;
    var param = {};
	param.subject = _this.data.subject;
	param.summary = _this.data.summary;
	param.tradeId = _this.data.industryIds;
    network.doPost('addCooperateForMy', param, function (res) {
	  console.log(res);
      wx.navigateBack(); 
    });
	  
	  
	  
  }
})
