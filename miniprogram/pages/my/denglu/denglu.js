// pages/denglu/denglu.js
const db =wx.cloud.database();//初始化数据库
var app = getApp()
Page({
  //点击登录按钮
  _handlersubmit:function(evt){
    console.log(evt);
    this.setData({
      isTip:this.data.password.length == 0,
      isTip1:this.data.account.length == 0
    })
    //判断密码是否为空
    if(this.data.isTip){
      wx.showToast({
        icon:"none",
        title:"密码不能为空"
      })
      }
    else if(this.data.isTip1)
    {
      wx.showToast({
        icon:"none",
        title:"账号不能为空"
      })
    }
    else{
      if(evt.detail.value.agree[0]==1){}
      else
       {
        wx.showToast({
          icon:"none",
          title:"请先同意《用户协议》"
        })
      }
    }

  },
  //实时映射账号的输入
  _handleAccountInput:function(evt){
    let accountV=evt.detail.value;
    this.setData({
      account : accountV
    })

  },
  //实时映射密码的输入
  _handlePasswordInput:function(evt){
    let passwordV=evt.detail.value;
    this.setData({
      password:passwordV
    })
  },
      //选择学校
   bindPickerChange: function(e) {
        this.setData({
          value : e.detail.value
        })
    },
   //打开用户协议事件
   openUserAgreement(){
    wx.showModal({
      title: '用户协议',
      content:"现在还没有",
      showCancel:false,
      confirmText:"关闭"
    })
   } ,
//获取用户信息
bindgetuserinfo(evt){
  let userInfo =evt.detail.userInfo;
  if(!this.data.logged && userInfo)
  {
    //云插入操作
    let that = this;
    db.collection('users').add({
      data:{
          userPhoto:userInfo.avatarUrl,
          nickName:userInfo.nickName,
          account:that.data.accountV,
          phoneNumber:"",
          wxinxiNumber:"",
          time: new Date()
      }
    }).then(res=>{
      db.collection('users').doc(res._id).get().then((res)=>
      {
        console.log(res);
        app.userInfo =Object.assign(app.userInfo,res.data);
        this.setData({
          userImage:res.data.userPhoto,
          username : res.data.nickName,
          logged:true
        })
      });
    });
  }
}, 
 //页面数据初始化
  data: {
    account:"",
    password:"",
    isTip:false,//密码是否为空标志位
    logged:false,//判断是否为第一次登录
    logged1:false,//判断是否获取用户微信信息
    isTip1:false,//账号是否为空标志位
    array: ['太原理工大学', '中北大学', '巴西', '日本'],
    value:"0",//学校索引 0太理 1中北。。。
    userImage:"../../../images/未登录头象.png",
    userName:"",
    showUserAgreement:false //是否同意用户协议
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'login',
      data:{}
    }).then((res)=>{
      db.collection('users').where({
        _openid:res.result.openid
      }).get().then((res)=>{
        if(res.data.length){
          app.userInfo =Object.assign(app.userInfo,res.data[0])
          this.setData({
            userName  : app.userInfo.nickName,
            userImage : app.userInfo.userPhoto
          });
        }
      }); 
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