const mongoose = require("../database");

const StadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  totalPlays: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Stadium = mongoose.model("Stadiums", StadiumSchema);

StadiumSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});

module.exports = Stadium;
