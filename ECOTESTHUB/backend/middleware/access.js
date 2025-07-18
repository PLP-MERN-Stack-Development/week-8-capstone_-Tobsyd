const User = require('../models/User');

exports.checkAccess = async (req, res, next) => {
  const user = req.user;
  const now = new Date();
  // Paid & active
  if (user.subscriptionStatus !== 'free' && user.subscriptionExpiry && user.subscriptionExpiry > now) {
    return next();
  }
  // Free trial remaining
  if (user.submissionCount && user.submissionCount < 5) {
    return next();
  }
  return res.status(403).json({ message: 'Trial limit reached. Please subscribe to continue.' });
};