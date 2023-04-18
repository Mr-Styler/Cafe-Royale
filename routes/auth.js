const router = require("express").Router();
const AuthController = require("../controllers/auth");

//SIGN UP
router.get("/signup", AuthController.getSignUp)

router.post("/signup", AuthController.postSignUp)

router.get("/login", AuthController.getLogin)

router.post("/login", AuthController.postLogin)

router.get("/me", AuthController.isLoggedIn, AuthController.getProfile);

router.get("/order", AuthController.isLoggedIn, AuthController.getOrder);

router.post("/order", AuthController.isLoggedIn, AuthController.postOrder);

router.get("/checkout", AuthController.isLoggedIn, AuthController.getCheckout);

router.get('/settings', AuthController.isLoggedIn, AuthController.getSettings)

router.patch('/update-me', AuthController.isLoggedIn, AuthController.updateMe)

router.post('/cart/add', AuthController.isLoggedIn, AuthController.addToUserCart)

router.patch("/update-cart",AuthController.isLoggedIn,AuthController.updateCart);

router.get("/logout", AuthController.getLogout)

module.exports = router;