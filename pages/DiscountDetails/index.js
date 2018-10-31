// pages/DiscountDetails/index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js");

Page({
  // 页面初始数据
  data: {

    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 5000,
    swiperCurrent: 0,
    duration: 1000
  },

  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
      currentSwiper: e.detail.current
    })
  },


  // 跳转至详情页
  navigateDetail: function (e) {
    var userId = e.currentTarget.dataset.id;
    console.log(userId);
    wx.navigateTo({
      url: '../detail/detail?userId=' + userId
    });
  },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phn
    })
  },

  collectAndPraise: function (e) {
    var _this = this;
    var discountId = _this.data.discountId;
    var type1 = e.currentTarget.dataset.type;
    console.log(type1);
    var param = {};
    param.discountId = discountId;
    param.type = type1;
    network.doPost('markOrThumbsUpForDiscount', param, function (res) {
      _this.detail();
    });
  },

  onLoad: function (options) {
    var _this = this;
    var discountId = options.discountId;
    _this.setData({
      'discountId': discountId
    });
    _this.detail();
  },

  detail: function () {
    var _this = this;
    var param = {};
    param.discountId = _this.data.discountId;
    network.doPost('selectDiscountDetail', param, function (res) {
      if (res) {
        var address = res.addrList;
        res.lists = address.split("\n");
        _this.setData(res);
      }
    });
  }

})