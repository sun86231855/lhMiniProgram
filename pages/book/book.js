var app = getApp()
var mydata = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js");
Page({
  data: {
    addrArray: util.replacePhone(mydata.userData().addrs, true),
    addrIndex: 0,
    date: '2016-10-14',
    time: '12:00',
    bookToastHidden: true,
    matchBuyId: "",
    imgurl:"",
    remarks: ""
  },
  onLoad: function(options) {
    var detailImageUrlList =  options.detailImageUrlList;
    var currImgUrl = '';
    console.log("=======================" + detailImageUrlList);
    if (detailImageUrlList != null && detailImageUrlList.length > 0) {
      currImgUrl =  detailImageUrlList.split(',')[0];
    }
    this.setData({
      matchBuyId: options.matchBuyId,
      imgurl: currImgUrl
    })
  },
  // 地址选择
  bindAddrPickerChange: function(e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },
  bindToastTap: function() {
    wx.showLoading({
      title: '提交中...',
    })
    var that = this;
    var param = {
      "matchBuyId": this.data.matchBuyId,
      "appointmentTime": this.data.date + " " + this.data.time + ":00",
      "remarks": this.data.remarks
    };
    // 搓团
    network.doPost('prepay', param, function(bb) { 
      var aa = JSON.parse(bb);
      wx.hideLoading();
      if (aa) { 
        wx.requestPayment({
          timeStamp: aa.timeStamp,
          nonceStr: aa.nonce_str,
          package: aa.package,
          signType: aa.sign_type,
          paySign: aa.paySign,
          success: function(res) {
            console.log(res);
            wx.showToast({
              title: "支付成功",
              icon: 'success',
              duration: 1000,
              success: function() {
                wx.switchTab({
                  url: '../cuotuan/index'
                })
              }
            })
          },
          fail: function(res) {
            console.log(res);
            wx.showToast({
              title: "支付失败",
              icon: 'success',
              image: "../../images/smsb1.png",
              duration: 2000
            })
          }
        })
      } else {
        console.log("11不需要支付的订单下单成功");
       

        wx.showToast({
          title: '下单成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../cuotuan/index'
          })
        } , 1000)
        
      }
    });
  },
  hideToast: function() {
    this.setData({
      bookToastHidden: true
    })
  },
  // 日期选择
  bindDateChange: function(e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange: function(e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  remarksInput: function(e) {
    this.setData({
      remarks: e.detail.value
    })
  }
})