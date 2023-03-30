
const Recipe = require("../models/recipe")
const Comment = require("../models/comment")
const Meal = require("../models/meal")
const mongoose = require("mongoose")
const User = require("../models/user")

exports.getIndex = (req, res) => {
    res.render('public/index', {currentUser: req.user})
}

exports.getShop = async (req, res, next) => {
    const user = await User.findById(req.user).populate('cart.items.productId');
    if (user) console.log(user.cart.items);

    Meal.find({}, (err, foundMeals) => {
        if (err) {
            return console.log(err)
        }
    res.status(200).render('public/shop', {currentUser: user, meals: foundMeals})
    })
}

exports.getRecipes = (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
            return console.log(err)
        }
        res.render('public/recipes', { currentUser: req.user, PageTitle: "Recipes", Path: "/recipes", recipes: recipes })
    })
}

exports.getComment = (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
            return console.log(err)
        }
        res.render('public/comment', { PageTitle: "Recipes", Path: "/recipes", recipe: recipe })
    })
}

exports.postComment = (req, res) =>{
    Comment.create({
        author: req.user.username,
        body: req.body.comment,
    }, (err, comment) => {
        if (err) {
            return console.log(err)
        }
        console.log("created Recipe", comment)
       res.redirect("/recipes")
    } );
    
}

exports.getShowRecipe = (req, res) => {
    Recipe.findById(req.params.id, (err, recipe)=> {
        if(err) {
            console.log(err)
        } else {
            res.render('public/show', { currentUser: req.user, recipe: recipe}) 
        }
    })
}
