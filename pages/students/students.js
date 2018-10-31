//students.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")
Page({
  // 页面初始数据
  data: {
    //selectData: ['明德社群', '明德社群2', '明德社群3', '明德社群4', '明德社群5', '明德社群6'],//下拉列表的数据
    //index: 0, //选择的下拉列表下标
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    items: [{
      name: 'TAI',
      value: '是否为TAI',
      checked: 'true'
    }, ],
    ifTai: "1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var communityId = options.communityId;
    _this.setData({
      communityId: communityId
    });
    var param = {};
    param.associationId = communityId;
    network.doPost('selectClassList', param, function(res) {
      if (res && res.classList) {
        _this.setData({
          classList: res.classList,
          index: 0
        });
      }
    });
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Index)
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  checkboxChange: function(e) {
    var cb = e.detail.value;
    this.setData({
      'ifTai': (cb.length == 0) ? "0" : "1"
    });
  },

  inputRemark: function(e) {
    var remark = e.detail.value;
    this.setData({
      'remark': remark
    });
  },

  submit(e) {
    var d = this.data;
    var param = {};
    param.type = '1';
    param.ifTai = d.ifTai;
    param.communityId = d.communityId;
    var classList = d.classList;
    param.classId = classList[d.index].classId;
    param.remark = d.remark;
    param.name = "";
    network.doPost('insertAssociationAuthentication', param, function(res) {
      wx.showModal({
        title: '通知',
        content: '您的认证已经提交到后台进行审核火灾1-3个工作日内完成审核  谢谢',
        showCancel: false, //不显示取消按钮
        confirmText: '确定',
        success: function() {
          wx.navigateBack();
        }
      });
    });


  }
})