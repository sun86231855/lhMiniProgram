
// var serverUrl = "http://192.168.51.206:8080/lh/api";
 var serverUrl = "https://www.sybpm.com/lh/api";
// var serverUrl = "http://127.0.0.1:8080/lh/api";

var util = require("util.js");

// 从服务端获取token
function getToken() {
  wx.login({
    success: function (res) {
      console.log("get token 了");
      if (res.code) {
        var param = {};
        param.code = res.code;
        //发起网络请求
        wx.request({
          url: serverUrl + '/login',
          data: param,
          method: "POST",
          timeout: 15000,
          success: function (result) {
            console.log("获取到的新token:");
            console.log(result);
            var res = result.data.body;
            if (res) {
              wx.setStorageSync('token', res.token);
              wx.setStorageSync('openId', res.openId);
              //重新发起请求
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
    }
  });
}

// 向服务器发起Post请求
function doPostRequest(method, param, success, fail, complete) {
  var that = this;
  var token = wx.getStorageSync('token');
  var openId = wx.getStorageSync('openId');
  console.log("method===" + method);
  console.log(param);  console.log("do post with token in doPostRequest:" + token);

  wx.request({
    url: serverUrl + '/' + method,
    data: param,
    method: "POST",
    timeout: 15000,
    header: {
      'token': token,
      'requestId': token + Date.now()
    },
    success: function (result) {
      console.log("2");
      console.log(result);
      util.stopLoading();
      var header = result.data.header;
      // 如果当前token已经失效
	  if(header.code == "200"){
		if (success && typeof success == 'function') {
          success(result.data.body);
        } else {
          wx.showToast({
            title: '操作成功！'
          });
        }
	  }else if(header.code == "400"){
      if (header.msg =='selectClassList:the system have no class info'){
        util.alert("当前社群无班级");
      }else{
        util.alert("页面有数据项未填写！");

      }
	  }else if(header.code == "403"){
	//	util.alert("缺失登陆权限！");
		that.getToken();
        that.doPostRequest(method, param, success, fail);
	  }else if(header.code == "405"){
		util.alert("用户无权限操作该业务！");
	  }else{
		util.alert("系统错误，请联系管理员！" + header.code + '|' + header.msg);  
	  }
    },
    fail: function (res) {
      console.log(res);
      util.stopLoading();      if (fail && typeof fail == 'function') {
        fail(res);
      } else {
        wx.showToast({
          title: '操作失败!',
          image: "../../images/smsb1.png"
        
        });
      }
    },
	complete : function(){
	  wx.hideNavigationBarLoading();
      if (complete && typeof complete == 'function') {
        complete();
      }
	}
  });
}

// 暴露的接口，用Post请求调用，目前系统内所有请求均为Post
function doPost(method, param, success, fail,complete) {
  var that = this;
//  wx.showNavigationBarLoading();

  console.log("向后台发起请求:" + method);
  console.log("向后台发起请求:");

  console.log(param);

  util.startLoading();


  that.doPostRequest(method, param, success, fail, complete);

  /*
  wx.checkSession(
    {
      success: function () {
        console.log("session success");
        var token = wx.getStorageSync('token');

        console.log("chekc session token:" + token);
        // 本地存储的token为空，移除该token，并且从服务端重新获取
        if (null == token || "" == token) {

          try {
            wx.removeStorageSync('token')
          } catch (e) {
            // Do something when catch error
          }
          console.log("reget new token because token null");


          wx.login({
            success: function (res) {
              console.log("get token code ");
              if (res.code) {
                var param = {};
                param.code = res.code;
                //发起网络请求
                wx.request({
                  url: serverUrl + '/login',
                  data: param,
                  method: "POST",
                  timeout: 15000,
                  success: function (result) {
                    console.log("获取到的新token:");
                    console.log(result);
                    var res = result.data.body;
                    if (res) {
                      wx.setStorageSync('token', res.token);
                      wx.setStorageSync('openId', res.openId);
                      //重新发起请求

                      that.doPostRequest(method, param, success, fail, complete);

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
            }
          });


//          that.getToken();
//          that.doPostRequest(method, param, success, fail, complete);
        }
        else {
          that.doPostRequest(method, param, success, fail, complete);
	      console.log("do post with token:" + token);      
          }
      },
      fail: function () {
        try {
//          wx.removeStorageSync('token')
        } catch (e) {
          // Do something when catch error
        }

        console.log("check session failied, reget token");




        wx.login({
          success: function (res) {
            console.log("get token code ");
            if (res.code) {
              var param = {};
              param.code = res.code;
              //发起网络请求
              wx.request({
                url: serverUrl + '/login',
                data: param,
                method: "POST",
                timeout: 15000,
                success: function (result) {
                  console.log("获取到的新token:");
                  console.log(result);
                  var res = result.data.body;
                  if (res) {
                    wx.setStorageSync('token', res.token);
                    wx.setStorageSync('openId', res.openId);
                    //重新发起请求

                    that.doPostRequest(method, param, success, fail, complete);

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
          }
        });


//        that.getToken();
//        that.doPostRequest(method, param, success, fail, complete);
      }
    })
    */
}



module.exports = {
  doPost: doPost,
  getToken: getToken,
  doPostRequest: doPostRequest
}