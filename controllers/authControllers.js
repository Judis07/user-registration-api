const User = require("../models/User");

const jwt = require("jsonwebtoken");

// web token

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "user registration api", {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  console.log("calling");
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    console.log({ user });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: { id: user._id, email, token } });
  } catch (err) {
    // const errors = handleErrors(err);
    res.status(400).json({ error: err.message });
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: { id: user._id, email, token } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
