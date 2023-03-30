const router = require("express").Router();
let AuthController = require("./../controllers/auth")
let AdminController = require("../controllers/admin");

router.use( AuthController.isLoggedIn, AuthController.restrictTo(['admin']))

router.get("/dashboard", AdminController.getDashboard)

router.get("/recipes", AdminController.getAdminRecipes)

router.get("/recipes/new", AdminController.getNewRecipe)

router.post("/recipes/new", AdminController.postNewRecipe)

router.get("/recipes/:id/step", AdminController.getNewStep)

router.post("/recipes/:id/step", AdminController.postNewStep)

router.get("/recipes/:id/nutrient", AdminController.getNutrients)

router.post("/recipes/:id/nutrient", AdminController.postNutrients)

router.get("/recipes/:id/edit", AdminController.getEditRecipe)

router.put("/recipes/:id/edit", AdminController.putEditRecipe)

module.exports = router