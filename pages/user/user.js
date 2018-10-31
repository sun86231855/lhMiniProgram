
//index.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var network = require("../../utils/network.js")
var util = require('../../utils/util')
var config = require("../../utils/config.js")
var COS = require("../../utils/cos-wx-sdk-v5.js")
var cos = new COS({
    getAuthorization: function (params, callback) {//获取签名 必填参数
        // 方法二（适用于前端调试）
        var authorization = COS.getAuthorization({
            SecretId: config.SecretId,
            SecretKey: config.SecretKey,
            Method: params.Method,
            Key: params.Key
        });
        callback(authorization);
    }
});

Page({
  // 页面初始数据
  data: {
    flagjl: 0,
    noteMaxLenjl: 15, // 最多放多少字
    infojl: "",
    noteNowLenjl: 0,//备注当前字数
    userData:'',
    nickName:'',
    phone:'',
    personalitySignature:"",
    userId:'',
    addrDate:util.replacePhone(myData.userData().addrs,true),
    flag: true,
    flagPhone: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  onShow: function (options) {
    var that = this;
    var param = {
    };
    //获取昵称电话，头像等信息
    network.doPost('selectMine', param, function (res) {
      var userData = {};
      userData.username = res.userName;
      userData.phone = res.phone;
      //userData.avatar = '../../images/avatar.png';
      userData.avatar = res.userHeadImageUrl;
      console.log(res);
      that.setData({
        userData: userData,
        personalitySignature: res.personalitySignature,
        userId: res.userId
      });
    });
  },
  // 监听字数
  bindTextAreaChangejl: function (e) {
    //获取用户输入的昵称
    this.setData({
      nickName: e.detail.value
    })
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLenjl)
      return;
    that.setData({
      infojl: value,
      noteNowLenjl: len
    })
  },


  // //获取用户输入的昵称
  // nickInput: function (e) {
  //   this.setData({
  //     nickName: e.detail.value
  //   })
  // },

  //获取用户输入的手机号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 地址编辑
  editAddr : function(e){
    console.log(e)
    wx.navigateTo({
      url:'../edit_addr/edit_addr?addrid='+e.currentTarget.dataset.addrid
    })
  },
  // 跳转至客服页
  call_center: function (e) {
    wx.navigateTo({
      url: '../call_center/call_center'
    })
  },
  // 跳转至意见反馈页
  feedback: function (e) {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  // 跳转至我的社群页
  association: function (e) {
    wx.navigateTo({
      url: '../association/association'
    })
  },
  // 跳转至发起搓团页
  rub_group: function (e) {
    wx.navigateTo({
      url: '../rub_group/rub_group'
    })
  },
  // 跳转至我的圈子页
  group: function (e) {
    wx.navigateTo({
      url: '../group/group'
    })
  },
  // 跳转至我的圈子页
  mygroup: function (e) {
    wx.navigateTo({
      url: '../my_group/index'
    })
  },
 
  // 跳转至我的修炼页
  my_practice(e) {
    wx.navigateTo({
      url: '../my_practice/my_practice'
    })
  },
  // 跳转至我的搓团页
  my_run_group(e) {
    wx.navigateTo({
      url: '../my_run_group/my_run_group'
    })
  },
  // 跳转至个人信息页
  personal_details(e) {
    wx.navigateTo({
      url: '../personal_details/personal_details'
    })
  },
  // 跳转至个性签名页
  sign(e) {
    wx.navigateTo({
      url: '../sign/sign'
    })
  },
  // 跳转至我的合作页
  reward: function(e) {
    wx.navigateTo({
      url: '../reward/reward'
    })
  },
  // 跳转至公司展示页
  company_show(e) {
    wx.navigateTo({
      url: '../company_show/company_show'
    })
  },
  // 跳转至学院认证页
  school(e) {
    wx.navigateTo({
      url: '../school/school'
    })
  },
  //折扣管理
  RebateManagement(e) {
    wx.navigateTo({
      url: '../RebateManagement/index'
    })
  },
  //我的折扣
  MyRebateManagement(e) {
    wx.navigateTo({
      url: '../MyRebateManagement/index'
    })
  },
  //找合作收藏
  find_collect(e) {
    wx.navigateTo({
      url: '../find_collect/index'
    })
  },

  
  
  // 跳转至个人中心
  detail(e) {
    wx.navigateTo({ 
      url: '../detail/detail?userId=' + this.data.userId
    })
  },
    // 手机号
  LogBut: function (e) {
    wx.navigateTo({
      url: '../LogBut/index'
    })
  },
  set_name(e) {
    this.setData({ flag: false })
  },
  hide(e) {
    this.setData({ flag: true })
  },

  set_phone(e) {
    this.setData({ flagPhone: false })
  },
  hidePhone(e) {
    this.setData({ flagPhone: true })
  },

  updateNick(e) {
    var that = this;
    var currnickName = that.data.nickName;
    if (currnickName == null || currnickName == '') {
       wx.showToast({
         title: '请输入昵称!',
       })
       return;
    }
    var param = {
      "openId": "77a5a5f364c84a6c864fa5aa1593a6d4",
      "nickName": this.data.nickName
    };
    //修改昵称
    network.doPost('updateNickName', param, function (res) {
      var retUserData = that.data.userData;
      retUserData.username = that.data.nickName;
        that.setData({
          userData: retUserData,
          flag: true
       });
    });
  },

  // 绑定手机号
  updatePhone(e) {
    var that = this;
    var currPhone = that.data.phone;
    if (currPhone == null || currPhone == '') {
      wx.showToast({
        title: '请输入手机号!',
      })
      return;
    } 
    //手机号正则  
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(currPhone)) {
      wx.showToast({
        title: '请输入有效的手机号码！',
      })
      return;
    } 

    console.log("phone");
    console.log(this.data.phone);
    var param = { 
      "tel": this.data.phone
    };

    network.doPost('bindTel', param, function (res) {
      console.log("bindTel");
      console.log(res);

/*
      var retUserData = that.data.userData;
      retUserData.username = that.data.nickName;
      that.setData({
        userData: retUserData,
        flag: true
      });
      */

    });
  },

	picUpload() {
		var that = this;
    console.log("ssssssssssssssssss");
    var baseUrl = "https://123-1256884206.cos.ap-chengdu.myqcloud.com/";
//    var baseUrl="";
    console.log(baseUrl);
		var imgUrl="";
		// 选择文件
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				if(!(res && res.tempFilePaths)){
					return;
				}
				var filePath = res.tempFilePaths[0];
				var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
				var imgUrl = baseUrl + Key;//图片的获取路径
        console.log("imgUrl:");
        console.log(imgUrl);

				cos.postObject({
					Bucket: config.Bucket,
					Region: config.Region,
					Key: Key,
					FilePath: filePath,
					onProgress: function (info) {
						
					}},
					function (err, data) {
						if(!err){ //上传成功
						    var param = {};
							param.headUrl = imgUrl;
						    network.doPost('updateHeadUrl', param, function (res) {
								that.setData({
									'userData.avatar': imgUrl
								});
							});
						}
					}
				);
			}
		});
	},
	
	success(e) {
	}
})
