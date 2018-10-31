// pages/order/index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js");

Page({
  // 页面初始数据
  data: {

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    ifAppointment: 0,
    userList: []
  },


  // 跳转至详情页
  navigateDetail: function(e) {
    var userId = e.currentTarget.dataset.id;
    console.log(userId);
    wx.navigateTo({
      url: '../detail/detail?userId=' + userId
    });
  },
  phoneCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phn
    })
  },

  collectAndPraise: function(e) {
    var _this = this;
    var discountId = _this.data.discountId;
    var type = e.currentTarget.dataset.type;
    var param = {};
    param.discountId = discountId;
    param.type = type;
    network.doPost('markOrThumbsUpForDiscount', param, function(res) {
      _this.detail();
    });
  },

  onLoad: function(options) {
    var _this = this;
    var discountId = options.discountId;
    var ifAppointment = options.ifAppointment;
    _this.setData({
      'discountId': discountId,
      'ifAppointment': ifAppointment
    });
    _this.detail();
  },

  detail: function() {
    var _this = this;
    var param = {};
    param.discountId = _this.data.discountId;
    network.doPost('selectDiscountDetail', param, function(res) {
      if (res) {
        var address = res.addrList;
        res.lists = address.split("\n");
        _this.setData(res);
      }
    });
    network.doPost('selectDiscountPlus', param, function(res) {
      if (res && !isEmptyObject(res)) {
        var createDateList1 = res.createDateList;
        var userNameList1 = res.userNameList;
        var telList1 = res.telList;
        var userHeaderImageUrl1 = res.userHeaderImageUrl;
        var createDateList = [];
        var userNameList = [];
        var telList = [];
        var userHeaderImageUrl = [];
        if (createDateList1 != '') {
          createDateList = createDateList1.split(",");
        }
        console.log(createDateList);
        if (userNameList1 != '') {
          userNameList = userNameList1.split(",");
        }
        if (telList1 != '') {
          telList = telList1.split(",");
        }
        if (userHeaderImageUrl1 != ''){
          userHeaderImageUrl = userHeaderImageUrl1.split(",");
        }
        var userList = [];
        for (var i = 0; i < createDateList.length; i++) {
          userList.push({
            "createDate": createDateList[i],
            "userName": userNameList[i],
            "tel": telList[i],
            "userHeaderImageUrl": userHeaderImageUrl[i]
          });
        }
        _this.setData({
          "userList": userList
        });
      }
    });
  }

})

function isEmptyObject(obj) {
  for (var key in obj) {
    return false

  };
  return true
};