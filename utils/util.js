
function startLoading() {


  /*
  wx.showToast({
    title: "加载中",
    icon: 'loading',
    image: "../../images/loading.gif",
    duration: 5000
  });
  */

  wx.showLoading({
    title: '加载中',
    mask: true
  })

  setTimeout(function () {
    wx.hideLoading()
  }, 5000)

}

function stopLoading() {
  wx.hideLoading()
//  wx.hideToast();
}


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 转换地址数据
 * */ 
function replacePhone(arr,isreplace){
  var newAddr =[]
  for(let i = 0 ; i < arr.length; i++){
    if(isreplace){
      let phone = arr[i].phone
      arr[i].phone = phone.replace(phone.substring(3,7),'****')
    }
    newAddr[i] = arr[i].name + ' ' + arr[i].phone + '\n' + arr[i].province + arr[i].city + arr[i].addr
  }
  
  return newAddr
}

function alert(msg){
	wx.showModal({
		title: '提示',
		content: msg,
		showCancel : false
	});
}

function checkText(text,  blank,  length ){
	if(text==null){
		return false;
	}
	if(!blank && text.trim()==''){
		return false;
	}
	
	if(length){
		var len = 0;
		for (var i = 0; i < text.length; i++) {
			var a = text.charAt(i);
			if (a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
			}else {
				len += 1;
			}
		}
		return len <= length;
	}
    return true;
}

function checkTel(tel){
   var mobile = /^\d{6,11}$/;
   return mobile.test(tel);
}


module.exports = {
  formatTime: formatTime,
  replacePhone : replacePhone,
  startLoading: startLoading,
  stopLoading: stopLoading,
  alert : alert,
  checkText : checkText,
  checkTel : checkTel
}

