var express = require('express');
var router = express.Router();

const userModel=require("./users");
const postModel=require("./posts");
const passport = require('passport');
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});


router.get('/login', function(req, res, next) {
  res.render('login', );
});

router.get('/feed', function(req, res, next) {
  res.render('feed', );
});


router.get('/profile', isLoggedIn, function(req, res, next) {
res.send("profile")
});

router.get('/alluserposts', async function(req, res, next) {
  let user=await userModel.findOne({_id:"865298v27vhfdgv"}).populate(posts);
  res.send(user);
});

router.post("/register", function(req,res){
  const {username,email,fullname}=req.body;
  const userData =new userModel({username,email,fullname});

  userModel.register(userData, req.body.password).then(function(){
    passport.authenticate("local")(req,res, function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/",
}), function(req,res){
})

router.get("/logout",function(req,res){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect('/login'); // Redirect to login or home page
    });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");

}



module.exports = router;
