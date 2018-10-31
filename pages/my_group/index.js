// pages/my_group/index.js
var network = require("../../utils/network.js"); 

function pageing(func){
    var thar = this;
    thar.pageNum = 1;
    thar.refresh = function(){
        thar.pageNum = 1;
        func(thar);
    };
    thar.next = function(){
        thar.pageNum ++;
        func(thar);
    }
}

Page({
	data: {
		scrollTop: 0,
    scrHeight: wx.getSystemInfoSync().windowHeight,
	},
    
    pg : null,
  
    // 上拉加载更多
	loadMore: function(e){
		console.log('上拉加载更多');
		this.pg.next();
	},
  doCuoTap: function (e) {
    wx.navigateTo({
      url: '../ctdetial/detail?id=' + e.currentTarget.dataset.aid
    })
  },


	//点击删除按钮事件  
	delItem: function (e) {
		var that = this;
		var id = e.target.dataset.id;
		wx.showModal({
			title: '提示',
			content: '是否删除？',
			success: function (res) {
				if (res.confirm) {
					var param = {};
					param.matchBuyApplyId = id;
					network.doPost('delMatchBuyApply', param, function (res) {
						that.pg.refresh();
					});
				}
			}
		});
	},
    
    scroll: function (event) {
		this.setData({
			scrollTop: event.detail.scrollTop
		});
	},
    doCuoTap: function (e) {
      wx.navigateTo({
        url: '../ctdetial/detail?id=' + e.currentTarget.dataset.aid
      })
    },
	/**
	* 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		var _this = this;
        this.pg = new pageing(function(pg){
			var param = {};
			var pageNum = pg.pageNum;
			param.pageNum = "" + pageNum;
			network.doPost('selectMatchBuyApplyList', param, function (res) {
				if(res){
					if(res.pages){
						var pages = res.pages;
						if(pageNum <= pages){
							if(res.matchBuyApplyList) {
								var matchBuyApplyList = _this.data.matchBuyApplyList;
								if(!matchBuyApplyList || pageNum == 1){
									matchBuyApplyList = [];
								}
								var list = res.matchBuyApplyList;
								for (var i = 0; i < list.length; i++) { 
									matchBuyApplyList.push(list[i]);
								}
								_this.setData({
									"matchBuyApplyList": matchBuyApplyList
								});
							}
						}else{
							pg.pageNum = pages;
						}
					}
				}
			});
        });
        
	},


	// 跳转至发起搓团页
	rub_group: function (e) {
		wx.navigateTo({
			url: '../rub_group/rub_group'
		});
	},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
		this.pg.refresh();
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
});
