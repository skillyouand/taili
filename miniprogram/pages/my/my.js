//list.js
const db =wx.cloud.database();//初始化数据库
var app = getApp()
Page({

  data: {
    logged:false,
    userInfo:{}

  },
  to_report_card0:function(){
    wx.navigateTo({
      url: './denglu/denglu',
    })
  },
  to_report_card1:function(){
    wx.navigateTo({
      url: '',
    })
  },
  to_report_card2:function(){
    wx.navigateTo({
      url: '',
    })
  },
  to_report_card3:function(){
    wx.navigateTo({
      url: './banbenxinxi/banbenxinxi',
    })
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
            username  : app.userInfo.nickName,
            userImage : app.userInfo.userPhoto,
            logged :true,
            disabled:true
          });
        }
        else{
          disabled:false
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

