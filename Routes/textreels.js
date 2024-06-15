const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const TextReel = require('/Users/nagendrasharma/Developer/Text_Reel/models/user');
const User = require('/Users/nagendrasharma/Developer/Text_Reel/models/user');

router.post(
  '/',
  [auth, [check('content', 'Content is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTextReel = new TextReel({
        content: req.body.content,
        user: req.user.id
      });

      const textReel = await newTextReel.save();

      res.json(textReel);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const textReels = await TextReel.find().sort({ date: -1 });
    res.json(textReels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/like/:id', auth, async (req, res) => {
  try {
    const textReel = await TextReel.findById(req.params.id);

    if (textReel.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'TextReel already liked' });
      }
  
      textReel.likes.unshift({ user: req.user.id });
  
      await textReel.save();
  
      res.json(textReel.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const textReel = await TextReel.findById(req.params.id);
  
      if (textReel.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'TextReel has not yet been liked' });
      }
  
      const removeIndex = textReel.likes.map(like => like.user.toString()).indexOf(req.user.id);
  
      textReel.likes.splice(removeIndex, 1);
  
      await textReel.save();
  
      res.json(textReel.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;
