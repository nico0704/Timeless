const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  age: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
      },
      location: {
        type: String,
      },
      description: {
        type: String,
      },
      tag: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
