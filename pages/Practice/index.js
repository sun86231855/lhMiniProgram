// pages/Practice/index.js
//index.js
//获取应用实例
var app = getApp();
var fileData = require('../../utils/data.js');
var network = require("../../utils/network.js");

Page({
  // 页面初始数据
	data: {
    radioCheckVal: 0,
		colors: ['red', 'orange', 'yellow', 'green', 'purple'],
		// banner 初始化
		banner_url: fileData.getBannerData(),
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		// nav 初始化
		navxlTopItems: fileData.getxlNavData(),
		navxlSectionItems: fileData.getxlNavSectionData(),
		hideHeader: true,
		hideBottom: true,
		scrollTop: 0,
		pageNum : 1,
		curNavId: '1',
		curOrder: '1',
		curIndex: 0,
		show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
		searching: false,
		index: 0//选择的下拉列表下标
	},
	
	//页面加载
	onLoad: function () {
    var that = this;
		this.setData({
			curNavId: '1',
			curOrder: '1',
			questionList: [],
			pageNum : 1
		});
		

    wx.checkSession({
      success: function (res) {
        console.log("修炼 onload加载：处于登录态");

        // 业务代码

        that.search();

      },
      fail: function (res) {
        console.log("修炼 onload加载：重新发起登录请求");
        wx.login({
          success: function (res) {
            console.log("wx login success");
            if (res.code) {
              var param = {};
              param.code = res.code;
              //发起网络请求
              wx.request({
                url: config.serverUrl + '/login',
                data: param,
                method: "POST",
                timeout: 15000,
                success: function (result) {
                  console.log("index onLoad 获取到的新token:");
                  console.log(result);
                  var res = result.data.body;
                  if (res) {

                    console.log("wx login success:token" + res.token);
                    wx.setStorageSync('token', res.token);
                    wx.setStorageSync('openId', res.openId);
                    //重新发起请求

                    // 业务代码
                    that.search();

                    //              doPost(method, param, success, fail);
                  }
                },
                fail: function (res) {
                  console.log('服务器验证登录态失败！' + res.errMsg);
                }
              });
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
            }


            // end 获取token


          }
        })
      }
    });

	},
	
	radioCheckedChange: function (e) {
		this.setData({
			radioCheckVal: e.detail.value
		})
	},

	//标签切换
	switchTab: function (e) {
		var id = e.currentTarget.dataset.type;
		this.setData({
			curNavId: id,
			questionList: [],
			pageNum : 1
		});
		this.search();
	},

	//排序切换
	switchOrder: function (e) {
		var index = e.currentTarget.dataset.index;
		this.setData({
			curOrder: index,
			questionList: [],
			pageNum : 1
		});
		this.search();
	},
	
	scroll: function (event) {
		this.setData({
			scrollTop: event.detail.scrollTop
		});
	},
  
	// 上拉加载更多
	loadMore: function(e){
		console.log('上拉加载更多');
		var _this = this;
		_this.setData({
			hideBottom: false  
		});
		_this.search();
	},
	
	// 下拉刷新
	refresh: function(e){
		console.log('下拉刷新');
		var _this = this;
		_this.setData({
			pageNum: 1,
			questionList : [],
			hideHeader: false
		});
		_this.search();
	},

	//查询方法
	search: function (func) {
		var _this = this;
		if(_this.data.searching){
			return;
		}
		_this.setData({
			searching : true
		});
		var param = {};
		param.type = _this.data.curNavId;
		param.orderType = _this.data.curOrder;
		var pageNum = _this.data.pageNum?_this.data.pageNum:1;
		param.pageNum = "" + pageNum;
		network.doPost('selectQuestionList', param, function (res) {
			if(res){
				if(res.pages){
					var pages = res.pages;
					console.log(pages + '=' + pageNum);
					if(pageNum <= pages){
						_this.setData({
							"pageNum": pageNum + 1
						});
						if(res.questionList) {
							var questionList = _this.data.questionList;
							if(!questionList){
								questionList = [];
							}
							var list = res.questionList;
							for (var i = 0; i < list.length; i++) { 
								questionList.push(list[i]);
							}
							_this.setData({
								"questionList": questionList
							});
						}
					}
				}
			}
		},null,function(){
			if(func && typeof func == 'function'){
				func();
			}
			_this.setData({
				searching : false
			});
		});
	},


	//详情
	askedDetial: function (e) {
    console.log("=890-=-09890-");
		var questionId = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../askedDetial/index?questionId=' + questionId
		});
	},

  // 跳转至详情页
  navigateDetail: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?userId=' + e.currentTarget.dataset.id
    })
  },

	//我要提问
	AskQuestions: function (e) {
		wx.navigateTo({
			url: '../AskQuestions/index'
		})
	},
	
	//个人中心
	detail: function (e) {
		wx.navigateTo({
			url: '../detail/detail'
		})
	},
  
	// book
	bookTap: function (e) {
		wx.navigateTo({
			url: '../book/book?aid=' + e.currentTarget.dataset.aid
		})
	}

})

