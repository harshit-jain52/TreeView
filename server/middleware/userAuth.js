const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants/env");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Authorization token is invalid" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Request is not authorized" });
  }
};

module.exports = userAuth;
