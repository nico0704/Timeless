const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const { check, validationResult } = require("express-validator");
const upload = require("../../middleware/upload");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users timeline
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("age", "Age is required").not().isEmpty(),
      check("bio", "Bio is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { age, bio, youtube, twitter, facebook, linkedin, instagram } =
      req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (age) profileFields.age = age;
    if (bio) profileFields.bio = bio;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users posts
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/experience
// @desc    Add profile experience
// @access  Private

router.post(
  "/experience",
  upload.single("image"),
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, date, location, description, tag } = req.body;
    let image = undefined;
    if (req.file) {
      image = req.file.path;
    }
    const newExp = { title, date, location, description, tag, image };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const newExpDateInMs = new Date(newExp.date).getTime();

      // @todo implement a better search algorithm

      if (
        //length check has to be checked first otherwise programm will throw an error
        // because experience[0] is not defined
        profile.experience.length == 0 ||
        newExpDateInMs > profile.experience[0].date.getTime()
      ) {
        profile.experience.unshift(newExp);
      } else {
        let curDateInMs = 0;
        let index = 0;
        for (var i = 1; i < profile.experience.length; i++) {
          curDateInMs = new Date(profile.experience[i].date).getTime();
          if (newExpDateInMs < curDateInMs) {
            index = i;
          }
        }
        index++;
        profile.experience.splice(index, 0, newExp);
      }

      // save profile
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile/experience/:exp_id
// @desc    GET single profile experience
// @access  Private

router.get(
  "/experience/:exp_id",
  auth,
  checkObjectId("exp_id"),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }

      let ind = -1;
      for (var i = 0; i < profile.experience.length; i++) {
        let curId = profile.experience[i]._id.toString();
        if (curId == req.params.exp_id) {
          ind = i;
          break;
        }
      }
      // no index in experience array was found that matches req.params.exp_id
      if (ind == -1) {
        return res.status(400).json({ msg: "Experience not found" });
      }

      let exp = profile.experience[ind];
      if (!exp) {
        return res.status(400).json({ msg: "Experience not found" });
      }
      res.json(exp);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/profile/experience
// @desc    Edit profile experience
// @access  Private
// @todo    Implement image functionality

router.put(
  "/experience/:exp_id",
  [
    auth,
    checkObjectId("exp_id"),
    [
      check("title", "Title is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "No profile found" });
      }
      let ind = -1;
      for (var i = 0; i < profile.experience.length; i++) {
        let curId = profile.experience[i]._id.toString();
        console.log(curId);
        if (curId == req.params.exp_id) {
          ind = i;
          break;
        }
      }
      // implement function to search for the correct place in object experience
      if (ind == -1) {
        return res.status(400).json({ msg: "Experience not found" });
      }
      const { title, date, location, description } = req.body;

      if (title) profile.experience[ind].title = title;
      if (date) profile.experience[ind].date = date;
      if (location) profile.experience[ind].location = location;
      if (description) profile.experience[ind].description = description;

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    let ind = -1;
    for (var i = 0; i < profile.experience.length; i++) {
      let curId = profile.experience[i]._id.toString();
      if (curId == req.params.exp_id) {
        ind = i;
        break;
      }
    }
    if (ind == -1) {
      return res.status(400).json({ msg: "Experience not found" });
    }
    // delete exp
    profile.experience.splice(ind, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @todo implement limit for uploads folder
