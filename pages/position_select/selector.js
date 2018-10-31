// pages/position_select/selector.js
var network = require("../../utils/network.js")
Page({

	/**
	 * 页面的初始数据
	*/
	data: {
    postionList: []
  },

	/**
	 * 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		var _this = this;
		var selectedId = options.selectedId;
		network.doPost('getProfessionForMyCommpany', {}, function (res) {
			if(res && res.professionList){
				console.log(res.professionList);
				_this.setData({
					'postionList':res.professionList
				});
				_this.select(selectedId);
			}
		});
	},

	/*选择*/
	itemSelected: function (e) {
		var selectedId = e.currentTarget.dataset.id;
		this.select(selectedId);
	},
  
	//确定
	submit: function () {
		var _this = this;
		var postionList = _this.data.postionList;
		var selected = null;
		for(var i=0;i<postionList.length; i++){
			if(postionList[i].isSelected){
				selected = postionList[i];
				break;
			}
		}
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2];
		prevPage.checkPostionResult(selected);
		wx.navigateBack();
	},
	
	//选择
	select: function(selectedId){
		var _this = this;
		var postionList = _this.data.postionList;
		if(selectedId){
			for(var j=0; j<postionList.length; j++){
				if(postionList[j].id == selectedId){
					postionList[j].isSelected = true;
				}else{
					postionList[j].isSelected = false;
				}
			}
			_this.setData({
				"postionList": postionList
			});
		}
	}
})