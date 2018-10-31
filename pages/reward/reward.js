//reward.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data');
var util = require('../../utils/util');
var network = require("../../utils/network.js");

var lock = (function(){
	var flag = false;
	return {
		get : function(){
			if(flag){
				return false;
			}else{
				flag = true;
				return flag;
			}
		},
		release : function(){
			flag = false;
		}
	};
})();

Page({
  // 页面初始数据
	data: {
    botv: false,
    butHeight: 32,
    radioCheckVal: 0,
		pageNum : 1,
		scrollTop: 0,
    scrHeight: wx.getSystemInfoSync().windowHeight,
    pageType:""
	},
  
  radioCheckedChange: function (e) {
    console.log(e)
    var type = e.detail.value;
    this.setData({
      radioCheckVal: e.detail.value
    })
    if (type == 1){
      console.log(111)
      this.setData({
        botv: true,
        butHeight: 0,
        pageType: type
      })
    }else{
      console.log(222)
      this.setData({
        botv: false,
        butHeight: 20,
        pageType: type
      })
    }
    this.refresh();
  },


	onLoad: function (options) {

	},

	onShow: function(options){
		this.refresh();
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
		_this.query();
	},
	
	// 下拉刷新
	refresh: function(e){
		console.log('下拉刷新');
		var _this = this;
		_this.setData({
			pageNum: 1,
			cooperateInfoList : []
		});
		_this.query();
	},
	
	query : function(){
		var _this = this;
		if(!lock.get()){
			return;
		}
		var param = {};
		var pageNum = _this.data.pageNum?_this.data.pageNum:1;
		param.pageNum = "" + pageNum;
		
    var type = this.data.pageType;
    console.log("============777======" + type);
    if (type == 1) {
      //获取我的合作收藏
      network.doPost('getMarkUpCooperateForMy', param, function (res) {
        if (res) {
          if (res.pages) {
            var pages = res.pages;
            console.log(pages + '=' + pageNum);
            if (pageNum <= pages) {
              _this.setData({
                "pageNum": pageNum + 1
              });
              if (res.bizList) {
                var cooperateInfoList = _this.data.cooperateInfoList;
                if (!cooperateInfoList) {
                  cooperateInfoList = [];
                }
                var list = res.bizList;
                for (var i = 0; i < list.length; i++) {
                  cooperateInfoList.push(list[i]);
                }
                _this.setData({
                  "cooperateInfoList": cooperateInfoList
                });
              }
            }
          }
        }
      }, null, function () {
        lock.release();
      });
    } else {
      //获取我的合作
      network.doPost('getCooperateListForMy', param, function (res) {
        if (res) {
          if (res.pages) {
            var pages = res.pages;
            console.log(pages + '=' + pageNum);
            if (pageNum <= pages) {
              _this.setData({
                "pageNum": pageNum + 1
              });
              if (res.cooperateInfoList) {
                var cooperateInfoList = _this.data.cooperateInfoList;
                if (!cooperateInfoList) {
                  cooperateInfoList = [];
                }
                var list = res.cooperateInfoList;
                for (var i = 0; i < list.length; i++) {
                  cooperateInfoList.push(list[i]);
                }
                _this.setData({
                  "cooperateInfoList": cooperateInfoList
                });
              }
            }
          }
        }
      }, null, function () {
        lock.release();
      }); 

    }

	},
  
  
	// 跳转至添加合作页
	add_reward: function(e) {
		wx.navigateTo({
			url: '../reward_set/reward_set'
		})
	},
  
	start:function(e) {
		var _this = this;
		var cooperateId = e.currentTarget.dataset.cooperateid;
		var param = {};
		param.cooperateId = cooperateId;
		param.state = '2';
		network.doPost('changeCooperateStateForMy', param, function (res) {
			_this.refresh();
		});
	},
  
	end:function(e) {
		var _this = this;
		var cooperateId = e.currentTarget.dataset.cooperateid;
		var param = {};
		param.cooperateId = cooperateId;
		param.state = '1';
		network.doPost('changeCooperateStateForMy', param, function (res) {
			_this.refresh();
		});
	},
  
	del:function(e){
		var _this = this;
		var cooperateId = e.currentTarget.dataset.cooperateid;
		var param = {};
		param.cooperateId = cooperateId;
		network.doPost('deleteCooperateForMy', param, function (res) {
			_this.refresh();
		});
	},
  
	// 跳转至修改页
	set: function(e) {
		var cooperateId = e.currentTarget.dataset.cooperateid;
		wx.navigateTo({
			url: '../reward_set/reward_set?cooperateId='+cooperateId
		});
	},
  
	details: function(e) {
		var cooperateId = e.currentTarget.dataset.cooperateid;
		wx.navigateTo({
			url: '../reward_details/reward_details?cooperateId='+cooperateId
		})
	},

  doCancel:function(e) {
    console.log("doCancel");
    var _this = this;
    var cooperateId = e.currentTarget.dataset.cooperateid;
    var param = {};
    param.cooperateId = cooperateId;
    network.doPost('markUpCooperate', param, function (res) {
     // wx.showToast({
     //   title: '取消收藏成功',
     // })
      _this.refresh();
    });
   
  }
})
