//creat_group.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js");
Page({
  // 页面初始数据
  data: {
    groupName:"",
    groupSummary:"",
    associationId:"",
    selectData:"",
    curNavId: 1,
    curIndex: 0, show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [''],//下拉列表的数据
    index: 0,//选择的下拉列表下标
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {
    var that = this;
    var param = {
    };
    //获取社群列表
    network.doPost('selectAssociationList', param, function (res) {
      if (res) {
        var gymInfo = res.associationList;
        var associationId = "";
        if (gymInfo != null) {
          var assListArry = new Array(gymInfo.length);
          for (var i = 0; i < gymInfo.length; i++) {
            if (i == 0) {
              associationId = gymInfo[i].associationId;
            }
            assListArry[i] = gymInfo[i].associationName;
          }
          that.setData({
            selectData: assListArry,
            associationId: associationId
          });
           
        }
      }
    })
  },
  createGroup: function (e) {
    var that = this;
    if (that.data.groupName == null || that.data.groupName == '') {
      wx.showToast({
        title: '请输入圈子名称',
      })
      return;
    }
    var param = { 
      "groupName": that.data.groupName,
      "groupSummary": that.data.groupSummary,
      "communityId": that.data.associationId
    };
    //保存圈子信息
    network.doPost('creatGroup', param, function (res) {
      wx.showToast({
        title: '创建成功',
      });
	  wx.navigateBack();
      //wx.navigateTo({
      //  url: '../group/group'
      //})
    });
  },
  groupNameinput:function(e) {
    this.setData({
      groupName: e.detail.value
    })
  },
  groupSummaryinput: function (e) {
    this.setData({
      groupSummary: e.detail.value
    })
  }
})
