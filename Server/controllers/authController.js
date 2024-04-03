const User = require("../models/user");
var createError = require("http-errors");
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.checkPassword(password)) {
        throw createError(401, "Please check your email and password");
      }
      res.json(user.signJwt());
    })
    .catch(next);
};
exports.register = (req, res, next) => {
  let { name, email, password } = req.body;
  let data = { name, email, password };
  User.create(data)
    .then((user) => {
      res.json(user.signJwt());
      sendNewUser(user);
    })
    .catch(next);
};

const sendNewUser = (user) => {
  let data = ({ name, username, avatar } = user);
  io.emit("new-user", data);
};
