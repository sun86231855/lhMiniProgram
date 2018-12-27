// pages/AddTheDiscount/index.js
var network = require("../../utils/network.js")
var util = require('../../utils/util')
var config = require("../../utils/config.js")
var COS = require("../../utils/cos-wx-sdk-v5.js")
var cos = new COS({
  getAuthorization: function(params, callback) { //获取签名 必填参数
    // 方法二（适用于前端调试）
    var authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: params.Method,
      Key: params.Key
    });
    callback(authorization);
  }
});

function checkDiscount(discount) {
  var d = parseFloat(discount);
  if (!isNaN(d)) {
    if (d >= 0 && d < 10) {
      return true;
    }
  }
  return false;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexd: -1,
    flag1: false,
    flag2: true,
    selectData: ['美食', '酒店入住', '旅游', '休闲娱乐', '生活服务', '宴会', '购物', '丽人购物', '运动健身', '母婴亲子', '宠物', '汽车服务', '摄影写真', '结婚', '家装', '其他'],
    index: "", //选择的下拉列表下标
    scrHeight: wx.getSystemInfoSync().windowHeight,
    lists: [],
    rangeType: "1",
    rangeValue: "",
    storeContacts: "",
    selectOne: "",
    storeContactsTel: "",
    selectDataName:"",
    isfouce: true,      // 切换
    summary: ''    // textarea的输入值
  },
  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      flag1: true,
      flag2: false,
      indexd: e.detail.value
    });
  },

  // 跳转至详情页
  cutPic: function(e) {
    console.log(e.currentTarget.dataset.aid);
    wx.navigateTo({
      url: '../CutPic/index'
    })
  },


  //点击删除按钮事件
  delItem: function(e) {
    var that = this
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var detailImageUrlList = that.data.detailImageUrlList;
    //移除列表中下标为index的项
    detailImageUrlList.splice(index, 1);
    //更新列表的状态
    that.setData({
      detailImageUrlList: detailImageUrlList
    });


  },

  storeContactsInput: function(e) {
    var storeContacts = e.detail.value;
    this.setData({
      storeContacts: storeContacts
    });
  },

  storeContactsTelInput: function(e) {
    var storeContactsTel = e.detail.value;
    this.setData({
      storeContactsTel: storeContactsTel
    })
  },

  addList: function() {
    var lists = this.data.lists;
    lists.push(''); //实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })
  },

  delList: function() {
    var lists = this.data.lists;
    lists.pop(); //实质是删除lists数组内容，使for循环少一次
    this.setData({
      lists: lists,
    })
  },

  addrsInput: function(e) {
    var address = e.detail.value;
    var index = e.currentTarget.dataset.id;
    var lists = this.data.lists;
    lists[index] = address;
    this.setData({
      'lists': lists
    });
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      rangeType: e.detail.value
    });
  },

  subjectInput: function(e) {
    this.setData({
      subject: e.detail.value
    });
  },

  summaryInput: function(e) {
    this.setData({
      isfouce: true,
      summary: e.detail.value
    });
  },

  isfouce: function () {
    this.setData({
      isfouce: false
    })
  },


  chooseServiceType: function(e) {
    var selectedIndustryIds = "";
    var serviceTypeList = this.data.serviceTypeList;
    if (serviceTypeList != null && serviceTypeList.length > 0) {
      var temp = [];
      for (var i = 0; i < serviceTypeList.length; i++) {
        temp.push(serviceTypeList[i].id);
      }
      selectedIndustryIds = temp.join(",");
    }
    wx.navigateTo({
      url: '../ScreeningIndustry/index?selectedIndustry=' + selectedIndustryIds + '&type=4&single=true'
    });
  },

  selectIndustryResult: function(industryListSelected) {
    this.setData({
      "serviceTypeList": industryListSelected
    });
  },

  telInput: function(e) {
    this.setData({
      tel: e.detail.value
    });
  },

  discountInput: function(e) {
    this.setData({
      discount: e.detail.value
    });
  },

  headImageUpload: function() {
    var that = this;
    var baseUrl = "https://sysykj-1257940010.cos.ap-chengdu.myqcloud.com/";
    var imgUrl = "";
    // 选择文件
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        if (!(res && res.tempFilePaths)) {
          return;
        }
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var filePath = res.tempFilePaths[i];
          var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
          var imgUrl = baseUrl + Key; //图片的获取路径
          cos.postObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              FilePath: filePath,
              onProgress: function(info) {
                // console.log(JSON.stringify(info));
              }
            },
            function(err, data) {
              if (!err) {
                that.setData({
                  headImageUrl: imgUrl
                });
              } else {
                console.log("---------------^^^^^^^^-------------------");
                console.log(err);
                console.log(data);
                wx.showToast({
                  title: '请求成功',
                  icon: 'success',
                  duration: 3000
                });
              }
            }
          );
        }
      }
    });
  },

  detailImageUpload: function() {
    var that = this;
    var baseUrl = "https://sysykj-1257940010.cos.ap-chengdu.myqcloud.com/";
    var imgUrl = "";
    // 选择文件
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        if (!(res && res.tempFilePaths)) {
          return;
        }
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var filePath = res.tempFilePaths[i];
          var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
          var imgUrl = baseUrl + Key; //图片的获取路径
          cos.postObject({
              Bucket: config.Bucket,
              Region: config.Region,
              Key: Key,
              FilePath: filePath,
              onProgress: function(info) {
                // console.log(JSON.stringify(info));
              }
            },
            function(err, data) {
              if (!err) {
                var detailImageUrlList = that.data.detailImageUrlList;
                if (!detailImageUrlList) {
                  detailImageUrlList = [];
                }
                detailImageUrlList.push(imgUrl);
                that.setData({
                  detailImageUrlList: detailImageUrlList
                });
              } else {
                wx.showToast({
                  title: '请求成功',
                  icon: 'success',
                  duration: 3000
                });
              }
            });
        }
      }
    });
  },

  previewImage: function(e) {
    //获取当前图片的下表
    var url = e.currentTarget.dataset.src;
    //数据源
    var pictures = [];
    pictures.push(url);
    wx.previewImage({
      urls: pictures
    });
  },

  goAhead: function() {
    var _this = this;
    var param = {};

    if (util.checkText(_this.data.subject, false)) {
      param.subject = _this.data.subject;
    } else {
      util.alert('请输入折扣主题');
      return;
    }

    if (util.checkText(_this.data.summary, false)) {
      param.summary = _this.data.summary;
    } else {
      util.alert('请输入折扣简介');
      return;
    }
    /////////////////////////////////////////////////
    if (_this.data.indexd != -1) {

      param.type = _this.data.industryIdList[_this.data.indexd];
    } else {
      util.alert('请选择服务类型');
      return;
    }
    //////////////////////////////////////
    if (util.checkTel(_this.data.tel)) {
      param.tel = _this.data.tel;
    } else {
      util.alert('请输入正确的联系电话');
      return;
    }

    if (checkDiscount(_this.data.discount)) {
      param.discount = _this.data.discount;
    } else {
      util.alert('请输入正确优惠信息');
      return;
    }

    if (_this.data.rangeType && _this.data.rangeType != '') {
      param.rangeType = _this.data.rangeType;
    } else {
      util.alert('请选择折扣类型');
      return;
    }

    if (util.checkText(_this.data.rangeValue, true)) {
      param.rangeValue = _this.data.rangeValue;
    } else {
      util.alert('请输入折扣范围值');
      return;
    }

    if (_this.data.lists && _this.data.lists.length > 0) {
      var lists = _this.data.lists;
      param.addrs = lists.join("\n");
    } else {
      util.alert('请输入地址');
      return;
    }

    if (_this.data.headImageUrl && _this.data.headImageUrl != '') {
      param.headImageUrl = _this.data.headImageUrl;
    } else {
      util.alert('请选择封面图片');
      return;
    }

    if (_this.data.detailImageUrlList && _this.data.detailImageUrlList.length > 0) {
      param.detailImageUrlList = JSON.stringify(_this.data.detailImageUrlList);
    } else {
      util.alert('请选择相册图片');
      return;
    }
    param.storeContacts = _this.data.storeContacts;
    param.storeContactsTel = _this.data.storeContactsTel;
    param.id = _this.data.id;
    network.doPost('addDiscountForMy', param, function(res) {
      wx.navigateBack();
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var param = {};
    param.type = '4';
    network.doPost('selectBusinessIndustry', param, function(res) {
      console.log(res);
      console.log(res);
      var industryList = res.industryList;
      if (industryList && industryList.length > 0) {
        var industryIdList = [];
        var industryNameList = [];
        for (let i = 0; i < industryList.length; i++) {
          industryIdList.push(industryList[i].id);
          industryNameList.push(industryList[i].name);
        }
        _this.setData({
          "industryIdList": industryIdList,
          "industryNameList": industryNameList
        });
      } else {
        _this.setData({
          "industryIdList": [],
          "industryNameList": []
        });
      }

    })

    if (options.discountId) {
      var discountId = options.discountId;
      console.log(options); 
      wx.setNavigationBarTitle({
        title: '修改折扣'
      })
      _this.setData({
        'discountId': discountId
      });
      var param = {};
      param.discountId = options.discountId;
      network.doPost('getDiscountDetail', param, function(res) {
        if (res) {
          var address = res.addrList;
          res.lists = address.split("/n");

          res.serviceTypeList = [];
          var v = {};
          v.id = res.discountType;
          v.name = res.discountTypeName;
          res.serviceTypeList.push(v);
          
          _this.setData(res);
          _this.setData({
            flag1: true,
            flag2: false,
            indexd:res.discountType-1
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})