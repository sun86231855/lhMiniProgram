//call_center.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")
Page({
	// 页面初始数据
	data: {
		type1: [],//下拉列表的数据
		type2: [],//下拉列表的数据
		index1: 0, //选择的下拉列表下标
		index2: 0, //选择的下拉列表下标
		show1: false,//控制下拉列表的显示隐藏，false隐藏、true显示
		show2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
	},
	
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var _this = this;
		var param = {};
		network.doPost('getMatchBuyApplyType', param, function (res) {
			if(res){
				_this.setData({
					type1 : res.type1,
					index1: 0,
					type2 : res.type2,
					index2: 0
				});
            }
		}); 
	},
	
	submit(){
		var _this = this;
		var param = {};
		param.subject = _this.data.subject;
		param.summary = _this.data.summary;
    if (_this.data.type1.length>0){
      param.matchBuyType = _this.data.type1[_this.data.index1].id;
    } if (_this.data.type2.length>0){
      param.validState = _this.data.type2[_this.data.index2].id;
    }
		
		
		network.doPost('addMatchBuyApply', param, function(){
			wx.showModal({
			  title: '通知',
			  content: '操作成功！',
			  showCancel: false, //不显示取消按钮
			  confirmText: '确定',
			  success : function(){
				  wx.navigateBack();
			  }
			});
		}); 
	},
	
	// 点击下拉显示框
	selectTap1() {
		this.setData({
			show1: !this.data.show1
		});
	},
	
	selectTap2() {
		this.setData({
			show2: !this.data.show2
		});
	},
	// 点击下拉列表
	optionTap1(e) {
		console.log(e)
		let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
		console.log(Index)
		this.setData({
			index1: Index,
			show1: !this.data.show1
		});
	},
	
	optionTap2(e) {
		console.log(e)
		let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
		console.log(Index)
		this.setData({
			index2: Index,
			show2: !this.data.show2
		});
	},
  
	inputSubject(e){
		var subject = e.detail.value;
		this.setData({
			'subject':subject
		}); 
	},
  
	inputSummary(e){
		var summary = e.detail.value;
		this.setData({
			'summary':summary
		}); 
	}
})
