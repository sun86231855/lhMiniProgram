//获取应用实例
const app = getApp();
var network = require("../../utils/network.js");
var userId = "";
Page( {
	data: {
		tempFilePaths: '../../images/user_pic.png' ,
	},
	onLoad: function (options) {
		var _this = this;
		var userId = options.userId;
		_this.setData({
			'userId': userId
		});
		var param = {};
		param.userId=userId; 
		//个人详情
		network.doPost('selectUserDetails', param, function(res){
			if(res){
				_this.setData({
					'personal' : res
				});
			}
		});   
		//公司详情
		network.doPost('selectCompanyWithUserInfo', param, function(res){
			if(res){
				_this.setData({
					'company': res
				});
			}
		});   
	},
  // 跳转至公司详情
  CompanyDetails: function (e) {
    var _this = this;
    var companyId = e.currentTarget.dataset.id;
    if (!companyId){
      return false;
    }
    wx.navigateTo({
      url: '../CompanyDetails/index?companyId=' + companyId
    });
  },

  
  chooseimage: function () {  
    var _this = this;  
    wx.chooseImage({  
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({  
          tempFilePaths:res.tempFilePaths  
        })  
      }  
    })  
  }  ,
  getLocation:function(){
    wx.navigateTo({
      url:'../location/details'
    })
  },
	//添加好友
	InviteFriends: function () {
		var userId = this.data.userId;
		wx.navigateTo({
			url: '../InviteFriends/details?userId=' + userId
		})
	},
	//详情
	detail: function (e) {
    var userId = e.currentTarget.dataset.userid;
    console.log(e)
		wx.navigateTo({
      url: '../detail/detail?userId=' + userId
		})
	},
  
	phoneCall: function (e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.phn
		})
	},

	previewImage: function(e){
		//获取当前图片的下表
		var index = parseInt(e.currentTarget.dataset.index);
		//数据源
		var pictures = this.data.company.imageUrlList;
		wx.previewImage({
			//当前显示下表
			current: pictures[index],
			//数据源
			urls: pictures
		});
	},
  
	bookTap:function(){
		wx.navigateTo({
		    url:'../book/book'
		})
	}
})