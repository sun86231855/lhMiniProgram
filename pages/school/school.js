//school.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')
var network = require("../../utils/network.js")

Page({
  switch1Checked: function(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  switch2Change: function(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  // 页面初始数据
  data: {
    ifTaiChecked:true,
    flagchoose: false,
    flag1: false,
    flag2: true,
    flaga: false,
    flagb: true,
    selectData: [],
    selectIdData:[],
    selectedCommunityId: '',
    selectClassData:[],
    selectClassIdData:[],
    selectedClassId:'',
    classList: [],
    index: 0, //选择的下拉列表下标
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    items: [{
        name: '../students/students',
        value: '学员',
        checked: 'true'
      },
      {
        name: '../platform/platform',
        value: '机构'
      },
    ],
    choose: '../students/students',
    communityList: [],
    
  },

  listenerPickerSelected: function(e) {
    var _this = this;
    var selectedCommunityId = this.data.selectIdData[e.detail.value];
    this.setData({
      flag1: true,
      flag2: false,
      indexd: e.detail.value,
      selectedCommunityId: selectedCommunityId
    });
    console.log(this.data.selectedCommunityId);
    var param = {};
    param.associationId = this.data.selectedCommunityId;
    network.doPost('selectClassList', param, function (res) {
      if (res && res.classList) {
        // console.log(res.classList);
        // console.log(res.classList);
        // console.log(res.classList);
        // console.log(res.classList);
        var selectClassData = [];
        var selectClassIdData = [];
        for(let i = 0 ;i<res.classList.length ;i++){
          selectClassData.push(res.classList[i].className);
          selectClassIdData.push(res.classList[i].classId);
        }
        _this.setData({
          classList: res.classList,
          selectClassData: selectClassData,
          selectClassIdData: selectClassIdData
        });
      }
    });
  },

  classListSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    var selectedClassId = this.data.selectClassIdData[e.detail.value];
    this.setData({
      flaga: true,
      flagb: false,
      indexdC: e.detail.value,
      selectedClassId: selectedClassId,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var param = {};
    network.doPost('getCommunityListForCollegeCertification', param, function(res) {
      if (res && res.communityList) {
        
        var selectData = [];
        var selectIdData = [];
        for (let i = 0; i < res.communityList.length; i++){
          selectData.push(res.communityList[i].communityName);
          selectIdData.push(res.communityList[i].communityId);
        }
        _this.setData({
          communityList: res.communityList,
          selectData: selectData,
          selectIdData: selectIdData
        });
      }
    });
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Index)
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      choose: e.detail.value
    });
    //console.log(this.data.choose)
    if (this.data.choose == '../platform/platform') {
      console.log(111)
      this.setData({
        flagchoose: true
      });

      console.log(112)
    } else if (this.data.choose == '../students/students') {
      console.log(222)

      this.setData({
        flagchoose: false
      });
      console.log(223)
    }



  },
  switch1Change:function(e){
    var that = this;
    this.setData({
      ifTaiChecked: !that.data.ifTaiChecked
    })
  },
  inputRemark:function(e){
    console.log(e.detail.value);
    this.setData({
      remark: e.detail.value
    })
  },
  changeName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  submit:function(e){
    var d = this.data;
    var param = {};
    param.type = '1';
    if (this.data.choose == '../students/students'){
      param.type = '1';
    }else{
      param.type = '2';
    }
    if (this.data.ifTaiChecked){
      param.ifTai = '1';
    }else{
      param.ifTai = '0';
    }
    console.log(param.type);
    param.communityId = d.selectedCommunityId;
    if (!d.selectedCommunityId){
      return false;
    }

    param.classId = this.data.selectedClassId;
    param.name = this.data.name;
    network.doPost('insertAssociationAuthentication', param, function (res) {
      wx.showModal({
        title: '通知',
        content: '您的认证已经提交到后台进行审核会在1-3个工作日内完成审核  谢谢',
        showCancel: false, //不显示取消按钮
        confirmText: '确定',
        success: function () {
          wx.navigateBack();
        }
      });
    });
  },
  // 跳转至学生或平台页
  next: function(e) {
    var index = this.data.index;
    if (this.data.communityList.length > 0) {
      var communityId = this.data.communityList[index].communityId
      wx.redirectTo({
        url: this.data.choose + '?communityId=' + communityId
      })
    }

  }
})