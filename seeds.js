var mongoose = require("mongoose")
var Recipe = require("./models/recipe")

var seedDB = ()=>{
    Recipe.remove({}, (err)=>{
        if(err){
            console.log(err)
        }
        console.log("recipes cleared")
    })
}

module.exports = seedDB