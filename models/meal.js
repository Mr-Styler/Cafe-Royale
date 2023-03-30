let mongoose = require('mongoose')
let mealSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
},
    { timestamps: true },
)

module.exports = mongoose.model("Meal", mealSchema)