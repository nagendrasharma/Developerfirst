const mongoose = require('mongoose');

const TextReelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: { type: String, required: true },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('textReel', TextReelSchema);
