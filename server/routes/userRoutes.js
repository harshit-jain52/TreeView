const express = require("express");
const router = express.Router();
const { signUpUser, logInUser } = require("../controllers/userController");
const userAuth  = require("../middleware/userAuth");

router.post("/signup", signUpUser);
router.post("/login", logInUser);

router.get("/auth", userAuth, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

module.exports = router;
