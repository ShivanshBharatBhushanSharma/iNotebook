const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a vaild email").isEmail(),
    body("password", "Password must be atleast 5 charcters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    // Without async await and before refactoring #46
    // User.create({
    //   name: req.body.name,
    //   password: req.body.password,
    //   email: req.body.email,
    // })
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({
    //       error: "Please enter a unique value for email",
    //       message: err.message,
    //     });
    //   });

    // before validation how we create user
    // const user = User(req.body);
    // user.save();
    // res.json(user);
  }
);

module.exports = router;
