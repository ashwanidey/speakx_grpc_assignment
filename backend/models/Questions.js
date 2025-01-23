const mongoose = require("mongoose");

const QuestionType = Object.freeze({
  ANAGRAM: "ANAGRAM",
  MCQ: "MCQ",
  READ_ALONG: "READ_ALONG",
  CONTENT_ONLY: "CONTENT_ONLY",
  CONVERSATION: "CONVERSATION",
});

const AnagramType = Object.freeze({
  WORD: "WORD",
  SENTENCE: "SENTENCE",
});

const anagramBlockSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  showInOption: {
    type: Boolean,
    required: true,
    default: true,
  },
  isAnswer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const mcqOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrectAnswer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(QuestionType),
    required: true,
  },
  solution: {
    type: String,
  },
  siblingId: {
    type: String,
  },
  anagramType: {
    type: String,
    enum: Object.values(AnagramType),
    required: function () {
      return this.type === QuestionType.ANAGRAM;
    },
  },
  blocks: {
    type: [anagramBlockSchema],
    required: function () {
      return this.type === QuestionType.ANAGRAM;
    },
  },
  options: {
    type: [mcqOptionSchema],
    required: function () {
      return this.type === QuestionType.MCQ;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = {
  Question,
  QuestionType,
  AnagramType,
};
