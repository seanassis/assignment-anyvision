const auth = require("express").Router();
const authController = require("./auth.controller");

auth.post("/login", authController.login);
auth.post("/signup", authController.signup);
auth.post("/logOut", authController.logOut);

module.exports = auth;
