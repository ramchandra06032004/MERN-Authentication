const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPrivateKey, {
    expiresIn: "7d",
  });
};

const user = mongoose.model("user", userSchema);

const validate = (data) => {
  const Schema = joi.object({
    firstName: joi.string().required().label("first Name"),
    lastName: joi.string().required().label("last Name"),
    email: joi.string().required().email().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = { user, validate };
