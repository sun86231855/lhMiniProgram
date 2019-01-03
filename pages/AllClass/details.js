// pages/AllClass/details.js
const app = getApp();
var network = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: "",
    currItemId: "",
    curIndex: "",
    associationId: "",
    assoIndex: "",
    flag:true
  },
  /*xuanz*/
  itemSelected: function(e) {
    console.log(this.data);

    // for (var i = 0; i < this.data.itemList.length; i++) {
    //   this.data.itemList[i].isSelected = false;
    // }
    var index = e.currentTarget.dataset.index;
    var item = this.data.itemList[index];
    item.isSelected = !item.isSelected;
    //item.isSelected = true;
    //var currItemId  =  this.data.currItemId;
    //if (currItemId != null && currItemId != '') {
    //  currItemId += ',' + item.id;
    // } else {
    //  currItemId +=   item.id;
    // }
    var currItemId = '';
    for (var i = 0; i < this.data.itemList.length; i++) {
      if (this.data.itemList[i].isSelected) {
        currItemId += this.data.itemList[i].id + ',';
      }
    }
    if (currItemId != null && currItemId.length > 0) {
      currItemId = currItemId.substring(0, currItemId.length - 1);
    }
    this.setData({
      itemList: this.data.itemList,
      currItemId: currItemId
    });
    
    chackFlag(this);
  },


  doSelectAll:function(){
    var currItemId = '';
    for (var i = 0; i < this.data.itemList.length; i++) {
      this.data.itemList[i].isSelected = true;
      currItemId += this.data.itemList[i].id + ','; 
    }
    if (currItemId != null && currItemId.length > 0) {
      currItemId = currItemId.substring(0, currItemId.length - 1);
    }
    this.setData({
      itemList: this.data.itemList,
      currItemId: currItemId
    });
    chackFlag(this);
  },


  doSelectNo: function () {
    var currItemId = '';
    for (var i = 0; i < this.data.itemList.length; i++) {
      this.data.itemList[i].isSelected = false;
    }
    
    this.setData({
      itemList: this.data.itemList,
      currItemId: currItemId
    });
    chackFlag(this);
  },


  chooseCatalog: function(data) {
    var that = this;
    that.setData({ //把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })


  },

  /*xuanzend*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("666666666666666===" + options.associationId);
    var paramClass = {
      "associationId": options.associationId
    };
    var curIndex = options.curIndex;
    var defaultName = options.defaultName;
    var aa = defaultName.split(",");
    that.setData({
      curIndex: curIndex,
      currItemId: "",
      associationId: options.associationId,
      assoIndex: options.assoIndex,
      defaultName: aa
    });
    if (curIndex == 0) {
      //获取班级列表
      network.doPost('selectClassList', paramClass, function(res) {
        var classList = res.classList;
        var defaultName = that.data.defaultName;
        console.log("777777===" + defaultName);
        var currItemId1 = "";
        if (classList) {
          for (var i = 0; i < classList.length; i++) {
            var flag = false;
            w:for (var j = 0; j < defaultName.length;j++){
              if (classList[i].name == defaultName[j]){
                if (!currItemId1){
                  currItemId1 += classList[i].id;
                }else{
                  currItemId1 += "," + classList[i].id
                }
                
                flag=true;
                break w;
              }
            }
            classList[i].isSelected = flag;
          }
        }
        that.setData({
          itemList: classList,
          currItemId: currItemId1
        });
        chackFlag(that);
      });
      
    } else if (curIndex == 1) {
      //获取班级列表selectCirclesList
      network.doPost('selectCirclesList', paramClass, function(res) {
        var classList = res.circlesList;
        var defaultName = that.data.defaultName;
        var currItemId1 = "";
        if (classList) {
          for (var i = 0; i < classList.length; i++) {
            var flag = false;
            w: for (var j = 0; j < defaultName.length; j++) {
              if (classList[i].name == defaultName[j]) {
                if (!currItemId1) {
                  currItemId1 += classList[i].id;
                } else {
                  currItemId1 += "," + classList[i].id
                }
                flag = true;
                break w;
              }
            }
            classList[i].isSelected = flag;
          }
        }
        that.setData({
          itemList: classList,
          currItemId: currItemId1
        });
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

  },

  doConfirm: function() {
    var selectedClassId = this.data.currItemId;
    // console.log(selectedClassId);
    // console.log(selectedClassId);
    // console.log(selectedClassId);
    // console.log(selectedClassId);
    // console.log(selectedClassId);
    var curIndex = this.data.curIndex;
    if (curIndex == 0) {
      wx.reLaunch({
        url: '../index/index?classId=' + selectedClassId + '&returnType=' + curIndex + '&associationId=' + this.data.associationId + '&assoIndex=' + this.data.assoIndex
      });
    } else if (curIndex == 1) {
      wx.reLaunch({
        url: '../index/index?circlesId=' + selectedClassId + '&returnType=' + curIndex + '&associationId=' + this.data.associationId + '&assoIndex=' + this.data.assoIndex
      });
    }
  }

  
})

function chackFlag(that) {
  console.log("777777===chackFlag");
  var currItemId = that.data.currItemId;
  var itemList = that.data.itemList;
  var itemNum = itemList.length;
  var currItemNum = currItemId.split(',').length;
  if (itemNum == currItemNum){
    that.setData({
      flag: true
    });
  }else{
    that.setData({
      flag: false
    });
  }
}