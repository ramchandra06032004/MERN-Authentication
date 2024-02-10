const router = require("express").Router();
const { user, validate } = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await user.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const HashPassword = await bcrypt.hash(req.body.password, salt);

    await new user({ ...req.body, password: HashPassword }).save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
