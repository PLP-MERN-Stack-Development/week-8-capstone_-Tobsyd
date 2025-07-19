require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/index')
const connectDB = require('./config/db')

const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/tests');
const resultRoutes = require('./routes/results');
const adminRoutes = require('./routes/admin')


const app = express();
app.use(cors({ origin: config.clientUrl || "https://ecotesthub-vken.onrender.com", credentials: true}));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);


// Connect DB & start server
connectDB;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("MongoDB connected Successfully"))
  .catch(err => console.error(err));

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))