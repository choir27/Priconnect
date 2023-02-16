const express = require('express');
const router = express.Router();

const { ensureAuth } = require('../middleware/auth');
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const Post = require('../models/Post');


router.get('/add', ensureAuth, (req, res) => {
  res.render('post/add', {
      layout: 'add'
  });
})


router.get('/about', ensureAuth, (req,res) => {
  res.render('main/about', {
      layout: "post"
  });
})


router.get('/comics', ensureAuth, (req,res) => {
  res.render('main/comics', {
    layout: 'auth-comics'
  });
})


router.get('/contact', ensureAuth, (req,res) => {
  res.render('main/contact', {
    layout: "post"
  });
})


router.post('/', upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      console.error(error);
      return next();
    }

    const result = await cloudinary.uploader.upload(file.path);    

    req.body.user = req.user.id;

    await Post.create({
      user: req.user,
      title: req.body.title,
      text: req.body.text,
      image: result.secure_url,
      cloudinaryId: result.public_id,
  });
    
    res.redirect('/dashboard');

  }catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


router.get('/', ensureAuth, async (req, res) => {
  try {
    const post = await Post.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('post/index', {
      layout: 'post',
      post,
    });
  }catch (err) {
    console.error(err);
    res.render('error/500');
  }

})


router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate('user').lean();

    if (!post) {
      return res.render('error/404');
    }

    (post.user_id != req.user.id) && (post.status == "private") ? 
    res.render("error/404") 
    : res.render(
      "post/show", {
        layout: "post", 
        post
      });

  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
})


router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    }).lean();

    if (!post) {
      return res.render('error/404');
    }

    post.user != req.user.id ? 
    res.redirect("/post")
    : res.render(
      "post/edit", {
        layout: "add", 
        post
      });

  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
})

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).lean();

    if (!post) {
      return res.render('error/404');
    }

    post.user != req.user.id 
    ? 
    res.redirect("post") 
    : post = await Post.findOneAndUpdate({
      _id: req.params.id
    }, 
    req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
  
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
})


router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).lean();

    await cloudinary.uploader.destroy(post.cloudinaryId);

    if (!post) {
      return res.render("error/404");
    }

    if (post.user != req.user.id) {
      res.redirect("/post");
    } else {
      await Post.deleteOne({ _id: req.params.id })
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
})


router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const post = await Post.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean();

    res.render('post/index', {
      post
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
})


module.exports = router