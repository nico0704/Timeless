const express = require("express");
//const res = require('express/lib/response');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    Test route
// @access  Public

// rout is protected due to auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // gets email and password, writing req.body.name, etc. is no longer needed
    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        // match error response to body, errors array with obj and message
        res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        return;
      }

      // takes plain password from the body and compares it with the password from the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        return;
      }

      const payload = {
        user: {
          id: user.id, // from mongoos _id (_ is not needed)
        },
      };
      // sign the token
      jwt.sign(
        // pass in the payload
        payload,
        // pass in the secret from default.json in config folder
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); // change to 3600 when in production
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
