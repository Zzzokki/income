const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  user: mongoose.Schema.Types.ObjectId,
  name: String,
  updatedAt: Date,
  createdAt: Date,
});

module.exports = {
  Category,
};
