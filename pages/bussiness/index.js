//index.js
//获取应用实例
var app = getApp();
var fileData = require('../../utils/data.js');
var network = require("../../utils/network.js")
var config = require("../../utils/config.js");

//查询
var search = function (_this, func) {
  var parameter = {};
  parameter.type = _this.data.type;
  parameter.keyWord = _this.data.keyWord;
  var industryList = _this.data.industryList;
  if (industryList != null) {
    var temp = [];
    for (var i = 0; i < industryList.length; i++) {
      temp.push(industryList[i].id);
    }
    parameter.industryId = temp.join(",");
  } else {
    parameter.industryId = "";
  }
  parameter.pageNum = "" + _this.data.pageNum;
  network.doPost('selectInBussiness', parameter, function (res) {
    console.log(res);
    if (res) {
      if (res.pages) {
        var pages = res.pages;
        var pageNum = _this.data.pageNum;
        if (pageNum <= pages) {
          _this.setData({
            "pageNum": pageNum + 1
          });
          if (res.bizList) {
            var bizlist = _this.data.bizlist;
            if (!bizlist) {
              bizlist = [];
            }
            var list = res.bizList;
            for (var i = 0; i < list.length; i++) {
              bizlist.push(list[i]);
            }
            _this.setData({
              "bizlist": bizlist
            });
          }
        }else{
          _this.setData({
            "pullFlag":true
          })
        }
      }
    }
    if (func && typeof func == 'function') {
      func();
    }
  });
};


Page({
  data: {
    slider: [
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000rVobR3xG73f.jpg' },
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000j6Tax0WLWhD.jpg' },
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000a4LLK2VXxvj.jpg' },
  ],
    swiperCurrent: 0,

    hiddenName:true,
    showName: false,
    scrHeight: wx.getSystemInfoSync().windowHeight,
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    currentSwiper: 0,
    swiperCurrent: 0,

    hideHeader: true,
    hideBottom: true,
    bizlist: [],
    type: '1',
    keyWord: '',
    industryList: [],
    scrollTop: 0,
    pageNum: 1,
    curNavId: 1,
    index: 0,//选择的下拉列表下标,
    pullFlag : false

  },

  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
      currentSwiper: e.detail.current
    })
  },

  //初始化回调方法
  onLoad: function () {
  },
  onShow: function () {
    console.log('页面加载');
    var _this = this;
    _this.setData({
      pageNum: 1,
      bizlist: []
    });


    wx.checkSession({
      success: function (res) {
        console.log("商机 onload加载：处于登录态");

        // 业务代码
        search(_this);
        _this.loadPic();

      },
      fail: function (res) {
        console.log("商机onload加载：重新发起登录请求");
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

                    search(_this);
                    _this.loadPic();

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

  // scroll: function (event) {
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  // },

  // 上拉加载更多
  loadMore: function (e) {
    if (this.data.pullFlag){
      return false;
    }
    console.log('上拉加载更多');
    var _this = this;
    _this.setData({
      hideBottom: false
    });
    search(_this, function () {
      _this.setData({
        hideBottom: true
      });
    });
  },

  // 下拉刷新
  refresh: function (e) {
    console.log('下拉刷新');
    var _this = this;
    _this.setData({
      pageNum: 1,
      bizlist: [],
      hideHeader: false,
      pullFlag:false
    });
    search(_this, function () {
      _this.setData({
        hideHeader: true
      });
    });
  },

  //关键字输入
  keyWordInput: function (e) {
    var _this = this;
    var value = e.detail.value;
    _this.setData({
      keyWord: value
    });
  },

  //关键字查询
  keyWordSearch: function (e) {
    var _this = this;
    _this.setData({
      pageNum: 1,
      bizlist: [],
      pullFlag:false
    });
    search(_this);
  },

  //标签切换
  tabFun: function (e) {
    var _this = this;
    //获取触发事件组件的dataset属性  
    var type = e.target.dataset.type;
    _this.setData({
      'type': type,
      'keyWord': '',
      'industryList': [],
      'pageNum': 1,
      'bizlist': [],
      pullFlag:false
    });
    search(_this);
    _this.loadPic();
  },



  //轮播图查询方法
  loadPic: function () {
    var _this = this;
    var picType = _this.data.picType;
    var type = _this.data.type;
    if (type != picType) {
      var parameter = {};
      parameter.type = _this.data.type;
      network.doPost('selectBusinessPic', parameter, function (res) {
        var picUrlList = res.picUrlList;
        _this.setData({
          "picType": _this.data.type,
          "picUrlList": picUrlList
        });
      });
    }
  },

  // 跳转至行业筛选
  ScreeningIndustry: function (e) {
    var _this = this;
    var type = _this.data.type;

    var selectedIndustryIds = "";
    var mylist = _this.data.industryList;
    if (mylist != null && mylist.length > 0) {
      var temp = [];
      for (var i = 0; i < mylist.length; i++) {
        temp.push(mylist[i].id);
        
      }
      selectedIndustryIds = temp.join(",");  
    }
    if (type == "4") { //折扣
      wx.navigateTo({
        url: '../ScreeningIndustry/index?selectedIndustry=' + selectedIndustryIds + '&type=' + type + '&limit=6'
      });
    } else { //其他
      wx.navigateTo({
        url: '../ScreeningIndustry/index?selectedIndustry=' + selectedIndustryIds + '&type=' + type + '&limit=6'
      });
    }
  },

  selectIndustryResult: function (industryListSelected) {

    this.setData({
      'pageNum': 1,
      'bizlist': [],
      "industryList": industryListSelected,
      pullFlag:false
    });
    search(this);
  },

  //移除所选行业
  removeSelectedIndustry: function (e) {
    var _this = this;
    var rmId = e.target.dataset.selectedid;
    var mylist = _this.data.industryList;
    var newlist = [];
    for (var i = 0; i < mylist.length; i++) {
      if (mylist[i].id != rmId) {
        newlist.push(mylist[i]);
      }
    }
    _this.setData({
      'pageNum': 1,
      'bizlist': [],
      'industryList': newlist,
      pullFlag:false
    });
    search(_this);
  },

  // 跳转至公司详情
  CompanyDetails: function (e) {
    var _this = this;
    var headImageUrl = e.currentTarget.dataset.headimageurl;
    var companyId = e.currentTarget.dataset.id; 
    wx.navigateTo({
      url: '../CompanyDetails/index?companyId=' + companyId + '&headImageUrl=' + headImageUrl
    });
  },

  // 跳转至合作详情
  CooperationDetails: function (e) {
    var _this = this;
    var cooperateId = e.currentTarget.dataset.id;
    var headImageUrl = e.currentTarget.dataset.headimageurl;
    wx.navigateTo({
      url: '../CooperationDetails/index?cooperateId=' + cooperateId + '&headImageUrl=' + headImageUrl
    });
  },

  // 跳转至添加合作页
  add_reward: function (e) {
    wx.navigateTo({
      url: '../reward_set/reward_set'
    })
  },

  // 跳转人员至详情页
  navigateDetail: function (e) {
    var userId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?userId=' + userId
    })
  },

  // 跳转至折扣详情
  DiscountDetails: function (e) {
    var discountId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../DiscountDetails/index?discountId=' + discountId
    });
  },

  // book
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?aid=' + e.currentTarget.dataset.aid
    })
  }

})