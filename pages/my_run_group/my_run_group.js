//my_run_group.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js"); 
Page({
  // 页面初始数据
  data: {
    tab: ['进行中', '已完结', '退款中'],
    currentTab: 0,
    scrHeight: wx.getSystemInfoSync().windowHeight,
    list:""
  },
  onLoad: function () {
    var that = this;
    getData(0, "1", that);
  },
  refund:function(e) { 
    wx.showModal({
      title: '提示',
      content: '确定要退款吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            "orderId": e.currentTarget.dataset.aid,
            "summary":""
          };
          //获取我的搓团列表
          network.doPost('cancelMatchBuyForMy', param, function (res) {
            if (res) {
              wx.showToast({
                title: '退款成功',
              })
            }
          });
        } else if (sm.cancel) {
            console.log('用户点击取消')
        }
      }
    })
  },
  doCuoTap: function (e) {
    wx.navigateTo({
      url: '../ctdetial/detail?id=' + e.currentTarget.dataset.aid + '&personal=1'
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    var currIndex = e.detail.current;
    getData(currIndex, (currIndex + 1).toString(), that);
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      var currIndex  =  e.target.dataset.current;
     // getData(currIndex, (currIndex + 1).toString(), that);
    }
  },
  //点击删除按钮事件  
  delItem: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          var param = {};
          param.type = that.data.type;
          param.discountId = id;
          network.doPost('deleteDiscountForMy', param, function (res) {
            that.query();
          });
        }
      }
    });
  },
  // 跳转至交易记录页
  record() {
    wx.navigateTo({
      url: '../record/record'
    })
  }
})


function getData(index, typeparm, that) {
  var dataList = new Array(3);
  var param = {
    "type": typeparm,
	"pageNum" : '1'
  };

  //获取我的搓团列表
  network.doPost('getMatchBuyListForMy', param, function (res) {
    if (res) {
      var matchBuyList = res.matchBuyList;  
      if (matchBuyList != null) {
        dataList[index] = matchBuyList;
        that.setData({
          list: dataList
        })
      }
    }
  });
}