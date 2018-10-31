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
    curIndex: 0, show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    navSectionItems: fileData.getIndexNavSectionData(),
    groupName:"",
    groupMasterName :"",
    groupPersonNum:"",
    groupSummary:"",
    groupId:"",
    scrHeight: wx.getSystemInfoSync().windowHeight,
    inviteCode:"",
    pageIndex: 6
  },
  onLoad: function (options) { 
    var that = this;
    var param = {
      "groupId": options.id,
      "pageNum": "1"
    };
    //获取圈子详情
    network.doPost('selectGroupDetail', param, function (res) {
      var groupName = res.groupName;
      var userList = res.userList;
      var groupMasterName = res.groupMasterName;
      var groupPersonNum = res.groupPersonNum;
      var groupSummary = res.groupSummary;
	  var isGroupMaster = res.isGroupMaster=="1";
	  console.log(res.isGroupMaster=="1");
      if (userList != null) {
           that.setData({
             list: userList, 
             groupName: groupName,
             groupId: options.id,
             groupMasterName: groupMasterName,
             groupPersonNum: groupPersonNum,
             groupSummary: groupSummary,
			 isGroupMaster: isGroupMaster
          });
      }
    });

    getInviteCode(this,options.id);
  },
  onShareAppMessage: function () {
    console.log(11111);
    var that = this;
    return {
      title: '快来加入我的圈子吧',
      desc: '快来加入我的圈子吧',
      path: '/pages/index/index?paramInviteCode=' + that.data.inviteCode // 路径，传递参数到指定页面。
    }
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    console.log(e.currentTarget.dataset.aid);
    wx.navigateTo({
      url: '../detail/detail?userId=' + e.currentTarget.dataset.aid
    })
  },
  
  //删除圈子成员
  removeGroupUser: function(e) {
    console.log(e.currentTarget.dataset.aid);
    if (this.data.isGroupMaster != "1") {
      wx.showToast({
        title: '您无权删除',
      })
      return;
    }
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            "groupId": that.data.groupId,
            "userId": e.currentTarget.dataset.aid
          };
          //删除圈子
          network.doPost('delGroupUser', param, function (res) {
            
            wx.showToast({
              title: '删除成功',
            })
            var poption = new Object();
            poption.id =  that.data.groupId;
            that.onLoad(poption);
            //wx.navigateTo({
            //  url: '../group_details/group_details?id=' + that.data.groupId
            //})
          });
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //退出圈子
  exitGroup: function(e) {
    console.log('退出圈子');
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {
            "groupId": that.data.groupId
          };
          //退出圈子
          network.doPost('exitGroup', param, function (res) {
            wx.showToast({
              title: '退出成功',
            })
            wx.navigateTo({
              url: '../group/group'
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
    var pageIndex = this.data.pageIndex;
    pageIndex += 6;
    this.setData({
      pageIndex: pageIndex
    })
    util.stopLoading();
  },

  // 跳转至修改页
  set_group(e) {
    wx.navigateTo({
      url: '../set_group/set_group?id=' + this.data.groupId
    })
  }
})
//获得邀请码
function getInviteCode(that, groupId) {
  console.log('获得邀请码===圈子ID' + groupId);
  var param = {
    "groupId": groupId
  };
  //获得邀请码
  network.doPost('makeInviteCodeForGroup', param, function (res) {
    var inviteCode = res.inviteCode;
    console.log("inviteCode=====" + inviteCode);
    that.setData({
      inviteCode: inviteCode
    });
  });
}
