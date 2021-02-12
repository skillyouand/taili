// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'student-message-5gh5uvip2efb6a12'
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("users").add();
}