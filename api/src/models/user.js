const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  relations: [
    {
      user: mongoose.Schema.Types.ObjectId,
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.indexes({ name: 1 });
// should be diable while creating multiple instances of server

module.exports = mongoose.model("User", UserSchema);
