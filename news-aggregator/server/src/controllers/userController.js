// server/src/controllers/userController.js
const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    console.log(" 3 controller ki vajah se dimag khrb hora");
    const { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userId = await userService.signup({ firstname, lastname, email, password, role });
    res.status(201).json({ message: "Signup successful", userId });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    console.log(" 3 hi from controller");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await userService.login({ email, password });
    res.status(200).json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, login };
