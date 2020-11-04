const mongoose = require("mongoose");

let RelationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  relations: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

RelationSchema.indexes({ userId: 1 });
// should be disable when creating multiple instaces of server

module.exports = mongoose.model("Relation", RelationSchema);
