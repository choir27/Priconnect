const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const upload = require("../middleware/multer");
const cloudinary = require("../middleware/cloudinary");

const Character = require('../models/Character')


router.get('/add', ensureAuth, (req, res) => {
  res.render('characters/add', {
      layout: 'add'
  })
})

router.get('/about', ensureAuth, (req,res) => {
  res.render('characters/about')
})

router.get('/comics', ensureAuth, (req,res) => {
  res.render('characters/comics', {
    layout:'comics-character'
  })
})

router.get('/contact', ensureAuth, (req,res) => {
  res.render('characters/contact')
})

router.post('/', upload.array('image', 10), async (req, res) => {
  try {
  let array = []
  let image = '';
    for(let i = 0; i < req.files.length; i++){
    image = await cloudinary.uploader.upload(req.files[i].path);
   array.push(image.secure_url)

    }
    req.body.user = req.user.id
    await Character.create({
      user: req.user,
      name: req.body.name,
      image: array,
      nickname: req.body.nickname,
      cloudinaryId: image.public_id,
      guild: req.body.guild,
      unionName: req.body.unionName,
      text: req.body.text
  })
    
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/', ensureAuth, async (req, res) => {
  try {
    const characters = await Character.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('characters/index', {
      layout: 'character',
      characters,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id).populate('user').lean()

    if (!character) {
      return res.render('error/404')
    }

    if (character.user._id != req.user.id && character.status == 'private') {
      res.render('error/404')
    } else {
      res.render('characters/show', {
        layout: 'character',
        character,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})


router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const character = await Character.findOne({
      _id: req.params.id,
    }).lean()

    if (!character) {
      return res.render('error/404')
    }

    if (character.user != req.user.id) {
      res.redirect('/characters')
    } else {
      res.render('characters/edit', {
        layout: 'add',
        character,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id).lean()

    if (!character) {
      return res.render('error/404')
    }

    if (character.user != req.user.id) {
      res.redirect('/characters')
    } else {
      character = await Character.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id).lean()

    await cloudinary.uploader.destroy(character.cloudinaryId);

    if (!character) {
      return res.render('error/404')
    }

    if (character.user != req.user.id) {
      res.redirect('/characters')
    } else {
      await Character.deleteOne({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const characters = await Character.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean()

    res.render('characters/index', {
      characters
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


module.exports = router