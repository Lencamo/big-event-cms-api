const userModel = {
  checkByUsername: 'select * from ev_users where username = ?',
  addUser: 'insert into ev_users set ?'
}

module.exports = userModel
