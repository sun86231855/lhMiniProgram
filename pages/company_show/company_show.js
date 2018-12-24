//company_show.js
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
    industry:['行业1','行业2','行业3','行业3','行业4','行业5'],
    profession:['CEO总裁','COO首席运营官','副总裁','合伙人','投资者'],
    flag1:false,
    flag2:true,
    flaga: false,
    flagb: true,
    index:'',
    industryName:'',
    professionName:'',
    industryId: '',
    professionId: '',
    imageList: [],
    countIndex: 3,//最多上传图片的数量
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    imageUrlList:[]

  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      flag1: true,
      flag2: false,
      indexd: e.detail.value,
      industryName:""

    });
  }, 

  professionSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      flaga: true,
      flagb: false,
      indexdC: e.detail.value,
      professionName:""

    });
  }, 


  

  
	/**
	* 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		this.query();
	},
  onShow:function(e){
    var _this = this;
    network.doPost('selectBusinessIndustry', { 'type': "1"}, function (res) {
      if (res && res.industryList) {
        console.log(res);
        var industry = new Array();
        var industryIdList = new Array();
        // var industryId = '';
        for (let i = 0; i < res.industryList.length; i++){
          industry[i] = (res.industryList[i].name);
          industryIdList[i] = (res.industryList[i].id);
        }
        _this.setData({
          industry: industry,
          industryIdList: industryIdList
        });
      }
    });
    network.doPost('getProfessionForMyCommpany', {}, function (res) {
      if (res && res.professionList) {
        console.log(res.professionList);
        var profession = [];
        var professionIdList = [];
        for (let i = 0; i < res.professionList.length ; i++){
          profession[i] = res.professionList[i].name;
          professionIdList[i] = res.professionList[i].id;
        }
        _this.setData({
          profession: profession,
          professionIdList: professionIdList
        });
      }
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    var that = this
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var imageUrlList = that.data.imageUrlList;
    //移除列表中下标为index的项
    imageUrlList.splice(index, 1);
    //更新列表的状态
    that.setData({
      imageUrlList: imageUrlList
    });
    // wx.showModal({
    //   title: '提示',
    //   content: '是否删除？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       //获取列表中要删除项的下标
    //       var index = e.target.dataset.index;
    //       var imageUrlList = that.data.imageUrlList;
    //       //移除列表中下标为index的项
    //       imageUrlList.splice(index, 1);
    //       //更新列表的状态
    //       that.setData({
    //         imageUrlList: imageUrlList
    //       });
    //     } else {
    //       initdata(that)
    //     }
    //   }
    // })

  },

  
	query(){
		var _this = this;
		var param = {};
		network.doPost('getCompanyForMy', param, function (res) {
      var industryName = res.industryName;
      var professionName = res.professionName;
      var industryId = res.industryId;
      var professionId = res.professionId;
      console.log(res.industryName+"+++++++`+`+`+`+`")
			if(res){
				_this.setData(res);
        _this.setData({
          industryName: industryName,
          professionName: professionName,
          industryId: industryId,
          professionId: professionId
        })
			}
		});
	},
  
	save(){
		var _this = this;
		var param = {};
		param.companyId = _this.data.companyId;
		if(util.checkText(_this.data.companyName,false)){
			param.companyName = _this.data.companyName;
		}else{
			util.alert('请输入公司名称');
			return;
		}
    if (_this.data.indexd && _this.data.industryIdList[_this.data.indexd]){
      param.industryId = _this.data.industryIdList[_this.data.indexd];
		}else{
      if (_this.data.industryName == ''){
			util.alert('请选择行业');
			return;
      } else {
        param.industryId = _this.data.industryId;
      }
		}
		if(util.checkText(_this.data.summary,false)){
			param.summary = _this.data.summary;
		}else{
			util.alert('请输入简介');
			return;
		}
		if(util.checkTel(_this.data.tel)){
			param.tel = _this.data.tel;
		}else{
			util.alert('请输入正确的电话');
			return;
		}
    if (_this.data.indexdC && _this.data.professionIdList[_this.data.indexdC]){
      param.professionId = _this.data.professionIdList[_this.data.indexdC];
		}else{
      if (_this.data.professionName==''){
        console.log(_this.data.professionName)
			util.alert('请选择职位');
			return;
      }else{
        param.professionId = _this.data.professionId;
      }
		}
		if(_this.data.imageUrlList && _this.data.imageUrlList.length!=0){
			var list = _this.data.imageUrlList;
		    param.imageUrlList = JSON.stringify(list);
		}else{
			util.alert('请选择图片');
			return;
		}
		network.doPost('updateCompanyForMy', param, function (res) {
			wx.navigateBack();
		});
	},
  
	inputCompanyName(e){
		var companyName = e.detail.value;
		this.setData({
			'companyName':companyName
		}); 
	},
  
	inputSummary(e){
		var summary = e.detail.value;
		this.setData({
			'summary':summary
		}); 
	},
  
	inputTel(e){
		var tel = e.detail.value;
		this.setData({
			'tel':tel
		}); 
	},
  
    checkIndustryShow(e) {
		var _this = this;
		var selectedId = _this.data.industryId;
		wx.navigateTo({
			url: '../need/need?selectedId=' + selectedId+"&type='1'"
		})
	},
  
	checkIndustryResult(data){
		console.log(data);
		this.setData({
			industryId:data.id,
			industryName:data.name
		});
	},
    
	checkPostionShow(e) {
		var _this = this;
		var professionId = _this.data.professionId;
		wx.navigateTo({
			url: '../position_select/selector?selectedId='+professionId
		});
	},
  
	checkPostionResult(data){
		console.log(data);
		this.setData({
			professionId:data.id,
			professionName:data.name
		});
	},
	
	picUpload() {
		var that = this;
    var baseUrl = "https://sysykj-1257940010.cos.ap-chengdu.myqcloud.com/";
		var imgUrl="";
		// 选择文件
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				if(!(res && res.tempFilePaths)){
					return;
				}
				for(var i=0;i<res.tempFilePaths.length;i++){
					var filePath = res.tempFilePaths[i];
					var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
					var imgUrl = baseUrl + Key;//图片的获取路径
					cos.postObject({
						Bucket: config.Bucket,
						Region: config.Region,
						Key: Key,
						FilePath: filePath,
						onProgress: function (info) {
							// console.log(JSON.stringify(info));
						}},
						function (err, data) {
							if(!err){
								var imageUrlList = that.data.imageUrlList;
								if(!imageUrlList){
									imageUrlList = [];
								}
								imageUrlList.push(imgUrl);
								that.setData({
									imageUrlList: imageUrlList
								});
							}else{
								wx.showToast({ title: '请求成功', icon: 'success', duration: 3000 });
							}
						});
				}
			}
		});
	},

  // 跳转至详情页
  cutPic: function(e) {
    console.log(e.currentTarget.dataset.aid);
    wx.navigateTo({
      url: '../CutPic/index'
    })
  },

	
	previewImage: function(e){
		//获取当前图片的下表
		var index = parseInt(e.currentTarget.dataset.index);
		//数据源
		var pictures = this.data.imageUrlList;
		wx.previewImage({
			//当前显示下表
			current: pictures[index],
			//数据源
			urls: pictures
		});
	}
})
