//call_center.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")
Page({
  // 页面初始数据
  data: {
    alert_status: true,
    alert_content: '验证码输入有误'
  },
  submit: function() {
    if (this.data.alert_status) {
	  var param = {};
      param.summary = this.data.summary;
	  param.nickName = this.data.nickName;
	  param.tel = this.data.tel;
      network.doPost('insertFeedback', param, function (res) {
        wx.showModal({
          title: '通知',
          content: '已收到您的建议谢谢您的支持与理解希望能够收到您更多的建议',
          showCancel: false, //不显示取消按钮
          confirmText: '确定',
		  success : function(){
			  wx.navigateBack();
		  }
        });
      });
    } else {
      wx.showModal({
        title: '通知',
        content: '验证码输入有误',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      }) 
    }
  },
  
  textareaSummary:function(e){
	var summary = e.detail.value;
	this.setData({
      'summary':summary
	});
  },
  
  textareaNickName:function(e){
    var nickName = e.detail.value;
	this.setData({
      'nickName':nickName
	});
  },
  
  textareaTel:function(e){
    var tel = e.detail.value;
	this.setData({
      'tel':tel
	});
  },
})
