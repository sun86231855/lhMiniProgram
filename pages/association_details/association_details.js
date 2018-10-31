//association_details.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var fileData = require('../../utils/data.js')
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
    moreFont:true,
    moreFlag:true ,// 更多标记
    curIndex: 0, show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    communityId:"",
    communityName:"",
    communitySummary:"",
    communityPersonNum:"",
    scrHeight: wx.getSystemInfoSync().windowHeight,
    navSectionItems: fileData.getIndexNavSectionData(),
    pageIndex:6,
    pageSize:0,
    currInviteCode:""
  },
  onLoad: function (options) { 
    var that = this;
    var param = { 
      "communityId": options.id,
      "pageNum":"1"
    };
    //获取社群详情
    network.doPost('getCommunityDetail', param, function (res) {
      var userList = res.userList;
      var communityId = res.communityId;
      var communityName = res.communityName;
      var communitySummary = res.communitySummary;
      var communityPersonNum = res.communityPersonNum;
      if (userList != null) {
        that.setData({
          list: userList,
          communityId: communityId,
          communityName: communityName,
          communitySummary: communitySummary,
          communityPersonNum: communityPersonNum,
          pageSize: userList.length
        });
      }
    });
    var paramPage ={
      "associationId": options.id
    };
    network.doPost('makeInviteCodeForCommunity', paramPage, function (res) {
      if (res) {
        var inviteCode = res.inviteCode;
        console.log("==========================111==" + inviteCode);
        that.setData({
          currInviteCode: inviteCode
        });
      }
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎加入社群',
      path: '/pages/index/index?share=1&paramInviteCode=' + this.data.currInviteCode,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    console.log(e.currentTarget.dataset.aid);
    wx.navigateTo({
      url: '../detail/detail?userId=' + e.currentTarget.dataset.aid
    })
  },
  invFrnd:function(e){

  },
  //退出社群
  exitGroup: function (e) {
    console.log('退出社群');
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            "communityId": that.data.communityId
          };
          //退出社群
          network.doPost('exitCommunity', param, function (res) {
            wx.showToast({
              title: '退出成功',
            })
            wx.navigateTo({
              url: '../association/association'
            })
          });
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 加载更多
  loadMore: function (e) {
    util.startLoading();
    var pageSize = this.data.pageSize;
    var pageIndex = this.data.pageIndex;
    var moreFlag = this.data.moreFlag;
    pageIndex += pageSize;
    this.setData({
      pageIndex: pageIndex,
      moreFlag:false
    })
    util.stopLoading();
  },

  // 加载收回
  loadLess: function (e) {
    util.startLoading();
    var pageIndex = 6;
    var moreFlag = this.data.moreFlag;
    this.setData({
      pageIndex: pageIndex,
      moreFlag: true
    })
    util.stopLoading();
  },

  morefont: function () {
    var moreFont = this.data.moreFont;
    this.setData({    
      moreFont: !moreFont
    })

  },

})
