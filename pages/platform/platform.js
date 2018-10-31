//platform.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
	  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var _this = this;
	var communityId = options.communityId;
	_this.setData({
      communityId :communityId
    });
  },
  
  inputName: function(e){
	var name = e.detail.value;
	this.setData({
      'name':name
	});  
  },
  
  inputRemark: function(e){
	var remark = e.detail.value;
	this.setData({
      'remark':remark
	});  
  },
  
  
  submit(e) {
	var d = this.data;
	var param = {};
	param.type =  '2';
	param.communityId = d.communityId;
	param.remark = d.remark;
	param.name = d.name;
	network.doPost('insertAssociationAuthentication', param, function (res) {
      wx.showModal({
        title: '通知',
        content: '您的认证已经提交到后台进行审核火灾1-3个工作日内完成审核  谢谢',
        showCancel: false, //不显示取消按钮
        confirmText: '确定',
		success:function(){
		  wx.navigateBack();
		}
      });
    });
  }
})
