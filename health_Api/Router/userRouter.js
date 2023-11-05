const express = require("express");
const passport = require("passport")
const cookieSession = require('cookie-session');
const GoogleStrategy = require("passport-google-oauth2").Strategy
const { register, login, verify, reSendOtp, googleRegister, googleLogin, getUser, alluser, sendEmail, optValid, changePassword } = require("../Controller/userController");
const { authToken } = require("../Moddleware/auth");
const { admin } = require("../Moddleware/Admin");
const router = express.Router();

router.post("/register", register);
router.post("/verify/:id", verify);
router.post("/resend", reSendOtp);
router.post("/login", login);
router.post("/googleRegister",googleRegister)
router.get("/getUser", authToken,getUser)
router.get("/alluser",authToken,admin,alluser)
router.post("/sendEmail",sendEmail)
router.post('/validOtp',optValid)
router.post("/changePassword",changePassword)

// router.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   }));
// router.use(passport.initialize());
// router.use(passport.session());
// passport.serializeUser(function(user , done) {
//     done(null , user);
//   })
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });
//   passport.use(new GoogleStrategy({
//     clientID:"285990333399-ma5si219ekbe8ljpskohput76ro03552.apps.googleusercontent.com",
//     clientSecret:"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", 
//     callbackURL:"http://localhost:5000/user/auth/google/callback",
//     passReqToCallback:true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     return done(null, profile);
//   }
//   ));
// router.get('/auth', passport.authenticate('google', {
//     scope:
//         ['profile']
// }));

// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/user/auth/google/callback/success',
//         failureRedirect: '/auth/google/callback/failure'
//     }));

// // Success 
// router.get('/auth/google/callback/success', async (req, res) => {
// console.log(req.user);
//     if (!req.user) {
//        return res.redirect('/auth/google/callback/failure');
//     }
    
//     const name = req.user.name.givenName + " " + req.user.name.familyName
//     res.send("Welcome " + name);
//     console.log(req.user.id);
//     console.log(req.user.getEmail());
//     // res.redirect("http://localhost:3000/")
// });

// // failure
// router.get('/auth/google/callback/failure', (req, res) => {
//     res.status(203).send("Error");
// })

module.exports = router;