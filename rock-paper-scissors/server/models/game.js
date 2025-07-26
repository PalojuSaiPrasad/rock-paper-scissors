const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  playerMove: String,
  computerMove: String,
  result: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
//nothing changed

module.exports = mongoose.model('Game', GameSchema);


