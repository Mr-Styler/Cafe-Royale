const { promisify } = require('util');
const User = require("../models/user")
const Order = require("../models/order")
const passport = require("passport");
const localStrategy = require("passport-local");
const AppError = require("./../utils/AppError");


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", { currentUser: req.user})
}

exports.postSignUp = (req, res) => {
    const { username, email, password } = req.body
    let userObj = {
        username,
        email
    }
    let newUser = new User(userObj)
    User.register(newUser, password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("auth/signup", { currentUser: req.user})
        }
        
        passport.authenticate("local")(req, res, () => {
            res.redirect("/login")
        })
    })
}

exports.authenticatingUser = passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect:'/login'
});

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {currentUser: req.user, errorMsg: undefined })
}

exports.postLogin = async (req, res, next) => {
    try {
        const { username } = req.body;

        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            console.log('No user!')
            return res.status(422).render("auth/login", {
                currentUser: req.user,
                Path: "/login",
                PageTitle: "Login",
                errorMsg: "This account doesn't exist",
            });
        }

        passport.authenticate("local", function(err, user) {
            if (!user) {
                console.log('no auth user');
                return res.status(422).render("auth/login", { currentUser: req.user, Path: '/login', PageTitle: 'Login', errorMsg: 'Wrong credentials...' });
            }
            console.log('found user.')
        })(req, res);

        passport.authenticate("local")(req, res, () => {
            return res.redirect("/")
        })
    } catch (err) {
        console.log(err);
    }

    
}

exports.getLogout = (req, res, next) => {
    req.logout()
    res.redirect("/login")
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect("/login")
}

exports.restrictTo = (roles) => {
    return (req, res, next) => {
        console.log(roles)
        if(!roles.includes(req.user.role)) {
            return next(new AppError(`Sorry ${req.user.role}s are not allowed.`))
        };
        next();
    }
}

exports.getProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('cart.items.productId');

    res.status(200).render('auth/profile', { currentUser: user })
}

exports.getOrder = async (req, res, next) => {
    res.render('auth/order', { currentUser: req.user})
}

exports.postOrder = async (req, res, next) => {
    console.log(req.body);
    const { username, company_name, country, house_address, settlement, state, zip_code, phone, email, additional_info, payment_method } = req.body;
    let address = `${settlement} ${house_address}, ${state}, ${country}`
    const user = await User.findById(req.user._id).populate("cart.items.productId");
    const cart = user.cart;

    const order = await new Order({ username, company_name, address, zip_code, phone, email, additional_info, cart, payment_method, user: user._id });
    order.save();
    res.render("auth/order", { currentUser: req.user });
};

exports.getCheckout = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("cart.items.productId");

  res.render("auth/checkout", { currentUser: user });
};

exports.getSettings = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).render('auth/settings', { currentUser: user });
        
    } catch (err) {
        
    }
}

exports.updateMe = async (req, res, next) => {
    const {username, email} = req.body;
    if (req.file) req.body.image = req.file.filename;
    const imagePath = req.files.image[0].path;

    const image = imagePath.split('public\\')[1];

    console.log(image)

    const userObj = {
        username,
        email,
        image
    }

    if (!image) {
        return res.status(422).render("auth/settings", { PageTitle: 'Upload', currentUser: req.user, errorMsg: 'Attached file is not an image.'})
    }


    const updatedUser = await User.findByIdAndUpdate(req.user._id, userObj, {
        new: true, runValidators: true });

    console.log(updatedUser)
    res.status(200).send('You have successfully updated your profile.');

}

exports.addToUserCart = async (req, res, next) => {
    const {productId} = req.body
    const user = await User.findById(req.user._id);
    user.addToCart(productId);
    user.save()
}

exports.updateCart = async (req, res, next) => {
    let cartObj = req.body
    let user = await User.findById(req.user._id);
    user.updateCart(cartObj);
    user.save()
    res.status(200).send("You have successfully updated your cart.");
}