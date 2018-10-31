// pages/set_group/set_group.js
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var fileData = require('../../utils/data.js')
var network = require("../../utils/network.js");
Page({
  // 页面初始数据
  data: {
    curIndex: 0, show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    navSectionItems: fileData.getIndexNavSectionData(),
    groupName: "",
    groupMasterName: "",
    groupPersonNum: "",
    groupSummary: "",
    groupId: ""
  },
  onLoad: function (options) {
    console.log("======" + options.id); 
    var that = this;
    var param = { 
      "groupId": options.id,
      "pageNum":"1"
    };
    //获取圈子详情
    network.doPost('selectGroupDetail', param, function (res) {
      var groupName = res.groupName;
      var userList = res.userList;
      var groupMasterName = res.groupMasterName;
      var groupPersonNum = res.groupPersonNum;
      var groupSummary = res.groupSummary;
      if (userList != null) {
        that.setData({
          list: userList,
          groupName: groupName,
          groupId: options.id,
          groupMasterName: groupMasterName,
          groupPersonNum: groupPersonNum,
          groupSummary: groupSummary
        });
      }
    });
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    console.log(e.currentTarget.dataset.aid);
    wx.navigateTo({
      url: '../detail/detail?userId=' + e.currentTarget.dataset.aid
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    })
  },
  groupNameInput:function(e) {
    this.setData({
      groupName: e.detail.value
    })
  },
  groupSummaryInput:function(e) {
    this.setData({
      groupSummary: e.detail.value
    })
  },
  savegroup:function(e) {
    var that = this;
    var param = {
      "groupId": that.data.groupId,
      "groupName": that.data.groupName,
      "groupSummary": that.data.groupSummary
    };
    //保存圈子信息
    network.doPost('editGroupInfo', param, function (res) {
      wx.showToast({
        title: '保存成功',
      })
      wx.navigateTo({
        url: '../group/group'
      })
    });
  }
})
