// pages/details/details.js
var network = require("../../utils/network.js")
Page({
	/**
	* 页面的初始数据
	*/
	data: {},

	/**
	* 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		var _this = this;
		var matchBuyPayId = options.options.matchBuyPayId;
		network.doPost('getMatchBuyPayDetailForMy', {'matchBuyPayId':matchBuyPayId}, function (res) {
			if(res){
				_this.setData(res);
            }
		}); 
	},
})