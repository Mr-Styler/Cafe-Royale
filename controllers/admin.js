var Recipe = require("../models/recipe")

exports.getDashboard = (req, res) =>{
    res.render("admin/dashboard", {currentUser: req.user, pageTitle: 'Your Dashboard'})
}

exports.getNewRecipe = (req, res) =>{
    res.render("admin/new", {currentUser: req.user, pageTitle: 'New Recipe'})
}

exports.postNewRecipe = (req, res) =>{
    Recipe.create(req.body.recipe, (err, newRecipes)=>{
        if(err){
            console.log(err)
            res.redirect('/admin/recipes/new')
        } else{
            res.redirect('/admin/recipes/' + newRecipes._id + '/step')
        }
    });   
}

exports.getNewStep = (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe)=>{
        if(err){
            console.log(err)
            res.redirect('/admin/recipes/new')
        } else{
            res.render("admin/step", { recipe: foundRecipe, ID: req.params.id })
        }
    });
}

exports.postNewStep = (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe)=>{
        if(err){
            console.log(err)
            res.redirect('/admin/recipes/step')
        } else{
            foundRecipe.steps.push({
                step: foundRecipe.steps.length + 1,
                title: req.body.title,
                body: req.body.body,
                image: req.body.image,
            });
            foundRecipe.save()

            console.log(req.body.value);
            console.log(foundRecipe.steps);
            if (req.body.value === "Done") {
                res.redirect('/admin/recipes/' + foundRecipe._id + '/nutrient')
            } else if (req.body.value === "Add another step") {                
                res.render("admin/step", { recipe: foundRecipe, ID: req.params.id })
            }
            
        }
    });  
}

exports.getNutrients = (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe)=>{
        if(err){
            console.log(err)
            res.redirect('/admin/recipes/new')
        } else{
            res.render("admin/nutrients", { recipe: foundRecipe , ID: req.params.id})
        }
    });
}

exports.postNutrients = (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe)=>{
        if(err){
            res.redirect("/new")
        } else{           
            foundRecipe.nutrient = req.body.body

            console.log(req.body.body);
            console.log(foundRecipe.nutrient);
            foundRecipe.save()

            res.redirect("/admin/recipes")
        }
    });   
}

exports.getEditRecipe = (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            return res.redirect(`/{req.params.id}/edit`)
        }
        res.render("admin/edit", { recipe: foundRecipe})
    })
}

exports.putEditRecipe = (req, res) =>{
    res.render("admin/edit")
}

exports.getAdminRecipes = (req, res) =>{
    Recipe.find({}, (err, recipes) => {
        if (err) {
            return console.log(err)
        }        
    res.render("admin/recipes", {PageTitle: "recipes", Path: "/admin/recipes", recipes: recipes})
    })
}