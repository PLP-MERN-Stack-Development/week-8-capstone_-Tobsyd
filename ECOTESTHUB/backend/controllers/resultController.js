const Result = require('../models/Test');
const Tested = require('../models/Result');

exports.submit = async (req, res) => {
    try{
    const { testId, answers } = req.body;
    if(!testId || !answers){
      return res.status(400).json({error:"testId and answers are required"});
    }

    console.log('Looking for testId:', testId);
    const test = await Result.findById(testId);

    if(!test){
      console.log('No test found')
      return res.status(404).json({message: 'Test not Found'})
    }

    console.log('Test found:', test.title);

     let score = 0;
    //  test.questions.forEach((q, i) => { if (q.correctIndex === answers[i]) score++; });
    test.questions.forEach((q,i) => {
      const correct = q.correctIndex;
      const userAnswer = answers[i];
      if(userAnswer !== null && userAnswer === correct){
        score++;
      }
    })

     const result = await Tested.create({ user: req.user._id, test: testId, answers, score, total: test.questions.length });
     console.log('Result created:', result);
     res.status(201).json({message: 'Submitted', result});
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error'})
  } 
};


exports.history = async (req, res) => {
 try {
   const results = await Tested.find({ user: req.user._id }).populate({path: 'test', populate: {
    path: 'questions', // if questions are in seperate model(not needed if embedded)
   }}).sort({ createdAt: -1 });
   console.log("History found", results);
   res.json(results);
 } catch (error) {
   console.error("No history found", err);
   res.status(500).json({ message:"Server error", err})
 }
};

// const Test = require('../models/Test');
// const Result = require('../models/Result');

// exports.submit = async (req, res) => {
//   const { testId, answers } = req.body;
//   const user = req.user;

//   // Fetch test
//   const test = await Test.findById(testId);
//   if (!test) return res.status(404).json({ message: 'Test not found.' });

//   // Validate answer submission length
//   if (!Array.isArray(answers) || answers.length !== test.questions.length) {
//     return res.status(400).json({ message: 'Invalid submission: answer count mismatch.' });
//   }

//   // Increment trial count if free
//   if (user.subscriptionStatus === 'free') {
//     user.submissionCount = (user.submissionCount || 0) + 1;
//     if (user.submissionCount > 5) {
//       return res.status(403).json({ message: 'Trial limit reached. Please subscribe to continue.' });
//     }
//     await user.save();
//   }

//   // Compute score
//   let score = 0;
//   test.questions.forEach((q, i) => {
//     const ans = answers[i];
//     // Validate each answer index
//     if (typeof ans !== 'number' || ans < 0 || ans >= q.options.length) {
//       return res.status(400).json({ message: 'Invalid submission: answer out of range.' });
//     }
//     if (q.correctIndex === ans) score++;
//   });

//   // Save result
//   const result = await Result.create({ user: user._id, test: testId, score, total: test.questions.length });
//   res.json(result);

// For email service
// const { generateResultPDF } = require('../utils/pdfGenerator');
// const { sendEmailWithAttachment } = require('../utils/emailService');

// // inside exports.submit
// // ... after saving result
// const pdfPath = generateResultPDF(result, user);
// await sendEmailWithAttachment(user.email, 'Your Test Result', 'See attached result summary.', pdfPath);