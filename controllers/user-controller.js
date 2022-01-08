const User = require('../models/User');
const passport = require('passport');

exports.getCurrentUser = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = { ...req.user };
      delete user.password;
      return res.status(200).json(user);
    }
    return res.status(500).send("Not authenticated.");
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true
});

exports.logout = (req, res) => {
  try {
    req.logout();
    return res.status(200).send("Logged out");
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.signup = async (req, res) => {
  try {
    const users = await User.query().where("username", req.body.username);
    if (users && users.length > 0) {
      return res.status(409).send("A user with this username already exists.");
    }
    const user = await User.query().insert(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}