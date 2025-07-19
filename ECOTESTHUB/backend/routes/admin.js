const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Test = require('../models/Test');
const Answer = require('../models/Result');
const {protect, admin}= require('../middleware/auth');

//Get /stats
router.get('/stats', protect, async(req, res)=> {
    try {
        const totalUsers = await User.countDocuments();
        const totalTests = await Test.countDocuments();
        const totalAnswers = await Answer.countDocuments();

        res.json({
            totalUsers,
            totalTests,
            totalAnswers,
        });
    } catch (error){
        res.status(500).json({ message: 'Failed to get stats', error})
    }
} );

module.exports = router;