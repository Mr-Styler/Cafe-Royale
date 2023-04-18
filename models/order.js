let mongoose = require("mongoose");
let orderSchema = new mongoose.Schema(
  {
    username: String,
    company_name: String,
    address: String,
    zip_code: Number,
    phone: Number,
    email: String,
    payment_method: String,
    additional_info: String,
    cart: Object,
    status: {
      type: String,
      enum: ['delivered', 'pending', 'cancelled'],
      default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
