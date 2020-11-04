const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
});

UserSchema.indexes({ name: 1 });
// should be diable while creating multiple instances of server

module.exports = mongoose.model("User", UserSchema);
