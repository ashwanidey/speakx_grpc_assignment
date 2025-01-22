const  Questions  = require('../models/Questions');
const data = require('../data/speakx_questions.json');
const mongoose = require('mongoose');

const parsedData = data.map((item) => ({
  ...item,
  _id: item._id && item._id.$oid ? new mongoose.Types.ObjectId(item._id.$oid) : null,
  siblingId: item.siblingId && item.siblingId.$oid ? new mongoose.Types.ObjectId(item.siblingId.$oid) : null,
}));





const insertData = async () => {

  try {
    await Questions.insertMany(parsedData);
    console.log('Data inserted');
  } catch (err) {
    console.error('Data insertion error:', err.message);
    process.exit(1);
  }
}

module.exports = { insertData };