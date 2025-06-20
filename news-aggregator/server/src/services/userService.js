// server/src/services/userService.js
const bcrypt = require("bcryptjs");
const userRepo = require("../repositories/userRepository");

const signup = async ({ firstname, lastname, email, password, role }) => {

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) throw new Error("Email already registered");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { firstname, lastname, email, password: hashedPassword, role };
  return await userRepo.createUser(user);
};

const login = async ({ email, password }) => {

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");
  return user;
};

module.exports = { signup, login };
