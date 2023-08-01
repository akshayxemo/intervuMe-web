const mongoose = require("mongoose");

const onlineSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
      require: true,
      default: "Offline",
    },
  },
  {
    timestamps: true,
  }
);

const Online = mongoose.model("Online", onlineSchema);
module.exports = Online;
