// server/src/models/user.js
class User {
  constructor(user_id, firstname, lastname, email, password, role) {
    this.user_id = user_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
module.exports = User;
