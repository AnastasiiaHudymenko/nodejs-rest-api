const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const SECRET_KEY = require("../config");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });

  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const update = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { subscription });

  res.status(200).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  update: ctrlWrapper(update),
};
