const UserModel = require("../../database/models/UserModel");
const { httpResponse } = require("../../utils");
const jwt = require("jwt-simple");

const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    phoneNumber
  } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    return res.json(httpResponse(500, "missing fields", "signup"));
  }
  try {
    const user = await UserModel.findOne({ ["email"]: email });
    if (user)
      return res.json(httpResponse(500, "email already exist", "signup"));
    const newUser = new UserModel({
      first_name: firstname,
      last_name: lastname,
      username,
      email,
      password,
      phone_number: phoneNumber
    });
    await newUser.save();
    return res.json(httpResponse(201));
  } catch (err) {
    return res.json(httpResponse(500, "failed to create user", "signup"));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(httpResponse(500, "missing fields", "login"));
  }
  const dbUser = await UserModel.findOne({
       email,
       password })
  if (!dbUser) {
    return res.json(httpResponse(500, "user not found", "login"));
  }
  const hashedUser = jwt.encode(
    { username: dbUser.username, email: dbUser.email },
    process.env.JWT_SECRET
  );
  res.cookie("JWT_TOKEN", hashedUser, { maxAge: 900000000000, httpOnly: true });
  const user = Object.assign({}, dbUser._doc);
  delete user.password;
  delete user.deleted;
  delete user._id;
  return res.json(httpResponse(200, {user}));
};

const logOut = async (req, res) => {
  res.cookie("JWT_TOKEN", "", { maxAge: 900000000000, httpOnly: true });
  return res.json(httpResponse(200));
};

module.exports = {
  login,
  signup,
  logOut
};