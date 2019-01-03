//personal_details.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")
var config = require("../../utils/config.js")
var COS = require("../../utils/cos-wx-sdk-v5.js")
var cos = new COS({
  getAuthorization: function (params, callback) {//获取签名 必填参数
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
Page({
  // 页面初始数据
  data: {
    selectData: ['商业模式专家', '品牌营销专家', '流程管理专家', 'ERP软件专家', '财税费控专家','人力资源专家', '法律法规专家', '生产管理专家', '投融资专家', '软件开发专家', '小程序/APP专家', '其他专家'], //下拉列表的数据
    selectOne:"",
    flag1: false,
    flag2: true,
    hiddenName: true,
    last_time: '',
    is_show: true,
    flagjl: 0,
    noteMaxLenjl: 100, // 最多放多少字
    infojl: "",
    noteNowLenjl: 0, //备注当前字数
    roleList:[],
    cflag1: true,
    cflag2: true,
    rflag1: true,
    rflag2: true,
    telephone: "",
    telephoneCopy: "",
    telPowerTypeName: "",
    wecat: "",
    industrySummary: "请输入",
    industryName: "",
    inviterId: "",
    telephoneVisibility: "", //电话号码可见类型
    wecatVisibility: "", //微信可见类型 
    itemsa: "",
    itemsb: "",
    name: "",
    headImageUrl: "",
    list: [{
        'id': 0,
        'name': "课程1",
        'NameLt': ["list10", "list11", "list10", "list11"],
        'hidden': true
      },
      {
        'id': 1,
        'name': "课程2",
        'NameLt': ["list20", "list21", "list10", "list11"],
        'hidden': true
      },
      {
        'id': 2,
        'name': "课程3",
        'NameLt': ["list30", "list31", "list10", "list11"],
        'hidden': true
      },
    ],
    abilityTel:""

  },
  
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      flag1: true,
      flag2: false,
      inviterId: e.detail.value,
      indexd: e.detail.value,
      selectOne:""

    });
  }, 
 


  clickMe: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },

  clickVerify: function() {
    var that = this;
    var param = {};
    var tel = that.data.telephone;
    if (!tel || tel.trim() == '') {
      util.alert("请输入电话号码");
      return;
    }
    param.tel = tel;
    network.doPost('getTelValidateCode', param, function(res) {
      // 将获取验证码按钮隐藏60s，60s后再次显示
      that.setData({
        is_show: (!that.data.is_show) //false
      })
      settime(that);
    });
  },



  // 监听字数
  bindTextAreaChangejl: function(e) {
    //获取用户输入的昵称
    if(e){
      this.setData({
        industrySummary: e.detail.value
      })
    }
    var value="";
    var that = this;
    if(e){
      value = e.detail.value
    }else{
      value = this.data.industrySummary
    }
    var len = parseInt(value.length);
    if (len > that.data.noteMaxLenjl)
      return;
    that.setData({
      infojl: value,
      noteNowLenjl: len
    })
  },

  // 下拉
  hiddenBtn: function(e) {
    var that = this;
    // 获取事件绑定的当前组件
    var index = e.currentTarget.dataset.index;
    // 获取list中hidden的值
    // 隐藏或显示内容
    that.data.list[index].hidden = !that.data.list[index].hidden;
    that.setData({
      list: that.data.list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var param = {};

    //获取昵称电话，头像等信息
    network.doPost('getUerInfoForMy', param, function(res) {
      var telephone = res.tel;
      var telPowerTypeName = res.telPowerTypeName;
      var wecat = res.wecat;
      var industrySummary = res.industrySummary;
      var industryName = res.industryName;
      var inviterId = res.inviterId;
      var name = res.name;
      var headUrl = res.headUrl;
      if (industryName == null) {
        industryName = "";
      }

      var telephoneVisibility = res.telPowerType; //电话号码可见类型
      if (telephoneVisibility == null || telephoneVisibility == '') {
        telephoneVisibility = "1";
      }
      var telephoneVisibilityValue = res.telPowerValue;

      var wecatVisibility = res.wecatPowerType; //微信可见类型 
      if (wecatVisibility == null || wecatVisibility == '') {
        wecatVisibility = "1";
      }
      var wecatVisibilityValue = res.wecatPowerValue;

      var itema = getRadioItem(telephoneVisibility);
      var itemb = getRadioItem(wecatVisibility);
      that.setData({
        telephone: telephone,
        telephoneCopy: telephone,
        abilityTel:telephone,
        telPowerTypeName: telPowerTypeName,
        wecat: wecat,
        industrySummary: industrySummary,
        industryName: industryName,
        inviterId: inviterId,
        telephoneVisibility: telephoneVisibility,
        telephoneVisibilityValue: telephoneVisibilityValue,
        wecatVisibility: wecatVisibility,
        wecatVisibilityValue: wecatVisibilityValue,
        itemsa: itema,
        itemsb: itemb,
        selectOne: industryName,
        name:name,
        headImageUrl: headUrl

      });
      that.bindTextAreaChangejl();
    });

    //获取昵称电话，头像等信息
    network.doPost('selectClassListForMy', {}, function(res) {
      if (res) {
        if (res.classList) {
          that.setData({
            'classList': res.classList
          });
        }
      }
    });


    network.doPost('getRoleDicList', {}, function(res) {
      if (res) {
        that.setData({
          'roleList': res
        });
      }
    });

  },



  //出现
  show: function() {

    this.setData({
      flag: false
    })

  },
  //消失

  hide: function() {

    this.setData({
      flag: true
    })

  },
  doCopy: function(e) {
    this.setData({
      telephoneCopy: this.data.telephone,
      industrySummary: this.data.telephone
    })
  },
  /*xuanz*/
  itemSelected: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.itemList[index];
    item.isSelected = !item.isSelected;
    this.setData({
      itemList: this.data.itemList,
    });
  },

  headImageUpload: function () {
    var that = this;
    console.log("ssssssssssssssssss");
    var baseUrl = "https://sysykj-1257940010.cos.ap-chengdu.myqcloud.com/";
    //    var baseUrl="";
    console.log(baseUrl);
    var imgUrl = "";
    // 选择文件
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if (!(res && res.tempFilePaths)) {
          return;
        }
        var filePath = res.tempFilePaths[0];
        var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
        var imgUrl = baseUrl + Key;//图片的获取路径
        console.log("imgUrl:");
        console.log(imgUrl);

        cos.postObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          FilePath: filePath,
          onProgress: function (info) {

          }
        },
          function (err, data) {
            if (!err) { //上传成功
              var param = {};
              param.headUrl = imgUrl;
              network.doPost('updateHeadUrl', param, function (res) {
                that.setData({
                  'headImageUrl': imgUrl
                });
              });
            }
          }
        );
      }
    });
  },


  
  //获取真实姓名
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  //获取电话号码
  phoneInput: function(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取微信号码
  wecatInput: function(e) {
    this.setData({
      wecat: e.detail.value
    })
  },

  // //获取个人简介
  // industryInput: function (e) {
  //   this.setData({
  //     industrySummary: e.detail.value
  //   })
  // },
  changeAbilityTel:function(e){
    this.setData({
      "abilityTel":e.detail.value
    });
  },
  doSave: function(e) {
    var that = this;

    var name = that.data.name;
    if (name == null || name == '') {
      wx.showToast({
        title: '真实姓名不允许为空!',
      })
      return;
    };

    var telephone = that.data.telephone;
    if (telephone == null || telephone == '') {
      wx.showToast({
        title: '电话号码不允许为空!',
      })
      return;
    };

    //手机号正则  
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(telephone)) {
      wx.showToast({
        title: '手机号码错误！',
      })
      return;
    }

    var wecat = that.data.wecat;
    if (wecat == null || wecat == '') {
      wx.showToast({
        title: '微信号码不允许为空!',
      })
      return;
    };



    var param = {
      "name":this.data.name,
      "userTelephone": this.data.telephone,
      "code": this.data.code,
      "userWecat": this.data.wecat,
      "abilitySummary": this.data.industrySummary,
      "abilityType": this.data.inviterId,
      "telephoneVisibility": this.data.telephoneVisibility, //电话号码可见类型
      "telephoneVisibilityValue": this.data.telephoneVisibilityValue,
      "wecatVisibility": this.data.wecatVisibility, //微信可见类型
      "wecatVisibilityValue": this.data.wecatVisibilityValue,
      abilityTel: this.data.abilityTel
    };
    console.log(param);
    wx.showLoading({
      title: '处理中...',
    })
    //修改个人基本信息
    console.log(1123);
    network.doPost('updateUser', param, function(res) {
      wx.hideLoading();

      // 绑定手机号
      // todo:绑定手机号开关

      /*
      var param1 = {
        "tel": that.data.telephone
      };
      network.doPost('bindTel', param1, function(res) {
        console.log("bindTel");
        console.log(res);
      });
       */

      wx.showToast({
        title: '更改成功!',
      })
      setTimeout(function() {
        wx.switchTab({
          url: '../user/user'
        })
      }, 1000)
     
    });
  },

  chooseCatalog: function(data) {
    var that = this;
    that.setData({ //把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })
  },

  /*xuanzend*/
  //电话可视部分
  telephoneVisibilityRadioChange: function(e) {
    var telephoneVisibility = e.detail.value;
    this.setData({
      telephoneVisibility: telephoneVisibility
    });
  },

  class1ChooseChange: function(e) {
    var telephoneVisibilityValue = "";
    var selectClassIds = e.detail.value;
    if (selectClassIds && selectClassIds.length > 0) {
      telephoneVisibilityValue = selectClassIds.join(",");
    }
    this.setData({
      telephoneVisibilityValue: telephoneVisibilityValue
    })
  },

  class1ChooseShow: function() {
    var classList1 = [];
    var classList = this.data.classList;
    var telephoneVisibilityValues = this.data.telephoneVisibilityValue ? this.data.telephoneVisibilityValue.split(",") : [];
    for (var i = 0; i < classList.length; i++) {
      var clazz = classList[i];
      var selected = false;
      for (var j = 0; j < telephoneVisibilityValues.length; j++) {
        var ff = telephoneVisibilityValues[j];
        if (ff == clazz.classId) {
          selected = true;
        }
      }
      classList1.push({
        "selected": selected,
        "classId": clazz.classId,
        "className": clazz.className
      });
    }
    this.setData({
      cflag1: false,
      classList1: classList1
    });
  },

  class1ChooseHide: function() {
    this.setData({
      cflag1: true
    })
  },


  role1ChooseChange: function(e) {
    var telephoneVisibilityValue = "";
    var selectIds = e.detail.value;
    if (selectIds && selectIds.length > 0) {
      telephoneVisibilityValue = selectIds.join(",");
    }
    this.setData({
      telephoneVisibilityValue: telephoneVisibilityValue
    })
  },

  role1ChooseShow: function() {
    var roleList1 = [];
    var roleList = this.data.roleList;
    var telephoneVisibilityValues = this.data.telephoneVisibilityValue ? this.data.telephoneVisibilityValue.split(",") : [];
    for (var i = 0; i < roleList.length; i++) {
      var role = roleList[i];
      var selected = false;
      for (var j = 0; j < telephoneVisibilityValues.length; j++) {
        var ff = telephoneVisibilityValues[j];
        if (ff == role.id) {
          selected = true;
        }
      }
      roleList1.push({
        "selected": selected,
        "id": role.id,
        "name": role.name
      });
    }
    this.setData({
      rflag1: false,
      roleList1: roleList1
    });
  },

  role1ChooseHide: function() {
    this.setData({
      rflag1: true
    })
  },

  //微信可视部分
  wecatVisibilityRadioChange: function(e) {
    var w = e.detail.value;
    this.setData({
      wecatVisibility: w
    });
  },

  class2ChooseChange: function(e) {
    var wecatVisibilityValue = "";
    var selectClassIds = e.detail.value;
    if (selectClassIds && selectClassIds.length > 0) {
      wecatVisibilityValue = selectClassIds.join(",");
    }
    this.setData({
      wecatVisibilityValue: wecatVisibilityValue
    })
  },

  class2ChooseShow: function() {
    var classList2 = [];
    var classList = this.data.classList;
    var wecatVisibilityValues = this.data.wecatVisibilityValue ? this.data.wecatVisibilityValue.split(",") : [];
    for (var i = 0; i < classList.length; i++) {
      var clazz = classList[i];
      var selected = false;
      for (var j = 0; j < wecatVisibilityValues.length; j++) {
        var ff = wecatVisibilityValues[j];
        if (ff == clazz.classId) {
          selected = true;
        }
      }
      classList2.push({
        "selected": selected,
        "classId": clazz.classId,
        "className": clazz.className
      });
    }
    this.setData({
      cflag2: false,
      classList2: classList2
    });
  },

  class2ChooseHide: function() {
    this.setData({
      cflag2: true
    })
  },

  role2ChooseChange: function(e) {
    var wecatVisibilityValue = "";
    var selectIds = e.detail.value;
    if (selectIds && selectIds.length > 0) {
      wecatVisibilityValue = selectIds.join(",");
    }
    this.setData({
      wecatVisibilityValue: wecatVisibilityValue
    })
  },

  role2ChooseShow: function() {
    var roleList2 = [];
    var roleList = this.data.roleList;
    var wecatVisibilityValues = this.data.wecatVisibilityValue ? this.data.wecatVisibilityValue.split(",") : [];
    for (var i = 0; i < roleList.length; i++) {
      var role = roleList[i];
      var selected = false;
      for (var j = 0; j < wecatVisibilityValues.length; j++) {
        var ff = wecatVisibilityValues[j];
        if (ff == role.id) {
          selected = true;
        }
      }
      roleList2.push({
        "selected": selected,
        "id": role.id,
        "name": role.name
      });
    }
    this.setData({
      rflag2: false,
      roleList2: roleList2
    });
  },

  role2ChooseHide: function() {
    this.setData({
      rflag2: true
    })
  },

  checkboxChange2: function(e) {
    console.log('bbcheckbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      wecatVisibility: e.detail.value
    })
  },
  check(e) {
    wx.navigateTo({
      url: '../need/need?type=2'
    })
  },
  checkIndustryResult(data) {
    console.log(data.id);
    this.setData({
      inviterId: data.id,
      industryName: data.name
    });
  },
})

function getRadioItem(typeStr) {
  var telItemArray = new Array(3);
  var obja = new Object();
  obja.name = "1";
  obja.value = "全员可见";
  if (typeStr && parseInt(typeStr) == 1) {
    obja.checked = true;
  }
  telItemArray[0] = obja;
  var objb = new Object();
  objb.name = "2";
  objb.value = "部分班级可见";
  if (typeStr && parseInt(typeStr) == 2) {
    objb.checked = true;
  }
  telItemArray[1] = objb;
  var objc = new Object();
  objc.name = "3";
  objc.value = "部分身份可见";
  if (typeStr && parseInt(typeStr) == 3) {
    objc.checked = true;
  }
  telItemArray[2] = objc;
  return telItemArray;
}
var countdown = 60;
var settime = function(that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    })

    countdown--;
  }
  setTimeout(function() {
    settime(that)
  }, 1000)
}

