const User = require("../models/userModel");
const createToken = require("../helpers/createToken");

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id);

    res.status(201).json({
      email,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.logIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signUpUser, logInUser };
