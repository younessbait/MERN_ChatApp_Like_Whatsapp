const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 60,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    maxlength: 40,
  },
  avatar: String,
});

// Define a virtual property 'id'
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Set the toJSON option to include virtuals in the JSON output
UserSchema.set("toJSON", { virtuals: true });

// methods
UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

UserSchema.methods.getData = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    about: this.about,
    avatar: this.avatar,
  };
};

UserSchema.methods.signJwt = function () {
  let data = this.getData();
  data.jwtToken = jwt.sign(data, process.env.JWT_SECRET);
  return data;
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Create the mongoose model named "User" based on the schema
const User = mongoose.model("User", UserSchema);

// Export the mongoose model
module.exports = User;
