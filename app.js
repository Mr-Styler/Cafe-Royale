const bodyParser = require('body-parser')
const express = require('express')
const errorController = require("./controllers/404");
const app = express()
const Recipe = require("./models/recipe")
const authRoute = require('./routes/auth')
const publicRoute = require('./routes/public')
const adminRoute = require('./routes/admin')
const passport = require("passport");
const request = require('request')
const seedDB     = require("./seeds");
const fileUpload = require('./utils/FileUpload');
const AppError = require('./utils/AppError');


// seedDB()
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());

app.use(require("express-session")({
    secret: "this is a Cookbook",
    resave: false,
    saveUninitialized: false
}))

app.use(fileUpload.uploadImages)
app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", adminRoute);
app.use(authRoute);
app.use(publicRoute);

// ROUTES



app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe)=>{
        if(err){
            res.redirect('/recipes')
        } else{
            console.log(updatedRecipe)
            res.redirect('/recipes/' + req.params.id)
        }
    })
})

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});

app.use(errorController)

module.exports = app;