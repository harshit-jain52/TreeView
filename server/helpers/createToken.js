const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants/env");

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET_KEY, { expiresIn: "2d" });
};

module.exports = createToken;
