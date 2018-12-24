//index.js
//获取应用实例
var app = getApp();
var fileData = require('../../utils/data.js');
var network = require("../../utils/network.js");
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

Page({
  // 页面初始数据
  data: {
    

    swiperCurrent: 0,
    // butHeight: 50,
    scrHeight: wx.getSystemInfoSync().windowHeight,

    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
 banner_url: fileData.getBannerData(),
    // banner_url: ["/images/bannera.jpg","/images/bannerb.jpg"],
    classId: "",
    circlesId: "",
    inviteCode: "",
    indicatorDots: true,
    vertical: false,
   

    // nav 初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: null,
    defaultclassName: "",
    defaultCircleName: "",
    defaultName: "",
    returnType: "",
    currOtherName: "点击查看其它班级",
    curNavId: 1,
    curIndex: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    associationId: "",
    currInviteCode: "",
    pageIndex: 12,
    swiperCurrent: 0,
    currentSwiper: 0,


    pullDownFalg: true,
    weatherCheck:false,
  },
  //轮播图的切换事件
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current,
      currentSwiper: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function(e) {
    console.log(this.data.swiperCurrent);
    if (this.data.swiperCurrent == '0') {
      wx.navigateTo({
        url: '../bannerFirst/index'
      });
    } else {
      wx.navigateTo({
        url: '../bannerSecond/index'
      });
    }

  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  pullDownFunction: function(e) {
    console.log(this.data.pullDownFalg);
    var defaultName = "";
    if (this.data.curIndex == '0') { //班级
      console.log("班级");
      if (this.data.pullDownFalg) {
        defaultName = this.data.defaultclassName.split(",");
      } else {
        defaultName = (this.data.defaultclassNameClose).split(",");
        if (this.data.defaultclassName.split(",").length > 1) {
          defaultName = (defaultName + "...").split(",");
        }
      }
    } else if (this.data.curIndex == '1') { //圈子
      console.log("圈子");
      if (this.data.pullDownFalg) {
        defaultName = this.data.defaultCircleName.split(",")
      } else {
        defaultName = (this.data.defaultCircleNameClose).split(",");
        if (this.data.defaultCircleName.split(",").length > 1) {
          defaultName = (defaultName + "...").split(",");
        }
      }
    }
    this.setData({
      pullDownFalg: !this.data.pullDownFalg,
      defaultName: defaultName
    })
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎加入社群',
      path: '/pages/index/index?share=1&paramInviteCode=' + this.data.currInviteCode,
      success: function(res) {
        // 转发成功.
        console.log(res);

        console.log('转发成功');
      },
      fail: function(res) {
        // 转发失败
        console.log(res);
        console.log('转发失败');
      }
    }
  },
  // 点击下拉列表
  optionTap: function(e) {

    var _this = this;
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    //增加跳转判断
    let asl = this.data.selectData;
    if (asl) {
      let item = asl[Index];
      if (item && item.isPopup == "1") {
        wx.showModal({
          title: '提示',
          content: '选择该社群需要进行认证',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../school/school'
              });
            }
            _this.setData({
              index: Index,
              show: !_this.data.show
            });
          }
        });
      } else {
        this.setData({
          index: Index,
          show: !this.data.show
        });
        var that = this;

        that.setData({
          list: '',
          defaultName: '',
          defaultclassName: '',
          defaultCircleName: ''
        });
        doLoadData(that, Index);
      }
    }

  },


  onLoad: function(options) {
    util.startLoading();
    var that = this;
    var retassociationId = options.associationId;
    var assoIndex = options.assoIndex;
    if (assoIndex != null && assoIndex != '' && assoIndex != 'undefined' && typeof(assoIndex) != 'undefined') {
      that.setData({
        index: assoIndex
      })
    }

    if (retassociationId != null && retassociationId != '' && retassociationId != 'undefined' && typeof(retassociationId) != 'undefined') {
      that.setData({
        associationId: retassociationId
      })
    }

    var share = options.share;
    console.log("=====================999===========" + share);
    if (share != null && share != '' && share != 'undefined' && typeof(share) != 'undefined') {
      var returnInviteCode = options.paramInviteCode
      var paramsub = {
        "inviteCode": returnInviteCode
      };
      //设置邀请码
      network.doPost('applyCommunity', paramsub, function(res) {
        that.setData({
          showModal: false
        });
      });
    }

    var returnType = options.returnType;
    if (returnType && returnType != null) {
      if (returnType == 0) {
        that.setData({
          classId: options.classId,
          curNavId: 1,
          curIndex: 0,
          returnType: returnType,
          currOtherName: "切换到其它班级"
        });
      } else if (returnType == 1) {
        that.setData({
          circlesId: options.circlesId,
          curNavId: 2,
          curIndex: 1,
          returnType: returnType,
          currOtherName: "切换到其它圈子"
        });
      }
    }

    wx.checkSession({
      success: function(res) {
        console.log("人脉 onload加载：处于登录态");

        // 业务代码


      },
      fail: function(res) {
        console.log("人脉onload加载：重新发起登录请求");
        wx.login({
          success: function(res) {
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
                success: function(result) {
                  console.log("index onLoad 获取到的新token:");
                  console.log(result);
                  var res = result.data.body;
                  if (res) {

                    console.log("wx login success:token" + res.token);
                    wx.setStorageSync('token', res.token);
                    wx.setStorageSync('openId', res.openId);
                    //重新发起请求

                    var returnType = options.returnType;
                    if (returnType && returnType != null) {
                      if (returnType == 0) {
                        that.setData({
                          classId: options.classId,
                          curNavId: 1,
                          curIndex: 0,
                          returnType: returnType,
                          currOtherName: "切换到其它班级"
                        });
                      } else if (returnType == 1) {
                        that.setData({
                          circlesId: options.circlesId,
                          curNavId: 2,
                          curIndex: 1,
                          returnType: returnType,
                          currOtherName: "切换到其它圈子"
                        });
                      }
                    }

                    //              doPost(method, param, success, fail);
                  }
                },
                fail: function(res) {
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

    util.stopLoading();
  },
  onShow: function() {
    this.setData({
      pullDownFalg: true
    })
    var that = this;
    doLoadData(that, that.data.index);
  },
  //标签切换
  switchTab: function(e) {
    console.log();
    let id = e.currentTarget.dataset.id,
      index = parseInt(e.currentTarget.dataset.index)
    this.curIndex = parseInt(e.currentTarget.dataset.index)
    console.log("currentIndex====" + index + "===id===" + id)
    var currOtherName = '';
    var defaultName = "";
    var llreturntype = "";
    if (index == 0) {
      currOtherName = '点击切换其它班级';
      llreturntype = 0;
      defaultName = (this.data.defaultclassNameClose).split(",");
      if (this.data.defaultclassName.split(",").length > 1) {
        defaultName = (defaultName + "...").split(",");
        alert(1);
      }
    } else if (index == 1) {
      currOtherName = '点击切换其它圈子';
      llreturntype = 1;
      defaultName = (this.data.defaultCircleNameClose).split(",");
      if (this.data.defaultCircleName.split(",").length > 1) {
        defaultName = (defaultName + "...").split(",");
      }
    }
    var that = this;
    this.setData({
      curNavId: id,
      curIndex: index,
      currOtherName: currOtherName,
      returnType: llreturntype,
      defaultName: defaultName,
      pullDownFalg: true,
      pageIndex: 12
    })
  },
  // 跳转至详情页
  navigateDetail: function(e) {
    console.log(e.currentTarget.dataset.aid);
    if(this.data.weatherCheck){
      wx.navigateTo({
        url: '../detail/detail?userId=' + e.currentTarget.dataset.aid
      })
    }
  },


  // 加载更多
  loadMore: function(e) {
    util.startLoading();
    var curid = this.data.curIndex
    var pageIndex = this.data.pageIndex;
    pageIndex += 6;
    this.setData({
      pageIndex: pageIndex
    });
    console.log('77加载更多' + this.data.pageIndex);
    util.stopLoading();
    //if (this.data.navSectionItems[curid].length === 0) return
    /** 
    var that = this;
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    }) 
    */
  },
  /*弹窗*/
  /**
   * 弹窗
   */
  showDialogBtn: function() {

    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},

  //获取用户输入的邀请码
  inputChange: function(e) {
    this.setData({
      inviteCode: e.detail.value
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function(event) {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function(event) {
    // this.hideModal();
    //var userId = wx.getStorageSync("userId");
    //var token = wx.getStorageSync("token");
    //var activateCode = this.data.activateCode;
    //var card = event.currentTarget.dataset.card;
    var that = this;
    var inviteCode = that.data.inviteCode;
    if (inviteCode == null || inviteCode == '') {
      wx.showToast({
        title: '请输入邀请码!',
      })
      return;
    }
    var param = {
      "inviteCode": this.data.inviteCode
    };
    //设置邀请码
    network.doPost('applyCommunity', param, function(res) {
      that.setData({
        showModal: false
      });
    });
  },


  // AllClass
  AllClass: function(e) {
    var curIndex = e.currentTarget.dataset.aid;
    console.log("curIndex===" + curIndex);
    // console.log(this.data.defaultName);
    var defName = this.data.defaultName
    if (curIndex == '0') { //班级
      defName = this.data.defaultclassName;
    } else if (curIndex == '1') { //圈子
      defName = this.data.defaultCircleName
    }
    this.setData({
      list: '',
      defaultName: '',
      defaultclassName: '',
      defaultCircleName: ''
    });
    wx.navigateTo({
      url: '../AllClass/details?defaultName=' + defName + '&associationId=' + this.data.associationId + '&curIndex=' + curIndex + '&assoIndex=' + this.data.index
    })
  },

  // book
  bookTap: function(e) {
    wx.navigateTo({
      url: '../book/book?aid=' + e.currentTarget.dataset.aid
    })
  },


})

function doLoadData(that, currk) {
  console.log("................................>>>>" + currk);
  var param = {};
  //获取社群列表
  if (!currk){
    currk=0;
  }
  network.doPost('selectAssociationList', param, function(res) {
    if (res) {
      var gymInfo = res.associationList;
      var associationId = "";
      if (gymInfo != null) {
        var assListArry = new Array(gymInfo.length);
        for (var i = 0; i < gymInfo.length; i++) {
          if (i == currk) {
            associationId = gymInfo[i].associationId;
          }
          //assListArry[i] = gymInfo[i].associationName;
          assListArry[i] = {
            "name": gymInfo[i].associationName,
            "isPopup": gymInfo[i].isPopup,
          };;
        }

        that.setData({
          selectData: assListArry,
          associationId: associationId,
          weatherCheck: true
        });
        if (assListArry && assListArry[currk].isPopup == '1'){
          that.setData({
            weatherCheck:false,
          });
          wx.showModal({
            title: '提示',
            content: '选择该群需要进行认证',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../school/school'
                });
              }
            }
          });
        }
        //获取班级，圈子，亲友团，平台信息
        var paramPage = {
          "associationId": associationId,
          "classId": that.data.classId,
          "circlesId": that.data.circlesId
        };

        network.doPost('queryFirstPage', paramPage, function(res) {
          console.log(res);
          console.log(res);
          console.log(res);
          console.log(res);
          console.log(res);
          console.log(res);
          console.log(res);
          console.log(res);
          
          if (res) {
            var firstDataList = res.firstDataList;
            var defaultclassName = res.defaultclassName;
            var defaultCircleName = res.defaultCircleName;
            var returnType = that.data.returnType;
            var defaultclassNameClose = defaultclassName.split(",")[0];
            var defaultCircleNameClose = defaultCircleName.split(",")[0];
            var defaultName = "";
            console.log("=================================XX==" + returnType + "class=" + defaultclassName + "circle=" + defaultCircleName);
            if (returnType != null && returnType == 1) { //圈子
              if (that.data.pullDownFalg) {
                defaultName = (defaultCircleNameClose).split(",")
                if (defaultCircleName.split(",").length > 1) {
                  defaultName = (defaultName + "...").split(",");
                }
              } else {
                defaultName = defaultCircleName.split(",");
              }
            } else if (returnType != null && returnType == 0) { //班级
              if (that.data.pullDownFalg) {
                defaultName = (defaultclassNameClose).split(",")
                if (defaultclassName.split(",").length > 1) {
                  defaultName = (defaultName + "...").split(",");
                }
              } else {
                defaultName = defaultclassName.split(",");
              }

            } else {
              defaultName = [""];
            }

            console.log("=================================defaultName==" + defaultName);

            that.setData({
              list: firstDataList,
              defaultName: defaultName,
              defaultclassName: defaultclassName,
              defaultCircleName: defaultCircleName,
              defaultclassNameClose: defaultclassNameClose,
              defaultCircleNameClose: defaultCircleNameClose
            });
          }
        });

        //获得社群邀请码
        network.doPost('makeInviteCodeForCommunity', paramPage, function(res) {
          if (res) {
            var inviteCode = res.inviteCode;
            console.log("==========================111==" + inviteCode);
            that.setData({
              currInviteCode: inviteCode
            });
          }
        });

      } else {
        wx.showToast({
          title: '请加入社群',
        })
      }
    } else {
      wx.showToast({
        title: '请加入社群',
      })
    }
  });



  var param2 = {};
  param2.type = "0";
  network.doPost('selectBusinessPic', param2, function(res) {
    console.log(1111111)
    console.log(res)
    if (res) {
      that.setData({
        "banner_url": res.picUrlList
      });
    }

  });

}