let mongoose = require("mongoose");
let partySchema = new mongoose.Schema(
  {
    host: String,
    partyType: {
        type: String,
        enum: ['private, birthday, custom']
        },
    budget: Number,
    time: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", partySchema);
