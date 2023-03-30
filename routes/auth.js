const router = require("express").Router();
const AuthController = require("../controllers/auth");

//SIGN UP
router.get("/signup", AuthController.getSignUp)

router.post("/signup", AuthController.postSignUp)

router.get("/login", AuthController.getLogin)

router.post("/login", AuthController.postLogin)

router.get('/me', AuthController.isLoggedIn, AuthController.getProfile)

router.get('/settings', AuthController.isLoggedIn, AuthController.getSettings)

router.post('/update-me', AuthController.isLoggedIn, AuthController.updateMe)

router.post('/cart/add', AuthController.isLoggedIn, AuthController.addToUserCart)

router.get("/logout", AuthController.getLogout)

module.exports = router;