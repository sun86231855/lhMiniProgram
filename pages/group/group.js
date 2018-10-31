//group.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")

Page({
  // 页面初始数据
  data: {
    src: '../../images/add.png',
    isShow: false,
    message: "",
    inviteCode: ""
  },
  //点击删除按钮事件
  delItem: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          //获取列表中要删除项的下标
          var index = e.target.dataset.index;
          var message = that.data.message;
          //移除列表中下标为index的项
          message.splice(index, 1);
          //更新列表的状态
          that.setData({
            message: message
          });
        } else {
          initdata(that)
        }
      }
    })

  },

  onLoad: function(options) {
    var that = this;
    var param = {
      pageNum: "0"
    };
    //获取圈子列表
    network.doPost('getGroupListForMy', param, function(res) {
      if (res) {
        var groupList = res.groupList;
        if (groupList != null) {
          that.setData({
            message: groupList,
            isShow: (options.isShow == "true" ? true : false)
          });
        }
      }
    });
  },
  //获取用户输入的昵称
  inviteCodeInput: function(e) {
    this.setData({
      inviteCode: e.detail.value
    })
  },
  is_show: function(e) {

    var that = this;
    that.setData({
      isShow: (!that.data.isShow)
    })

  },

  is_complete: function(e) {
    console.log("邀请别人加入圈子");
    var that = this;
    var currInCode = that.data.inviteCode;
    if (currInCode == null || currInCode == '') {
      wx.showToast({
        title: '请输入邀请码',
      })
      return;
    }
    var param = {
      "inviteCode": that.data.inviteCode
    };

    //申请加入圈子
    network.doPost('applyGroup', param, function(res) {
      var message = res.message;
      if (message == 'error') {
        wx.showToast({
          title: '邀请码错误',
        })
        return;
      } else if (message == 'used') {
        wx.showToast({
          title: '邀请码已被使用',
        })
        return;
      }
      that.setData({
        isShow: (!that.data.isShow)
      })
    });
  },

  welcomeFriend: function(e) {

    var that = this;
    that.setData({
      isShow: (!that.data.isShow)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var userId = wx.getStorageSync("openId");
    console.log("currrUserId==========" + userId);
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "欢迎加入轮汇圈子", // 默认是小程序的名称(可以写slogan等)
      path: '/pages/home/index?userId=' + userId, // 默认是当前页面，必须是以‘/’开头的完整路径
      // imageUrl: 'https://ctfb-cos-1256183084.cos.ap-beijing.myqcloud.com/images/share_index.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function(res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log("shareAppMessage:ok")
        }
      },
      fail: function(res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    };

    /*
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
    var eData = options.target.dataset;
    console.log(eData.name); // shareBtn
    // 此处可以修改 shareObj 中的内容
    shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
    }
    */
    // 返回shareObj
    return shareObj;

  },
  // detialSQ
  detialGroup: function(e) {
    var id = e.currentTarget.dataset.index;
    console.log("hhhhhhhhhhhhhhhhhh==" + id);
    wx.navigateTo({
      url: '../group_details/group_details?id=' + id
    })

  },
  // 创建圈子
  creat_group() {
    //需要获取当前社群id
    wx.navigateTo({
      url: '../creat_group/creat_group'
    })
  }
})