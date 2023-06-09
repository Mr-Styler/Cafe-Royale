let mongoose = require('mongoose')
let passportLocalMongoose = require("passport-local-mongoose")

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'chef'],
        default: 'user'
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            },
            quantity: {type:Number, default: 1},
        }],
        total: {
            type: Number,
            default: 0
        }
    },
    
},
    { timestamps: true },
)

userSchema.methods.addToCart = function (productId) {
    this.cart.items.push({productId});
    console.log(`added product with id: ${productId} to cart.`);
    return 0;
}

userSchema.methods.updateCart = function (updatedCart) {
    this.cart = updatedCart;
    return 0;
}

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)