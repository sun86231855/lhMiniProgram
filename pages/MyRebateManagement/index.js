// pages/RebateManagement/index.js
var network = require("../../utils/network.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    type: "4",
    delBtnWidth: 180,//删除按钮宽度单位（rpx）  
    radioCheckVal: 0,
    scrHeight: wx.getSystemInfoSync().windowHeight,
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      type:"4"
    })
    this.query();
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      type:"2"
    })
    this.query();
  },
  wancheng:function(e){
    var that = this;
    var discountId = e.currentTarget.dataset.id;
    //todo
    wx.showModal({
      title: '提示',
      content: '是否确定完成消费',
      success:function(sm){
        if(sm.confirm){
          var param = {};
          param.discountId = discountId;
          network.doPost("completionOfConsumption",param,function(res){
            that.query();
          })
        }else if(sm.cancel){
          console.log("用户取消完成消费");
        }
      }
    })
  },
  deleteMsg:function(e){
    var that = this;
    var discountId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if(sm.confirm){
          var param = {};
          param.discountId = discountId;
          network.doPost("deleteMinePartake", param, function (res) {
            that.query();
          })
        }else if(sm.cancel){
          congsole.log("用户取消操作");
        }
      }
    })
  },
  quxiao:function(e){
    var that = this;
    var discountId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要取消预定吗？',
      success: function (sm) {
        if (sm.confirm) {
          var param = {};
          param.discountId = discountId;
          network.doPost('deleteDiscountOrder', param, function (res) {
            that.query();
          });
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  query: function () {
    console.log(this.data.type);
    var _this = this;
    _this.setData({
      "discountList": []
    });
    var parameter = {};
    parameter.type = _this.data.type;
    network.doPost('getDiscountListForMy', parameter, function (res) {
      if (res != null) {
        console.log(res);
        _this.setData({
          "discountList": res.discountList
        });
      }
    });
  },

  switchTab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      'type': type
    });
    this.query();
  },

  //点击删除按钮事件  
  delItem: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否确定？',
      success: function (res) {
        if (res.confirm) {
          var param = {};
          param.type = that.data.type;
          param.discountId = id;
          network.doPost('deleteDiscountForMy', param, function (res) {
            that.query();
          });
        }
      }
    });
  },

  mdfItem: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../MdfTheDiscount/index?discountId=' + id
    })
  },

  AddTheDiscount: function (e) {
    wx.navigateTo({
      url: '../AddTheDiscount/index'
    })
  },

  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
  },


  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX
      });
    }
  },
  // touchM: function (e) {
  //   var that = this
  //   initdata(that)
  //   if (e.touches.length == 1) {
  //     //手指移动时水平方向位置  
  //     var moveX = e.touches[0].clientX;
  //     //手指起始点位置与移动期间的差值  
  //     var disX = this.data.startX - moveX;
  //     var delBtnWidth = this.data.delBtnWidth;
  //     var txtStyle = "";
  //     if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
  //       txtStyle = "left:0px";
  //     } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
  //       txtStyle = "left:-" + disX + "px";
  //       if (disX >= delBtnWidth) {
  //         //控制手指移动距离最大值为删除按钮的宽度  
  //         txtStyle = "left:-" + delBtnWidth + "px";
  //       }
  //     }
  //     //获取手指触摸的是哪一项  
  //     var index = e.target.dataset.index;
  //     var list = this.data.list;
  //     list[index].txtStyle = txtStyle;
  //     //更新列表的状态  
  //     this.setData({
  //       list: list
  //     });
  //   }
  // },
  // touchE: function (e) {
  //   if (e.changedTouches.length == 1) {
  //     //手指移动结束后水平位置  
  //     var endX = e.changedTouches[0].clientX;
  //     //触摸开始与结束，手指移动的距离  
  //     var disX = this.data.startX - endX;
  //     var delBtnWidth = this.data.delBtnWidth;
  //     //如果距离小于删除按钮的1/2，不显示删除按钮  
  //     var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
  //     //获取手指触摸的是哪一项  
  //     var index = e.target.dataset.index;
  //     var list = this.data.list;
  //     list[index].txtStyle = txtStyle;
  //     //更新列表的状态  
  //     this.setData({
  //       list: list
  //     });
  //   }
  // },
  // //获取元素自适应后的实际宽度  
  // getEleWidth: function (w) {
  //   var real = 0;
  //   try {
  //     var res = wx.getSystemInfoSync().windowWidth;
  //     var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应  
  //     // console.log(scale);  
  //     real = Math.floor(res / scale);
  //     return real;
  //   } catch (e) {
  //     return false;
  //     // Do something when catch error  
  //   }
  // },
  // initEleWidth: function () {
  //   var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
  //   this.setData({
  //     delBtnWidth: delBtnWidth
  //   });
  // },


  // 跳转至折扣详情
  DiscountDetails: function (e) {
    var discountId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../DiscountDetails/index?discountId=' + discountId
    });
  },




	/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    //this.initEleWidth();
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
    this.query();
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
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