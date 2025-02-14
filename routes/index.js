var express = require('express');
var router = express.Router();

const userModel=require("./users");
const postModel=require("./posts");
const passport = require('passport');

const upload=require("./multer");

const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});


router.get('/login', function(req, res, next) {
  res.render('login', {error:req.flash('error')});
});

router.get('/feed', function(req, res, next) {
  res.render('feed', );
});

router.post('/upload', upload.single("file") , async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("no files uploaded");
  }
  const user= await userModel.findOne({username :req.session.passport.user})
  const postdata= await postModel.create({
    image : req.file.filename,
    imagetext : req.body.filecaption,
    user: user._id,  
  }); 
  user.post.push(postdata._id );

  await user.save();
  res.redirect("/profile");
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user=await userModel.findOne({
    username:req.session.passport.user 
  })
  .populate("posts")
res.render("profile",{user})
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
  failureFlash:true, 
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
