// pages/AskQuestions/index.js
var app = getApp();
var fileData = require('../../utils/data.js');
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexd:0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['信息化咨询', '商业模式设计', '企业管理咨询', '同学问答'], //下拉列表的数据
    
    index: "", //选择的下拉列表下标
    text: '请选择分类',
    subject: "",
    summary: "",
    flag1:false,
    flag2:true,
    indexd:"",
  },

  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({  
      flag1: true,
      flag2: false,
      indexd: e.detail.value,
      
    });
  }, 

  // 点击下拉显示框
  selectTap(e) {
    console.log(e);
    this.setData({
      show: !this.data.show,
      indexd: e.detail.value
    });
  },
  // 点击下拉列表
  optionTap(e) {
    var selectData = this.data.selectData;
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      text: selectData[Index],
    });
  },

  inputSubject: function(event) {
    var value = event.detail.value;
    this.setData({
      subject: value
    });
  },

  inputSummer: function(event) {
    var value = event.detail.value;
    this.setData({
      summary: value
    });
  },

  submit: function() {
    var subject = this.data.subject;
    if (!subject) {
      wx.showToast({
        title: '请填写标题',
      });
      return false;
    }
    var summary = this.data.summary;
    if (!summary) {
      wx.showToast({
        title: '请填写内容',
      });
      return false;
    }
    var index = this.data.indexd;
    console.log(index);
    if (index === "") {
      wx.showToast({
        title: '请选择分类',
      });
      return false;
    }
    var _this = this;
    console.log(_this.data.indexd);
    var param = {};
    var type = parseInt(_this.data.indexd) + 1;
    param.type = '' + type;
    param.subject = _this.data.subject;
    param.summary = _this.data.summary;
    // console.log(param);
    // return false;
    network.doPost('putTheProblemOfPractice', param, function(res) {
      wx.navigateBack();
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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