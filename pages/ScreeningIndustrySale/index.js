// pages/ScreeningIndustry/index.js
const app = getApp()
var network = require("../../utils/network.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    industryList:[]
  },
  /*xuanz*/
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
	var industryList = this.data.industryList;
    var item = industryList[index];
    item.isSelected = !item.isSelected;
    this.setData({
      industryList: industryList
    });
  },
  
  chooseCatalog: function (data) {
    var _this = this;
	var industryList = _this.data.industryList;
	var selected = [];
	for(var i=0;i<industryList.length; i++){
	  if(industryList[i].isSelected){
		selected.push(industryList[i]);
	  }
	}
    wx.setStorage({
      key:'industrySelected',
	  data : selected,
	  success: function(res){
		wx.navigateBack();
	  },
	  fail: function(){
		  
	  }
	});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	console.log(options);
	var _this = this;
	var type = options.type;
	var selectedIndustry = options.selectedIndustry;
	var param = {};
	param.type=type;
	param.openId=openId;
	network.doPost('selectBusinessIndustry', param, function(res){
      var industryList = res.industryList;
	  if(selectedIndustry){
		var industrys = selectedIndustry.split(',');		
		for(var i=0;i<industrys.length;i++){
		  for(var j=0;j<industryList.length;j++){
			if(industryList[j].id == industrys[i]){
			  industryList[j].isSelected = true;
			}
		  }
		}
	  }
	  console.log(industryList);
	  if (industryList != null) {
        _this.setData({
          "industryList": industryList
        });
      }
	});
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
  
  }
})