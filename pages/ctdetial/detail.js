// pages/ctdetial/detail.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
    colors: ['red', 'orange', 'yellow', 'green'],
    // banner 初始化
    banner_url: fileData.getBannerData(),
    detailImageUrlList:"",
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    navctxqTopItems: fileData.getctxqNavData(),
    navctxqSectionItems: fileData.getctxqNavSectionData(),
    curNavId: 1,
    curMatchBuyId:"",
    curIndex: 0, show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    hiddenFlag:false,
    playTypeName:"",
    personal: true,
    imgItem:""
  },
  onLoad: function (options) {
    var that = this;
    var personal =  options.personal;
    if (personal != null && typeof (personal) != 'undefined'    && personal  == '1')    {
      that.setData({
        personal: false
      })
    }
    that.setData({
      curMatchBuyId: options.id
    })
    
    getData(0, options.id ,that);
  },
  //标签切换
  switchTab: function (e) {
    let id = e.currentTarget.dataset.id;
    var  index = parseInt(e.currentTarget.dataset.index) 
    this.curIndex = parseInt(e.currentTarget.dataset.index)
    var that = this
    this.setData({
      curNavId: id,
      curIndex: index,
    })
    if (index == 1){
      this.setData({
        hiddenFlag :true
      })
    }else{
      this.setData({
        hiddenFlag: false
      })
    }
    getData(index, that.data.curMatchBuyId, that);
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?artype=' + e.currentTarget.dataset.artype
    })
  },
 
  // book
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?matchBuyId=' + this.data.curMatchBuyId + '&detailImageUrlList=' + this.data.detailImageUrlList
    })
  }

})

function getData(index, matchBuyId, that) {
  var dataList = new Array(2);
  var param = {
    "matchBuyId": matchBuyId,
  };
  //获取搓团详情
  network.doPost('selectMatchBuyDetail', param, function (res) {  
    var imgArray = new Array();
    imgArray.push(res.masterImageUrl);
    var result = new Array(1); 
    if (index == 1) {
      res.subject = "";
      res.summary = "";
      res.payValue = "";
      res.deadLineTime = "";
    } else {
      //res.playTypeName = "";
    }
    result[0] = res; 
    if (res != null) {
       dataList[index] = result;
       that.setData({
        list: dataList,
        imgItem:imgArray,
        playTypeName: res.playTypeName,
        detailImageUrlList: res.detailImageUrlList
       })
    }
  });
}

