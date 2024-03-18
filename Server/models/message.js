const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the "User" model
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the "User" model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the mongoose model named "Message" based on the schema
const model = mongoose.model("Message", ModelSchema);

// Export the mongoose model
module.exports = model;
