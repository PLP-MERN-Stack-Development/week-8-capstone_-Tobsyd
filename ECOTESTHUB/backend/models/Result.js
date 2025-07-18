const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  score: Number,
  answers: [Number],
  total: Number,
  takenAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
