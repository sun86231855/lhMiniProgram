//sign.js
var app = getApp()
var myData = require('../../utils/data')
var network = require("../../utils/network.js")
var util = require('../../utils/util')

Page({
  // 页面初始数据
  data: {
    
    flagjl: 0,
    noteMaxLenjl: 100, // 最多放多少字
    infojl: "",
    noteNowLenjl: 0,//备注当前字数
    signName:"请输入"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var param = {};
    //获取昵称电话，头像等信息
    network.doPost('getUerInfoForMy', param, function (res) {
      var personalitySignature  = res.personalitySignature; 
      if (personalitySignature != null && personalitySignature.length > 0) {
          that.setData({
            signName: personalitySignature
          });
      }
      that.bindTextAreaChangejl();
    });
  },
  // 监听字数
  bindTextAreaChangejl: function (e) {
     //获取用户输入的昵称
    if (e){
      this.setData({
        signName: e.detail.value
      })
    }
    var that = this
    var value = "";
    if(e){
      value = e.detail.value
    }else{
      value = that.data.signName
    }
    var len = parseInt(value.length);
    if (len > that.data.noteMaxLenjl)
      return;
    that.setData({
      infojl: value,
      noteNowLenjl: len
    })
  },
  //获取用户输入的昵称
  // signInput: function (e) {
  //   this.setData({
  //     signName: e.detail.value
  //   })
  // },
  //修改个性签名
  doSave: function (e) { 
     var that = this;
     var signName = that.data.signName;
     if (signName == null || signName == '') {
       wx.showToast({
         title: '请输入签名!',
       })
       return;
     };
     if (signName.length  > 100) {
       wx.showToast({
         title: '最多输入200个字!',
       })
       return;
     };
   
  
     var specialKey = "/<>[]";//特殊字符列表
     var strArray = signName.toString().split("");
     for (var i = 0; i < strArray.length; i++) {
       var key = specialKey.indexOf(strArray[i]);
       if (key != -1) { 
         wx.showToast({
           title: '不允许特殊符' + specialKey[key].toString(),
           icon: 'succes'
         })
         return;
       }
     }


     var param = {
       "userSign": this.data.signName
     };
     wx.showLoading({
       title: '处理中...',
     })
     //修改昵称
     network.doPost('updateUserSign', param, function (res) {
       wx.hideLoading();
       wx.showToast({
         title: '更改成功!',
       })

       setTimeout(function () {
         wx.switchTab({
           url: '../user/user'
         })
       }, 1000)
     });
  }
})
