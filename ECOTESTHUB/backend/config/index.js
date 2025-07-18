require('dotenv').config();
module.exports = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'https://ecotesthub-vken.onrender.com',
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
};