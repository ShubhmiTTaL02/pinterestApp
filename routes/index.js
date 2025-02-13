var express = require('express');
var router = express.Router();

const userModel=require("./users");
const postModel=require("./posts");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/createuser', async function(req, res, next) {
 let createduser=await userModel.create({
  username: "shubh",
password: "shubh",
email: "shubh@gmail.com",
fullName: "Shubh Mittal",
posts: []
});
res.send(createduser);
});

router.get('/createpost', async function(req, res, next) {
  let createdpost= await postModel.create({
    postText: "Hello Everyone"
  });
  res.send(createdpost);
});


module.exports = router;
