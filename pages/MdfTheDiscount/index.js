// pages/MdfTheDiscount/index.js
var network = require("../../utils/network.js")
var util = require('../../utils/util')
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

function checkDiscount(discount){
	var d = parseFloat(discount);
	if(!isNaN(d)){
		if( d>=0 && d<10 ){
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
		scrHeight: wx.getSystemInfoSync().windowHeight,
		lists: [{}],
		rangeType : "1" ,
		rangeValue: ""
	},



	//点击删除按钮事件
	delItem: function (e) {
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


	
	addList: function () {
		var lists = this.data.lists;
		lists.push('');//实质是添加lists数组内容，使for循环多一次
		this.setData({
			lists: lists
		})
	},
	
	delList: function () {
		var lists = this.data.lists;
		lists.pop();      //实质是删除lists数组内容，使for循环少一次
		this.setData({
			lists: lists
		})
	},   

	addrsInput : function(e){
		var address =  e.detail.value;
		var index = e.currentTarget.dataset.id; 
		var lists = this.data.lists;
		lists[index] = address;
		this.setData({
			'lists': lists
		});
	},
	
	radioChange: function (e) {
		console.log('radio发生change事件，携带value值为：', e.detail.value)
	},

	subjectInput : function(e){
		this.setData({
			subject: e.detail.value
		});
	},
  
	summaryInput : function(e){
		this.setData({
			summary: e.detail.value
		});
	},
  
	chooseServiceType : function(e){
		var selectedIndustryIds = "";
		var serviceTypeList = this.data.serviceTypeList;
		if(serviceTypeList!=null && serviceTypeList.length>0){
			var temp = [];
			for(var i=0;i<serviceTypeList.length;i++){
				temp.push(serviceTypeList[i].id);
			}
			selectedIndustryIds = temp.join(",");
		}
		wx.navigateTo({
			url: '../ScreeningIndustry/index?selectedIndustry=' + selectedIndustryIds + '&type=4&single=true'
		});
	},
  
	selectIndustryResult: function(industryListSelected){
		this.setData({
			"serviceTypeList": industryListSelected
		});
	},
  
	telInput : function(e){
		this.setData({
			tel: e.detail.value
		});
	},
  
	discountInput : function(e){
		this.setData({
			discount: e.detail.value
		});
	},
  
	
  
    headImageUpload : function() {
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
								that.setData({
									headImageUrl: imgUrl
								});
							}else{
								wx.showToast({ title: '请求成功', icon: 'success', duration: 3000 });
							}
						});
				}
			}
		});
	},
    
	detailImageUpload : function(){
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
								var detailImageUrlList = that.data.detailImageUrlList;
								if(!detailImageUrlList){
									detailImageUrlList = [];
								}
								detailImageUrlList.push(imgUrl);
								that.setData({
									detailImageUrlList: detailImageUrlList
								});
							}else{
								wx.showToast({ title: '请求成功', icon: 'success', duration: 3000 });
							}
						});
				}
			}
		});
	},
	
    previewImage: function(e){
		//获取当前图片的下表
		var url = e.currentTarget.dataset.src; 
		//数据源
		var pictures =[];
		pictures.push(url);
		wx.previewImage({
			urls: pictures
		}); 
	},
	
	goAhead : function(){
		var _this = this;
		var param = {};
		
		param.discountId = _this.data.discountId;
		
		if(util.checkText(_this.data.subject,false)){
			param.subject = _this.data.subject;
		}else{
			util.alert('请输入折扣主题');
			return;
		}
		
		if(util.checkText(_this.data.summary,false)){
			param.summary = _this.data.summary;
		}else{
			util.alert('请输入折扣描述');
			return;
		}
		
		if(_this.data.serviceTypeList && _this.data.serviceTypeList.length > 0){
			var temp = [];
			for(var i=0;i<_this.data.serviceTypeList.length;i++){
				temp.push(_this.data.serviceTypeList[i].id);
			}
			param.type = temp.join(",");
		}else{
			util.alert('请选择服务类型');
			return;
		}
		
		if(util.checkTel(_this.data.tel)){
			param.tel = _this.data.tel;
		}else{
			util.alert('请输入正确的联系电话');
			return;
		}
		
		if(checkDiscount(_this.data.discount)){
			param.discount = _this.data.discount + '';
		}else{
			util.alert('请输入正确折扣');
			return;
		}
		
		if(_this.data.rangeType && _this.data.rangeType != ''){
			param.rangeType = _this.data.rangeType;
		}else{
			util.alert('请选择折扣类型');
			return;
		}
		
		if(util.checkText(_this.data.rangeValue,true)){
			param.rangeValue = _this.data.rangeValue;
		}else{
			util.alert('请输入折扣范围值');
			return;
		}
	
	    if(_this.data.lists && _this.data.lists.length>0 ){
			var lists = _this.data.lists;
			param.addrs = lists.join("\n");
		}else{
			util.alert('请输入地址');
			return;
		}
		
		if(_this.data.headImageUrl && _this.data.headImageUrl != ''){
			param.headImageUrl = _this.data.headImageUrl;
		}else{
			util.alert('请选择封面图片');
			return;
		}
		
		if(_this.data.detailImageUrlList && _this.data.detailImageUrlList.length > 0){
			param.detailImageUrlList = JSON.stringify(_this.data.detailImageUrlList);
		}else{
			util.alert('请选择相册图片');
			return;
		}
		network.doPost('editDiscountForMy', param, function(res){
			wx.navigateBack();
		});
	},
	
  
	/**
	* 生命周期函数--监听页面加载
	*/
	onLoad: function (options) {
		var _this = this;
		var discountId = options.discountId;
		_this.setData({
			'discountId':discountId
		});
		var param = {};
		param.discountId = _this.data.discountId;
		network.doPost('getDiscountDetail', param, function(res){
			if(res){
				var address = res.addrList;
				res.lists = address.split("\n");
				
				res.serviceTypeList = [];
				var v = {};
				v.id=res.discountType;
				v.name=res.discountTypeName;
				res.serviceTypeList.push(v);
				
				_this.setData(res);
			}
		});
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
