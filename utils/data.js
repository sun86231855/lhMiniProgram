
// var cosPath ="https://123-1256884206.cos.ap-chengdu.myqcloud.com/";
var cosPath = "https://sysykj-1257940010.cos.ap-chengdu.myqcloud.com/";
/**
 * banner数据
 */ 
function getBannerData(){
  var arr = [cosPath + 'banner_01.png', cosPath + 'banner_02.png', cosPath + 'banner_03.png', cosPath +'banner_04.png']
    return arr
}



/*
 * 首页 navnav 数据
 */
function getBusinessNavData() {
  var arr = [
    {
      id: 1,
    
      title: "班级"
    },
    // {
    //   id: 2,
    //   eng: "TOURIST",
    //   title: "圈子"
    // },
    // {
    //   id: 3,
    //   eng: "CIRCLE",
    //   title: "亲友团"
    // },
    {
      id: 4,
    
      title: "机构"
    }

  ]
  return arr
}
/*
 * 首页 对应 标签 数据项
 */
function getBusinessNavSectionData() {
  var arr = [
    [
      {

        subject: "明德社区高级",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {

        subject: "明德社区高级...",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {

        subject: "明德社区高级",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {

        subject: "明德社区高级",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {

        subject: "明德社区高级",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {

        subject: " 明德社区高级",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [
      {
        artype: '明德社区高级',
        subject: "秋季自然特价美甲",
        coverpath: "../../images/avatar.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [
      {
        artype: '明德社区高级',
        subject: "爱丽克EircParisSalon",
        coverpath: "../../images/recommend_img_03.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {
        artype: '明德社区高级',
        subject: " 画对了妆，微微一笑颜值倍儿高！",
        coverpath: "../../images/recommend_img_06.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [

      {
        artype: '明德社区高级',
        subject: "伊本造型",
        coverpath: "../../images/recommend_img_05.png",
        price: '¥1588',
        message: '某公司CEO。'
      }
    ],
    [
      {
        artype: '明德社区高级',
        subject: "伊本造型",
        coverpath: "../../images/recommend_img_02.png",
        price: '¥1888',
        message: '某公司CEO。'
      }
    ]
  ]
  return arr
}


/*
 * 商机 navnav 数据
 */
function getBusinessNavData() {
  var arr = [
    {
      id: 1,
      eng: "CLASS222",
      title: "找公司"
    },
    {
      id: 2,
      eng: "TOURIST",
      title: "找专家"
    },
    {
      id: 3,
      eng: "CIRCLE",
      title: "找合作"
    },
    {
      id: 4,
      eng: "TERRACE",
      title: "找折扣"
    }

  ]
  return arr
}


/*
 * 商机 对应 标签 数据项
 */
function getBusinessNavSectionData() {
  var arr = [
    [
      {
        Company: 'AAA科技有限公司...',
        Industry: "明德社区高级11",
        coverpath: "../../images/sja.jpg", 
        message: '某公司CEO'
      },
      {
        Company: 'AAA科技有限公司...',
        Industry: "明德社区高级...",
        coverpath: "../../images/sjb.jpg",
        message: '某公司CEO'
      },
      {
        Company: 'AAA科技有限公司...',
        Industry: "明德社区高级",
        coverpath: "../../images/sja.jpg",
        message: '某公司CEO'
      },
      {
        Company: 'AAA科技有限公司...',
        Industry: "明德社区高级",
        coverpath: "../../images/sjb.jpg",
        message: '某公司CEO'
      },
      {
        Company: 'AAA科技有限公司...',
        Industry: "明德社区高级",
        coverpath: "../../images/sja.jpg",
        message: '某公司CEO'
      },
      {
        Company: 'AAA科技有限公司...',
        Industry: " 明德社区高级",
        coverpath: "../../images/sja.jpg",
        message: '某公司CEO'
      }
    ],
    [
      {
        artype: '李经理',
        Industry: "rgert",
        coverpath: "../../images/recommend_img_01.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [
      {
        Industry: "sfde",
        artype: '合作',
       
        coverpath: "../../images/recommend_img_01.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {
        artype: '合作',
        Industry: " sfsd",
        coverpath: "../../images/recommend_img_01.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [

      {
        artype: '合作',
        Industry: "sg",
        coverpath: "../../images/sja.jpg",
        price: '¥1588',
        message: '某公司CEO。'
      }
    ],
    [
      {
        artype: '合作',
        Industry: "伊本造型",
        coverpath: "../../images/sja.jpg",
        price: '¥1888',
        message: '某公司CEO。'
      }
    ]
  ]
  return arr
}

/*
 * 商机 navnav 数据
 */
function getctxqNavData() {
  var arr = [
    {
      id: 1,
      eng: "CLASS222",
      title: "撮团介绍"
    },
    {
      id: 2,
      eng: "TOURIST",
      title: "玩法介绍"
    }

  ]
  return arr
}


/*
 * 撮团详情 对应 标签 数据项
 */
function getctxqNavSectionData() {
  var arr = [
    [
      {
       
        people: '发起人： AAA科技有限公司',
        Industry: "介绍：明德社区高级11",
        price: '撮团价格：某公司CEO',
        number: '成团标准人数：10',
        datea: '限制人数：8',
        dateb: '撮团截止时间：2018.12.12'
      }
    ],
    [
      {
        Industry: "返利折扣：20%",
        datea: '报名参团：8人',
        dateb: '固定折扣：30%'
     
      }
    ]
  ]
  return arr
}

/*
 * 首页 navnav 数据
 */
function getIndexNavData() {
  var arr = [
    {
      id: 1,
      title: "班级"
    },
    // {
    //   id: 2,
    //   eng: "TOURIST",
    //   title: "圈子"
    // },
    // {
    //   id: 3,
    //   eng: "FRIENDS",
    //   title: "亲友团"
    // },
    {
      id: 4,
      title: "机构"
    }

  ]
  return arr
}

/*
 * 首页 对应 标签 数据项
 */ 
function getIndexNavSectionData(){
    var arr = [
                [
                    {
                        
                        subject:"明德社区高级",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    },
                    {
                        
                      subject:"明德社区高级...",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    },
                    {
                        
                      subject:"明德社区高级",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    },
                    {
                        
                      subject:"明德社区高级",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    },
                    {

                      subject: "明德社区高级",
                      coverpath: "../../images/avatar.png",
                      name: 'kimmyY...',
                      message: '某公司CEO'
                    },
                    {
                        
                      subject:" 明德社区高级",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    }
                ],
                [
                    {
                    artype:'明德社区高级',
                        subject:"秋季自然特价美甲",
                        coverpath:"../../images/avatar.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    }
                ],
                [
                    {
                    artype:'明德社区高级',
                        subject:"爱丽克EircParisSalon",
                        coverpath:"../../images/recommend_img_03.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    },
                    {
                      artype:'明德社区高级',
                        subject:" 画对了妆，微微一笑颜值倍儿高！",
                        coverpath:"../../images/recommend_img_06.png",
                        name:'kimmyY...',
                        message:'某公司CEO'
                    }
                ],
                [
                    
                    {
                    artype:'明德社区高级',
                        subject:"伊本造型",
                        coverpath:"../../images/recommend_img_05.png",
                        price:'¥1588',
                        message:'某公司CEO。'
                    }
                ],
                [
                    {
                    artype:'明德社区高级',
                    subject:"伊本造型",
                        coverpath:"../../images/recommend_img_02.png",
                        price:'¥1888',
                        message:'某公司CEO。'
                    }
                ] 
            ]
    return arr
}

/*
 * 撮团 navnav 数据
 */
function getCTNavData() {
 
  var arr = [
    {
      id: 1,
      img: "../../images/ct_icoa.png",
      title: "企业家课程"
    },
    {
      id: 2,
      img: "../../images/ct_icob.png",
      title: "企业服务"
    },
    {
      id: 3,
      img: "../../images/ct_icoc.png",
      title: "生活日用"
    },
    {
      id: 4,
      img: "../../images/ct_icod.png",
      title: "其他"
    }

  ]
  return arr
}

/*
 * 撮团 对应 标签 数据项
 */
function getCTNavSectionData() {
  var arr = [
    [
      {

      
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车',
        number:'4',
        button:'我要撮团'
      },
      {

    
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车',
        number: '4',
        button: '我要撮团'
      },
      {

      
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车',
        number: '4',
        button: '我要撮团'
      },
      {

      
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车',
        number: '4',
        button: '我要撮团'
      },
      {

   
        coverpath: "../../images/CT_PICB.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车',
        number: '4',
        button: '我要撮团'
      },
      {

   
        coverpath: "../../images/CT_PICB.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。',
        number: '4',
        button: '我要撮团'
      }
    ],
    [
      {
        artype: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。紧接着车辆保有量的不断增加和城市停车场配套的滞后将智能停车程',
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。',
        number: '4',
        button: '我要撮团'
      }
    ],
    [
      {
        artype: '瞄准互联网+ 开辟行业全新征程',
        coverpath: "../../images/CT_PIC.jpg",
        name: '瞄准互联网+ 开辟行业全新征程',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。',
        number: '4',
        button: '我要撮团'
      },
      {
        artype: '明德社区高级',
        coverpath: "../../images/CT_PIC.jpg",
        name: 'kimmyY...',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。',
        number: '4',
        button: '我要撮团'
      }
    ],
    [

      {
        artype: '明德社区高级',
        Introduction: "伊本造型",
        coverpath: "../../images/CT_PIC.jpg",
        price: '¥1588',
        message: '随着我国经济的不断提升，汽车这只旧时王谢堂前燕逐渐飞入了寻常百姓人家。',
        number: '4',
        button: '我要撮团'
      }
    ],
    [
      {
        artype: '明德社区高级',
        Introduction: "伊本造型",
        coverpath: "../../images/CT_PIC.jpg",
        price: '¥1888',
        message: '某公司CEO。',
        number: '4',
        button: '我要撮团'
      }
    ]
  ]
  return arr
}



/*
 * 修炼 navnav 数据
 */
function getxlNavData() {
  var arr = [
    {
      id: "1",
      img: "/images/xla.png",
      title: "信息化咨询"
    },
    {
      id: "2",
      img: "/images/xlb.png",
      title: "商业模式设计"
    },
    {
      id: "3",
      img: "/images/xlc.png",
      title: "企业管理咨询"
    },
    {
      id: "4",
      img: "/images/xld.jpg",
      title: "投融资咨询"
    }

  ]
  return arr
}

/*
 * 修炼 对应 标签 数据项
 */
function getxlNavSectionData() {
  var arr = [
    [
      {
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time: '2018.5.12',
        message: '大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱'
      },
      {

        
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time:'2018.5.12',
        message: '大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱'
      },
      {

      
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time: '2018.5.12',
        message: '大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱...'
      },
      {

       
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time: '2018.5.12',
        message: '大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱...'
      },
      {

        
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time: '2018.5.12',
        message: '大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱...'
      },
      {

        
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        time: '2018.5.12',
        message: '	大众理财的时代来临了,最近总能听见一个问题:什么理财产品收益高风加多险小啊?我陷入了深深的思索, 我们都知道, 凡是问这话的人都是有一定闲钱'
      }
    ],
    [
      {
        artype: '明德社区高级',
       
        coverpath: "../../images/avatar.png",
        name: '什么理财产品收益高风险小',
        message: '某公司CEO'
      }
    ],
    [
      {
        artype: '明德社区高级',
      
        coverpath: "../../images/recommend_img_03.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      },
      {
        artype: '明德社区高级',
        coverpath: "../../images/recommend_img_06.png",
        name: 'kimmyY...',
        message: '某公司CEO'
      }
    ],
    [

      {
        artype: '明德社区高级',
        subject: "明德社区高级",
        coverpath: "../../images/recommend_img_05.png",
        price: '¥1588',
        message: '某公司CEO。'
      }
    ],
    [
      {
        artype: '明德社区高级',
        subject: "明德社区高级",
        coverpath: "../../images/recommend_img_02.png",
        price: '¥1888',
        message: '某公司CEO。'
      }
    ]
  ]
  return arr
}

/**
 *sss 数据
 * */ 
function getSkilledData(){
    var arr = [
                {
                        company:"明德社区高级",
                        avatar:"../../images/skilledt_img_01.png",
                        nickname:'张',
                        price:'¥500',
                        message:'明德社区高级',
                        distance:'100m'
                    },
                    {
                      company:"明德社区高级",
                        avatar:"../../images/skilledt_img_02.png",
                        nickname:'ww',
                        price:'¥800',
                        message:'明德社区高级',
                        distance:'200m'
                    },
                    {
                      company:"明德社区高级",
                        avatar:"../../images/skilledt_img_03.png",
                        nickname:'f',
                        price:'¥600',
                        message:'明德社区高级',
                        distance:'100m'
                    },
                    {
                      company:"明德社区高级",
                        avatar:"../../images/skilledt_img_04.png",
                        nickname:'ff',
                        price:'¥800',
                        message:'明德社区高级',
                        distance:'400m'
                    }
            ]
    return arr
}

/**
 * 选择器 数据
 */ 
function getPickerData(){
    var arr =[
        {
            name:'张三',
            phone:'13812314563',
            province:'北京',
            city:'北京',
            addr:'朝阳区望京悠乐汇A座8011'
        },
        {
            name:'李四',
            phone:'13812314563',
            province:'北京市',
            city:'北京市',
            addr:'朝阳区望京悠乐汇A座4020'
        }
    ]
    return  arr
}
/**
 * 查询 地址
 * */ 
var user_data = userData()
function searchAddrFromAddrs(addrid){
    var result
    for(let i=0;i<user_data.addrs.length;i++){
        var addr = user_data.addrs[i]
        console.log(addr)
        if(addr.addrid == addrid){
            result = addr
        }
    }
    return result || {}
}
/**
 * 用户数据
 * */ 
function userData(){
    var arr = {
                uid:'1',
                username:'哇咔咔DLL',
                phone:'13833337998',
                avatar:'../../images/avatar.png',
                addrs:[
                   {
                        addrid:'1',
                        name:'张三',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座8011'
                    },
                    {
                        addrid:'2',
                        name:'李四',
                        phone:'13812314563',
                        province:'北京',
                        city:'直辖市',
                        addr:'朝阳区望京悠乐汇A座4020'
                    } 
                ]
            }
    return arr
}
/**
 * 省
 * */ 
function provinceData(){
    var arr = [
        // {pid:1,pzip:'110000',pname:'北京市'},
        // {pid:2,pzip:'120000',pname:'天津市'}
        '请选择省份','福建省'
    ]
    return arr
}
/**
 * 市
 * */ 
function cityData(){
    var arr = [
        // {cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
        // {cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
        '请选择城市','福州市','厦门市','宁德市'
    ]
    return arr
}



/*
 * 对外暴露接口
 */ 
module.exports = {
  getBannerData : getBannerData,
  getIndexNavData : getIndexNavData,
  getxlNavData: getxlNavData,
  getCTNavData: getCTNavData,
  getBusinessNavData: getBusinessNavData,
  getctxqNavData: getctxqNavData,
  getctxqNavSectionData: getctxqNavSectionData,
  getIndexNavSectionData : getIndexNavSectionData,
  getxlNavSectionData: getxlNavSectionData,
  getCTNavSectionData: getCTNavSectionData,
  getBusinessNavSectionData: getBusinessNavSectionData,
  getPickerData : getPickerData,
  getSkilledData :getSkilledData,
  userData : userData,
  provinceData : provinceData,
  cityData : cityData,
  searchAddrFromAddrs : searchAddrFromAddrs

}


