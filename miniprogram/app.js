//app.js
App({
  onLaunch: function () {
       wx.cloud.init({
         env: 'student-message-5gh5uvip2efb6a12',
        traceUser: true,
      })

    this.userInfo = {},
    this.globalData = {}
  }
})
