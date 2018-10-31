// pages/cuotuan/index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
var network = require("../../utils/network.js")
var config = require("../../utils/config.js");


Page({
  // 页面初始数据
  data: {
    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
    banner_url: fileData.getBannerData(),
    percent: 90,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    navCTTopItems: fileData.getCTNavData(),
    navCTSectionItems: fileData.getCTNavSectionData(),
    curNavId: 1,
    curIndex: 0, show: false//控制下拉列表的显示隐藏，false隐藏、true显示
  
  },


  onLoad: function () {
    var that = this;
    // getData(0, "1", that);

    wx.checkSession({
      　　　　success: function (res) {
        　　　　　　console.log("搓团onload加载：处于登录态");
              getData(0, "1", that);
      　　　　},
      　　　　fail: function (res) {

    wx.login({
      success: function (res) {
        console.log("wx login success");
        if (res.code) {
          var param = {};
          param.code = res.code;
          //发起网络请求
          wx.request({
            url: config.serverUrl + '/login',
            data: param,
            method: "POST",
            timeout: 15000,
            success: function (result) {
              console.log("index onLoad 获取到的新token:");
              console.log(result);
              var res = result.data.body;
              if (res) {

                console.log("wx login success:token" + res.token);
                wx.setStorageSync('token', res.token);
                wx.setStorageSync('openId', res.openId);
                //重新发起请求

                getData(0, "1", that);

                //              doPost(method, param, success, fail);
              }
            },
            fail: function (res) {
              console.log('服务器验证登录态失败！' + res.errMsg);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }


        // end 获取token


      }
    })
      }});


  },
  //标签切换
  switchTab: function (e) {
    let id = e.currentTarget.dataset.id,
    index = parseInt(e.currentTarget.dataset.index)
    this.curIndex = parseInt(e.currentTarget.dataset.index)
    var that = this;
    this.setData({
      curNavId: id,
      curIndex: index,
    })
    getData(index, (index + 1).toString(), that);
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navCTSectionItems[curid].length === 0) return

    var that = this
    that.data.navCTSectionItems[curid] = that.data.navCTSectionItems[curid].concat(that.data.navCTSectionItems[curid])
    that.setData({
      list: that.data.navCTSectionItems,
    })
  },  // book
 doCuoTap: function (e) {
    wx.navigateTo({
      url: '../ctdetial/detail?id='  + e.currentTarget.dataset.aid
    })
  }
})

function getData(index, typeparm, that) {
  var dataList = new Array(4);
  var param = {
    "type": typeparm,
	"pageNum" : "1"
  };
  //获取圈子列表
  network.doPost('selectMatchBuyList', param, function (res) {
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
