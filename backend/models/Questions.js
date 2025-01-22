const {mongoose} = require('mongoose');

const blockSchema = new mongoose.Schema({
  text: { type: String, required: true },
  showInOption: { type: Boolean, required: true },
  isAnswer: { type: Boolean, required: true },
});

const optionSchema = new mongoose.Schema({
  text: { type: String, required: false },
  isCorrectAnswer: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  anagramType: { type: String, enum: ['WORD', 'SENTENCE'], required: false }, // Only for ANAGRAM type
  blocks: [blockSchema], // Only for ANAGRAM type
  options: [optionSchema], // Only for MCQ type
  siblingId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Question' },
  solution: { type: String, required: false }, // Optional, depending on type
  title: { type: String, required: true },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
