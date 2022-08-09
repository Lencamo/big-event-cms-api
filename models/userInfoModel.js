const userModel = {
  selectUserInfo:
    'select id, username, nickname, email, user_pic from ev_users where id=?' // 为了防止用户的密码泄露，需要排除 password 字段
}

module.exports = userModel
