const User = require("../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

exports.socket = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    return next(createError(401, "auth_error"));
  }
  jwt.verify(
    socket.handshake.query.token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) return next(createError(401, "auth_error"));
      User.findById(decoded.id)
        .then((user) => {
          if (!user) return next(createError(401, "auth_error"));
          socket.user = user;
          next();
        })
        .catch(next);
    },
  );
};
exports.authenticated = (req, res, next) => {
  let token = req.headers["authorization"];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(createError(401));
    User.findById(decoded.id)
      .then((user) => {
        if (!user) throw createError(401);
        req.user = user;
        next();
      })
      .catch(next);
  });
};
