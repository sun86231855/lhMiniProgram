// pages/askedDetial/index.js
var app = getApp();
var fileData = require('../../utils/data.js');
var network = require("../../utils/network.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bigwidth:"",
    fontwidth:"",
    moreFont: true,
    btnflag:true,
    noteMaxLenjl: 100, // 最多放多少字

    scrHeight: wx.getSystemInfoSync().windowHeight,
    butHeight: 0,
    itemList: [{
        isSelected: false,
      },

    ],
    hiddenmodalput: true,
    commentContent: ''
  },

  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  /*xuanz*/
  itemSelected: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.itemList[index];
    item.isSelected = !item.isSelected;
    var orderType = item.isSelected ? 'asc' : 'desc';
    this.setData({
      'itemList': this.data.itemList,
      'orderType': orderType
    });
    this.getDetail();
  },

  /*xuanzend*/

  chooseCatalog: function(data) {
    var that = this;
    that.setData({ //把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })


  },

  getDetail: function() {
    var _this = this;
    var param = {};
    param.questionId = _this.data.questionId;
    param.orderType = _this.data.orderType;
    network.doPost('selectQuestionDetails', param, function(res) {
      if (res != null) {
        _this.setData(res);
        var bigwidth = _this.data.bigwidth;
        var fontwidth = _this.data.fontwidth;
        var contlength = res.summary.length;
        console.log(contlength);
        var query = wx.createSelectorQuery();
        query.select('#box1').boundingClientRect();
        query.exec(function (res) {
          console.log(res);
          bigwidth = res[0].width;
          console.log(bigwidth);
          var querya = wx.createSelectorQuery();

          querya.select('#text_font').boundingClientRect();
          querya.exec(function (res) {
            console.log(res);
            fontwidth = res[0].width / 4;
           // console.log(fontwidth);
            var sss = bigwidth / fontwidth * 2;
            console.log(sss);
            if (sss < contlength){
              //console.log(111);
                _this.setData({ //把选中值放入判断值
                btnflag: false
                });
    
              //console.log(1114);
            }else{
              _this.setData({ //把选中值放入判断值
                btnflag: true
              });
              //console.log(222);
            }
          })
        })
      }
    });
  },

  collect: function(e) {
    var _this = this;
    var questionId = e.currentTarget.dataset.id;
    var param = {};
    param.questionId = questionId;
    network.doPost('collectionOfProblems', param, function(res) {
      _this.getDetail();
    });
  },

  comment: function(e) {
    // var scr ="我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价"
    // console.log(scr.length)
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })

  },

  comment_cancel: function(e) {
    this.setData({
      hiddenmodalput: true,
      commentContent: ''
    })
  },

  comment_confirm: function(e) {
    var _this = this;
    var param = {};
    param.questionId = _this.data.questionId;
    param.summary = _this.data.commentContent;
    network.doPost('putReviewOfPractice', param, function(res) {
      _this.getDetail();
      _this.setData({
        hiddenmodalput: true
      });
    });
  },

  comment_textarea: function(e) {
    var ff = e.detail;
    this.setData({
      commentContent: ff.value
    });
  },

  praise: function(e) {
    var answerId = e.currentTarget.dataset.id;
    var _this = this;
    var param = {};
    param.answerId = answerId;
    network.doPost('putAnswerToTheQuestionOfPractice', param, function() {
      _this.getDetail();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var questionId = options.questionId;
    this.setData({
      'questionId': questionId,
      'orderType': 'asc'
    });
  },
  morefont: function() {
    var moreFont = this.data.moreFont;
    this.setData({
      moreFont: !moreFont
    })

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
    this.getDetail();
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