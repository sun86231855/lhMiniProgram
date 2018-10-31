// pages/phone/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      { id: 1, name: '设置安全信息', isSelected: true, },

    ],

    isGet: false,
    sec: 30,
    phone: '',
    phoneCode: '',
    codeToken: '123',
  },


  //获取用户Phone
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })

    //    console.log("phone:" + phone)
  },

  // get phoneCode
  phoneCodeInput: function (e) {
    this.setData({
      phoneCode: e.detail.value
    })
    //    console.log(phoneCode)
  },

  // register注册
  registerClick() {
    var token = wx.getStorageSync("token");

    /*
    wx.navigateTo({
      url: '../home/index'
    })
    */


    console.log("11111111111111111");


    wx.request({
      url: getApp().data.serverUrl + "/vcc/validate?codeToken="
      + this.data.codeToken + "&code=" + this.data.phoneCode
      + "&subject=" + this.data.phone,
      method: "GET",
      timeout: 15000,
      header: {
        "CTFB-UnionId-Headers": token, "Accept": "application/json"
        , "Content-Type": "application/json"
      },
      data: {
      },
      success: function (res) {
        console.log(res);
        var statusEnum = res.data.statusEnum;
        if (statusEnum == "SUCCESS") {
          console.log(res.data.data);

          // 将当前用户设置为已经绑定手机号的状态
          getApp().globalData.isLogPhone = true;

          wx.showModal({
            title: '成功',
            content: '登录成功',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 5
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 5
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.data.data);
      }
    })
  },



  /*xuanz*/
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.itemList[index];
    item.isSelected = !item.isSelected;
    this.setData({
      itemList: this.data.itemList,
    });
  },

  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },


  getCode() {
    var self = this
    self.setData({ isGet: true })
    var remain = 30;
    var time = setInterval(function () {
      if (remain == 1) {
        clearInterval(time)
        self.setData({
          sec: 30,
          isGet: false
        })
        return false
      }
      remain--;
      self.setData({
        sec: remain
      })
    }, 1000)

    var getCodeData = {
      "size": 4,
      "type": "0",
      "subject": this.data.phone,
      "sendSms": true
    };

    //调用 app.js里的 post()方法
    getApp().post(getApp().data.serverUrl + "/vcc/code", getCodeData).then((res) => {
      console.log(res);//正确返回结果

      var statusEnum = res.data.statusEnum;
      console.log(res);

      if (statusEnum == "SUCCESS") {
        wx.showToast({
          title: res.data.data,
          icon: 'success',
          duration: 2000
        })
        self.data.codeToken = res.data.data;
        console.log(self.data.codeToken);
      }
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
    });

    /*
      // request server to send code
      wx.request({
        url: getApp().data.serverUrl + "/vcc/code",
        method: "POST",
        timeout: 15000,
        data: {
          "size": 4,
          "type": "0",
          "subject": this.data.phone,
          "sendSms": true
        },
        success: function (res) {
          var statusEnum = res.data.statusEnum;
          console.log(res);
  
          if (statusEnum == "SUCCESS") {
            wx.showToast({
              title: res.data.data,
              icon: 'success',
              duration: 2000
            })
  
            self.data.codeToken = res.data.data;
            console.log(self.data.codeToken);
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
  */
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //安全信息
  SecurityInformation: function (e) {
    wx.navigateTo({
      url: '../SecurityInformation/index'
    })
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

