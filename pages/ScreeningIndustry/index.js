// pages/ScreeningIndustry/index.js
const app = getApp()
var network = require("../../utils/network.js");

Page({

  data: {
    single: false,
    industryList: []
  },
  /*xuanz*/
  itemSelected: function(e) {
    var index = e.currentTarget.dataset.index;
    var industryList = this.data.industryList;
    var item = industryList[index];
    item.isSelected = !item.isSelected;
    if (this.data.single && item.isSelected) {
      for (var i = 0; i < industryList.length; i++) {
        if (i != index) {
          industryList[i].isSelected = false;
        }
      }
    }
    this.setData({
      industryList: industryList
    });
  },

  chooseCatalog: function(data) {
    var _this = this;
    var industryList = _this.data.industryList;
    var selected = [];

    if (industryList && industryList.length) {
      for (var i = 0; i < industryList.length; i++) {
        if (industryList[i].isSelected) {
          selected.push(industryList[i]);
        }
      }
    }
    var limit = _this.data.limit;
    if (limit && selected.length > limit) {
      wx.showModal({
        title: '提示',
        content: "最多选择" + limit + "个选项",
        showCancel: false
      });
      return;
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.selectIndustryResult(selected);
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var _this = this;
    var single = options.single;
    if (single) {
      _this.setData({
        "single": true
      });
    }
    var limit = options.limit;
    if (limit) {
      _this.setData({
        "limit": parseInt(limit)
      });
    }
    var type = options.type;
    var selectedIndustry = options.selectedIndustry;
    var param = {};
    param.type = type;
    network.doPost('selectBusinessIndustry', param, function(res) {
      var industryList = res.industryList;
      if (selectedIndustry) {
        var industrys = selectedIndustry.split(',');
        for (var i = 0; i < industrys.length; i++) {
          for (var j = 0; j < industryList.length; j++) {
            if (industryList[j].id == industrys[i]) {
              industryList[j].isSelected = true;
            }
          }
        }
      }
      if (industryList != null) {
        _this.setData({
          "industryList": industryList
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})