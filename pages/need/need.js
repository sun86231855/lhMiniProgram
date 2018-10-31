//need.js
//获取应用实例
var network = require("../../utils/network.js")
Page({
	// 页面初始数据
	data: {
    industryList:[]
  },
  
	onLoad: function (options) {
		var _this = this;
		var selectedId = options.selectedId;
    var type1 = options.type;
    network.doPost('selectBusinessIndustry', { 'type': type1}, function (res) {
			if(res && res.industryList){
				_this.setData({
					'industryList':res.industryList
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
		var industryList = _this.data.industryList;
		var selected = null;
		for(var i=0;i<industryList.length; i++){
			if(industryList[i].isSelected){
				selected = industryList[i];
				break;
			}
		}
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2];
		prevPage.checkIndustryResult(selected);
		wx.navigateBack();
	},
  
	//选择
	select: function(selectedId){
		var _this = this;
		var industryList = _this.data.industryList;
		if(selectedId){
			for(var j=0; j<industryList.length; j++){
				if(industryList[j].id == selectedId){
					industryList[j].isSelected = true;
				}else{
					industryList[j].isSelected = false;
				}
			}
			_this.setData({
				"industryList": industryList
			});
		}
	}
	
})
