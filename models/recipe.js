var mongoose = require('mongoose')
var recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    steps: [
        {
            step: { type: Number, default: 1},
            title: String,
            body: String,
            image: String
        }
    ],
    nutrient: Array
},
    { timestamps: true },
)

module.exports = mongoose.model("Recipe", recipeSchema)