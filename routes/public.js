const router = require("express").Router();
var publicController = require("../controllers/public");
var AuthController = require("../controllers/auth");

router.get("/", publicController.getIndex)

router.get("/recipes", publicController.getRecipes)

router.get("/shop", publicController.getShop)

router.get("/recipe/:id", publicController.getShowRecipe)

router.get("/recipe/:id/comment", AuthController.isLoggedIn, publicController.getComment)

router.post("/recipe/:id/comment", AuthController.isLoggedIn, publicController.postComment)

module.exports = router