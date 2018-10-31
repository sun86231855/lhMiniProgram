// pages/my_practice/my_practice.js
var network = require("../../utils/network.js")

Page({

	/**
	* 页面的初始数据
	*/
	data: {
		scrHeight: wx.getSystemInfoSync().windowHeight,
		sc : true,
		tab: ['我的提问', '我的回答', '我的收藏'],
		currentTab: 0
	},

	/**
	* 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		this.query();
	},

	/**
	* 生命周期函数--监听页面初次渲染完成
	*/
	onReady: function () {

	},

	/**
	* 生命周期函数--监听页面显示
	*/
	onShow: function () {

	},

	/**
	* 生命周期函数--监听页面隐藏
	*/
	onHide: function () {

	},

	/**
	* 生命周期函数--监听页面卸载
	*/
	onUnload: function () {

	},

	/**
	* 页面相关事件处理函数--监听用户下拉动作
	*/
	onPullDownRefresh: function () {

	},

	/**
	* 页面上拉触底事件的处理函数
	*/
	onReachBottom: function () {

	},

	/**
	* 用户点击右上角分享
	*/
	onShareAppMessage: function () {

	},
  
	query1: function(){
		var _this = this;
		var param = {};
		param.type = '1';
		var pageNum = _this.data.pageNum1?_this.data.pageNum1:1;
		param.pageNum = "" + pageNum;
		//修改昵称
		network.doPost('getPositionList', param, function (res){
			if(res){
				if(res.pages){
					var pages = res.pages;
					console.log(pages + '=' + pageNum);
					if(pageNum <= pages){
						_this.setData({
							"pageNum1": pageNum + 1
						});
						if(res.questionList) {
							var questionList = _this.data.questionList1;
							if(!questionList){
								questionList = [];
							}
							var list = res.questionList;
							for (var i = 0; i < list.length; i++) { 
								questionList.push(list[i]);
							}
							_this.setData({
								"questionList1": questionList
							});
						}
					}
				}
			}
		});
	},
  
	query2: function(){
		var _this = this;
		var param = {};
		param.type = '2';
		var pageNum = _this.data.pageNum2?_this.data.pageNum2:1;
		param.pageNum = "" + pageNum;
		//修改昵称
		network.doPost('getPositionList', param, function (res) {
			if(res){
				if(res.pages){
					var pages = res.pages;
					console.log(pages + '=' + pageNum);
					if(pageNum <= pages){
						_this.setData({
							"pageNum2": pageNum + 1
						});
						if(res.questionList) {
							var questionList = _this.data.questionList2;
							if(!questionList){
								questionList = [];
							}
							var list = res.questionList;
							for (var i = 0; i < list.length; i++) { 
								questionList.push(list[i]);
							}
							_this.setData({
								"questionList2": questionList
							});
						}
					}
				}
			}
		});
	},
	
	query3: function(){
		var _this = this;
		var param = {};
		param.type = '3';
		var pageNum = _this.data.pageNum3?_this.data.pageNum3:1;
		param.pageNum = "" + pageNum;
		//修改昵称
		network.doPost('getPositionList', param, function (res) {
			if(res){
				if(res.pages){
					var pages = res.pages;
					console.log(pages + '=' + pageNum);
					if(pageNum <= pages){
						_this.setData({
							"pageNum3": pageNum + 1
						});
						if(res.questionList) {
							var questionList = _this.data.questionList3;
							if(!questionList){
								questionList = [];
							}
							var list = res.questionList;
							for (var i = 0; i < list.length; i++) { 
								questionList.push(list[i]);
							}
							_this.setData({
								"questionList3": questionList
							});
						}
					}
				}
			}
		});
	},
	
	scroll1: function (event) {
		this.setData({
			scrollTop1: event.detail.scrollTop
		});
	},
    
	scroll2: function (event) {
		this.setData({
			scrollTop2: event.detail.scrollTop
		});
	},
	
	scroll3: function (event) {
		this.setData({
			scrollTop3: event.detail.scrollTop
		});
	},
	
	// 上拉加载更多
	loadMore1: function(e){
		console.log('上拉加载更多');
		var _this = this;
		_this.query1();
	},

	loadMore2: function(e){
		console.log('上拉加载更多');
		var _this = this;
		_this.query2();
	},
	
	loadMore3: function(e){
		console.log('上拉加载更多');
		var _this = this;
		_this.query3();
	},
	
	// 下拉刷新
	refresh1: function(e){
		console.log('下拉刷新');
		var _this = this;
		_this.setData({
			pageNum1: 1,
			questionList1 : []
		});
		_this.query1();
	},
	
	refresh2: function(e){
		console.log('下拉刷新');
		var _this = this;
		_this.setData({
			pageNum2: 1,
			questionList2 : []
		});
		_this.query2();
	},
	
	refresh3: function(e){
		console.log('下拉刷新');
		var _this = this;
		_this.setData({
			pageNum3: 1,
			questionList3 : []
		});
		_this.query3();
	},
	
	delItem1: function (e) {
		var that = this
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					//获取列表中要删除项的下标
					var id = e.target.dataset.id;
					var param = {};
					param.ids = id;
					param.type = '1';
					network.doPost('delMyPositionList', param, function (res) {
						that.refresh1();
					});
				}
			}
		})
	},
	
	delItem2: function (e) {
		var that = this
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					//获取列表中要删除项的下标
					var id = e.target.dataset.id;
					var param = {};
					param.ids = id;
					param.type = '2';
					network.doPost('delMyPositionList', param, function (res) {
						that.refresh2();
					});
				}
			}
		})
	},
	
	delItem3: function (e) {
		var that = this
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					//获取列表中要删除项的下标
					var id = e.target.dataset.id;
					var param = {};
					param.ids = id;
					param.type = '3';
					network.doPost('delMyPositionList', param, function (res) {
						that.refresh3();
					});
				}
			}
		})
	},
  
	//滑动切换
	swiperTab: function (e) {
		var that = this;
		that.setData({
			currentTab: e.detail.current
		});
		that.query();
	},
  
	//点击切换
	clickTab: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			});
		}
	},
	
	query: function (){
		var currentTab = this.data.currentTab;
		if(currentTab==0){
			this.refresh1();
		}else if(currentTab==1){
			this.refresh2();
		}else  if(currentTab==2){
			this.refresh3();
		}
	},
	
	//详情
	askedDetial: function (e) {
		var questionId = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../askedDetial/index?questionId=' + questionId
		});
	}
	
});