const router = require("express").router();
const { user } = require("../model/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    const user = await user.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid email address or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "Invalid email address or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).send({ data: token, message: "Login successful" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
});

const validate = (data) => {
  const Schema = joi.object({
    email: joi.string().required().email().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return Schema.validate(data);
};
