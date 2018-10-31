//association.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")
Page({
  // 页面初始数据
  data: {
    src: '../../images/add.png',
    list:"",
    isShow: false
  },
  onLoad: function (options) {
    var that = this;
    var param = { 
    };
    //获取我的社群
    network.doPost('getCommunityListForMy', param, function (res) {
      var communtiyList = res.communtiyList;
      if (communtiyList != null) {
        that.setData({
          list: communtiyList,
          isShow: (options.isShow == "true" ? true : false)
        });
      }
    });
   
  },
  invSBody:function(e){
    console.log(e.currentTarget.dataset.id);
    return false;
  },
  // detialSQ
  detialSQ: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../association_details/association_details?id=' + id
    })
  },
  is_show: function(e) {
    var that = this;
    that.setData({
      isShow: (!that.data.isShow)
    })
    
  }

 
})
