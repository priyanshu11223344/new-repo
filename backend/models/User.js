const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// Ensure indexes are created
UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
