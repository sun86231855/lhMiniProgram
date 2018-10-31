// pages/reward_details/reward_details.js

//获取应用实例
var app = getApp()
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
      itemList: [
      { name: '收藏', markUpStatus: 0, cooperateId:""},

    ],
    markupName:"收藏",
    markUpStatus:""
    
  },
  
  /*xuanz*/
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
    var markUpStatus = this.data.markUpStatus;
    var markupName = "";
    if (markUpStatus == '0') {
      markUpStatus = '1';
      markupName = "取消收藏";
    } else if (markUpStatus == '1') {
      markUpStatus = '0';
      markupName = "收藏"
    }

    console.log("shoucangshoucang");

    var _this = this;
    var cooperateId = this.data.cooperateId;

    var param = {};
    param.cooperateId = cooperateId;
    //param.openId = openId;


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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var cooperateId = options.cooperateId;
	this.getDetails(cooperateId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
	
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  
})
