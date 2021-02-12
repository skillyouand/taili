// pages/xinwen/xinwen.js
Page({
  //触摸事件：改变字体颜色
  _handleTap:function(evt){
    let id =evt.currentTarget.id
    this.setData({
      currentIndex:id
    })
  },
/**
* 页面的初始数据
*/
data: {
currentIndex:0,
segmentItem:[
{
  title:"校园新闻"
},
{
  title:"通知公告"
}

]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {

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