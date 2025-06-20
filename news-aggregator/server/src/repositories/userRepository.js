// server/src/repositories/userRepository.js
const db = require("../config/db");

const createUser = async (user) => {

  const [result] = await db.query("INSERT INTO USERS (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)", [
      user.firstname,
      user.lastname,
      user.email,
      user.password,
      user.role,
    ]);
  return result.insertId;
};

const findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM USERS WHERE email = ?", [email]);
  return rows[0];
};

module.exports = { createUser, findByEmail };
