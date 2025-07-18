const Test = require('../models/Test');

exports.getAll = async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
};

exports.getById = async (req, res) => {
  const test = await Test.findById(req.params.id);
  res.json(test);
};

exports.create = async (req, res) => {
  const { title, subject, duration, questions } = req.body;
  const test = await Test.create({ title, subject, duration, questions });
  res.json(test);
};