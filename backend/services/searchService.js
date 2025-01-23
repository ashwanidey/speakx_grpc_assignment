const { Question } = require("../models/Questions");

const searchQuestions = async (call, callback) => {
  const { query, page, filterType } = call.request;
  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  try {

    const filter = {};
    if (query) {
      filter.title = new RegExp(query, "i"); 
    }
    if (filterType) {
      filter.type = filterType; 
    }


    const results = await Question.find(filter)
      .skip(skip)
      .limit(PAGE_SIZE);

    const total = await Question.countDocuments(filter);

    const response = {
      questions: results.map((q) => ({
        id: q._id.toString(),
        title: q.title,
        type: q.type,
        options: q.options.map((o) => ({
          text: o.text,
          isCorrectAnswer: o.isCorrectAnswer,
        })),
        siblingId: q.siblingId ? q.siblingId.toString() : null,
        blocks: q.blocks.map((b) => ({
          text: b.text,
          showInOption: b.showInOption,
          isAnswer: b.isAnswer,
        })),
        solution: q.solution,
      })),
      totalPages: Math.ceil(total / PAGE_SIZE),
    };

    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports = { searchQuestions };
