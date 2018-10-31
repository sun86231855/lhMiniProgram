const app = getApp()
//var openId = '77a5a5f364c84a6c864fa5aa1593a6d4';
var network = require("../../utils/network.js");
// pages/CooperationDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    itemList: [
      { name: '收藏', markUpStatus: 0, cooperateId:""},

    ],
    markupName:"111",
    markUpStatus:""
  },
  /*xuanz*/
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
    var markUpStatus = this.data.markUpStatus;
    console.log("markUpStatus================" + markUpStatus);
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

    network.doPost('markUpCooperate', param, function (res) {
      if (markUpStatus == '1') {
       wx.showToast({
         title: '收藏成功',
       })
      } else {
        wx.showToast({
          title: '取消成功',
        })
      }
      _this.setData({
        markUpStatus: markUpStatus,
        markupName: markupName
      });
    });
  },

  /*xuanzend*/

  chooseCatalog: function (data) {
    var that = this;
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })


  },

  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phn
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
	var cooperateId = options.cooperateId;
    var headImageUrl = options.headImageUrl;
	var param = {};
    param.headImageUrl = headImageUrl;
	param.cooperateId = cooperateId;
	//param.openId = openId;
	
	network.doPost('selectCooperateDetail', param, function(res){
	  if(res){
		_this.setData({
          "offerTitle": res.offerTitle,
      "headImageUrl": res.headImageUrl,
		  "companyName": res.companyName,
		  "offerNeedIndustry": res.offerNeedIndustry,
		  "offerIndustry": res.offerIndustry,
		  "offerSender": res.offerSender,
		  "offerSenderId": res.offerSenderId,
		  "offerTelephone": res.offerTelephone,
		  "offerText": res.offerText,
		  "offerCreateDate": res.offerCreateDate,
      markUpStatus: res.markUpStatus,
      markupName: res.markUpStatus == 0 ? "收藏":"取消收藏",
      cooperateId: cooperateId
        });
	  }
	});
	
  },

  // 跳转人员至详情页
  navigateDetail: function (e) {
    var userId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?userId=' + userId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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