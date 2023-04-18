let mongoose = require("mongoose");
let tableBookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    time: Date,
    num_of_people: String,
    table_no: Number,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableBooking", tableBookingSchema);
