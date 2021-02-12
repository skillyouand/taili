// miniprogram/pages/kebiao/kebiao.js
const app = getApp();
let timetableItems = [];
Page({

  data: {
    cardView:{},
    dayList:[],//存放本周的日期
    courseTime:[],//每天上课时间
    year:"",
    month:"",
    day:"",//今天的日期
    firstDay:"",//本月第一天
    lastDay:"",//本月最后一天
    weekOfYear:0,//本年的第几周
    weekNow:0,//？
    dayOfWeek:0,//星期几
    tab0: "日",
    tab1: "周",
    currentTab: 1, //0是日课程表，1是周课程表
    show: false,
    dayTab: 0,
    weekList: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],//选择第几周时间
    //周程表
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 4, "kcm": "高等数学啊实打实大大说阿大声道亚特兰蒂斯号", "jsbh": "A301", "color": 0 },
      { "xqj": 1, "skjc": 5, "skcd": 3, "kcm": "高等数学", "jsbh": "A-302", "color": 0 },
      { "xqj": 2, "skjc": 1, "skcd": 3, "kcm": "高等数学啊实打实大大说阿大声道", "jsbh": "A303", "color": 1 },
      { "xqj": 2, "skjc": 8, "skcd": 2, "kcm": "计算机应用技术", "jsbh": "A304", "color": 1 },
      { "xqj": 3, "skjc": 3, "skcd": 2, "kcm": "高等数学", "jsbh": "A305", "color": 2 },
      { "xqj": 3, "skjc": 8, "skcd": 2, "kcm": "高等数学", "jsbh": "A306", "color": 2 },
      { "xqj": 3, "skjc": 5, "skcd": 2, "kcm": "高等数学", "jsbh": "A307", "color": 0 },
      { "xqj": 4, "skjc": 2, "skcd": 3, "kcm": "高等数学", "jsbh": "A308", "color": 1 },
      { "xqj": 4, "skjc": 8, "skcd": 2, "kcm": "高等数学", "jsbh": "A309", "color": 2 },
      { "xqj": 5, "skjc": 1, "skcd": 2, "kcm": "高等数学", "jsbh": "A310", "color": 1 },
      { "xqj": 6, "skjc": 3, "skcd": 2, "kcm": "高等数学", "jsbh": "A311", "color": 2 },
      { "xqj": 7, "skjc": 5, "skcd": 3, "kcm": "高等数学", "jsbh": "", "color": 0 },
    ],
    daylist: [
      { "jcxx": "第1,2节次 08:00~09:45", "kcm": "大学英语", "skls": "陈江", "jsbh": "教A520", "kkyx": "外语学院", "xsrs": "88", "skbj": "外语系521", "type": "0" },
      { "jcxx": "第3,4节次 10:15~11:45", "kcm": "天然药物炮制实验", "skls": "黄雪峰", "jsbh": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": "1" },
      { "jcxx": "第5,6节次 10:15~11:45", "kcm": "生物化学", "skls": "黄雪峰", "jsbh": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": "1"},
      { "jcxx": "第7,8节次 16:00~18:00", "kcm": "药物经济学", "skls": "黄雪峰", "jsbh": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": "1" },
      { "jcxx": "第9,10节次 19:00~21:00", "kcm": "药物经济学", "skls": "黄雪峰", "jsbh": "教A104", "kkyx": "中药学院", "xsrs": "70", "skbj": "中药制药1702501", "type": "1" },
    ]
  },
  //与时间有关的
  getDate:function(){
    var dayList=[];
    var courseTime=[];
    var mydate = new Date();
    var year =mydate.getFullYear();
    var month =mydate.getMonth()+1;
    var months = month+1;
    var dayOfWeek = mydate.getDay();
    if (dayOfWeek == 0) {
      dayOfWeek = 7;
    }
    var year = mydate.getFullYear();
    var day=mydate.getDate();
    var fist = new Date(year,month,1);
    var firstDay = fist.getDate();
    var last = new Date(year,month,0);
    var lastDay = last.getDate();
    if (month < 5 || month > 9) {
      courseTime =[
        '8:00',
        '8:55',
        '10:10',
        '11:05',
        '14:00',
        '14:55',
        '16:10',
        '17:05',
        '19:00',
        '19:55',
        '20:50',
      ]
    } else {
      courseTime = [
        '8:00',
        '8:55',
        '10:10',
        '11:05',
        '14:30',
        '15:25',
        '16:40',
        '17:35',
        '19:30',
        '20:25',
        '21:20',
      ]
    }
    var c_time=mydate.getTime();//获得当前时间的时间戳
    var oneDayLong=24*60*60*1000;//获得一天时间的ms
    var MondayTime=c_time-(dayOfWeek-1)*oneDayLong;//获得本周周一的时间戳
    var Monday_Time =new Date(MondayTime);
    var Monday=Monday_Time.getDate();//获得周一的日期
      for( var i=0;i<7;i++)
      {
         dayList[i]=Monday++;
      }
    this.setData({
      year:year,
      month:month,
      dayOfWeek:dayOfWeek,
      day:day,
      firstDay:firstDay,
      lastDay:lastDay,
      courseTime:courseTime,
      dayList:dayList
    })
    },
  //计算现在是星期几
  handleData: function () {
    // 星期几
    let dayOfWeek = new Date().getDay();
    if (dayOfWeek == 0) {
      dayOfWeek = 7;
    }
  },
  handleMoreData: function (data, week) {
    let  weekOfYear = Math.floor(
      ( new Date().getTime() - new Date('2020-09-01 00:00:00:00').getTime()) /
         (24 * 3600 * 1000 *7) );
   this.setData({
     weekOfYear: weekOfYear,
     weekNow: weekOfYear,
   });
  },
  clickHide: function (e) {
    var that = this
    that.setData({
      show: false
    })
  },
  clickShow: function (e) {
    var that = this;
    that.setData({
      show: !that.data.show,
    })
  },
  swichNav: function (e) {
    this.clickHide();
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.currentTarget.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log(e);
    var self = this
    self.setData({
      dayTab: e.detail.current,
    })
  },
  stopTouchMove: function () {
    return false;
  },
  dayCheck: function (e) {
    var that = this;
    if (that.data.dayTab === e.currentTarget.dataset.daytab) {
      return false;
    } else {
      that.setData({
        dayTab: e.currentTarget.dataset.daytab,
      })
    }
  },
  //周列表中点击课程显示框内容
  showCardView:function(e){
    console.log(e);
    let cardView = {
      kcm: e.currentTarget.dataset.wlist.kcm,
      color: e.currentTarget.dataset.wlist.color,
      jsbh: e.currentTarget.dataset.wlist.jsbh,
    }
    //课程号，课程名，学分，教师，周次，上课地点
    wx.showModal({
      title:'课程信息',
      content:'课程号：'+cardView.kcm+'\n'+'课程名：'+cardView.kcm+'\n'+
              '学分：\n'+'教师：\n'+'周次：\n'+'教室：'+cardView.jsbh+'\n\t',
      cancelColor: 'cancelColor',
      showCancel:false,
      confirmText:'关闭'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleData();
    this.getDate();

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