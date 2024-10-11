const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (email, password) {
  if (!validator.isEmail(email) || !/@interiittechsel\.in$/.test(email)) {
    throw new Error("Invalid email");
  }
  let exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = this.create({
    email,
    password: hashedPassword,
  });
  return user;
};

userSchema.statics.logIn = async function (email, password) {
  if (!email || !password) throw new Error("Enter email and password");

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
