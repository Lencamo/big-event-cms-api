const userModel = {
  selectUserInfo:
    'select id, username, nickname, email, user_pic from ev_users where id=?', // 为了防止用户的密码泄露，需要排除 password 字段
  updateUserInfo: 'update ev_users set ? where id=?',
  checkByID: 'select * from ev_users where id=?',
  updatePassword: 'update ev_users set password=? where id=?',
  updateAvatar: 'update ev_users set user_pic=? where id=?'
}

module.exports = userModel
