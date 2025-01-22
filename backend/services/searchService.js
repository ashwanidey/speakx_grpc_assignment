const Questions = require("../models/Questions");

const searchQuestions = async (call, callback) => {
  const { query, page } = call.request;
  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    const results = await Questions.find({ title: new RegExp(query, "i") })
      .skip(skip)
      .limit(PAGE_SIZE);

    const total = await Questions.countDocuments({
      title: new RegExp(query, "i"),
    });

    const response = {
      questions: results.map((q) => ({
        id: q._id.toString(),
        title: q.title,
        type: q.type,
        options : q.options.map((o) => ({
          text: o.text,
          isCorrectAnswer: o.isCorrectAnswer,
        })),
        siblingId: q.siblingId.toString(),
      })),
      totalPages: Math.ceil(total / PAGE_SIZE),
    };

    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports = { searchQuestions };
