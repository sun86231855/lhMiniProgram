// pages/CompanyDetails/index.js
//获取应用实例
const app = getApp() 
var openId = '77a5a5f364c84a6c864fa5aa1593a6d4';
var network = require("../../utils/network.js");

Page({
  // 页面初始数据
  data: {
    
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '../../images/com.jpg'
      }, {
        link: '/pages/logs/logs',
        url: '../../images/com.jpg'
      }, {
        link: '/pages/test/test',
        url: '../../images/com.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}  
  },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phn
    })
  },

  /** 
     * 预览图片
     */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.detailImageUrlList // 需要预览的图片http链接列表
    })
  },


  // 跳转至详情页
  navigateDetail: function (e) {
	var userId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?userId=' + userId
    })
  },
  onLoad: function (options) {
    console.log('onLoad test');
	var _this = this;
	var companyId = options.companyId;
    var headImageUrl = options.headImageUrl;
	var param = {};
	param.companyId=companyId;
  param.headImageUrl = headImageUrl;
	param.openId=openId;
	network.doPost('selectCompanyDetail', param, function(res){
	  if(res){
		_this.setData({
      "headImageUrl": res.headImageUrl,
      "name": res.name,
		  "industryName": res.industryName,
		  "summary": res.summary,
		  "userImageUrl": res.userImageUrl,
		  "userId": res.userId,
		  "userName": res.userName,
		  "tel": res.tel,
		  "detailImageUrlList": res.detailImageUrlList,
		  "position": res.position
        });
	  }
	});
  }  
})

