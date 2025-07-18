const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('password');
    console.log("User authenticated successfully");
    next();
  } catch(err) {
    res.status(401).json({ message: 'Token failed' });
    console.error("Unsuccesfully", err);
  }
};

// exports.admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) return next();
//   res.status(403).json({ message: 'Admin only' });
// };

// exports.admin = (req,res, next)=>{
//   if(req.user?.role !== 'admin'){
//     return res.status(403).json({ message: 'Admin only'});
//   }
//   next()
// };

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
}