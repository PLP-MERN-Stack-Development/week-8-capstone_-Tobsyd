const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctIndex: Number
});

const TestSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true },
  title: String,
  subject: { type: String, enum: ['WAEC','NECO','JAMB'] },
  year: Number,           // added year field for past questions
  duration: Number, // in minutes
  questions: [QuestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Test', TestSchema);