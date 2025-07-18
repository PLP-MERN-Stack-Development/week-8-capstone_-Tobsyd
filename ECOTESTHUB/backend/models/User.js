const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  trialCount: { type: Number, default: 0 },
  subscription: { type: String, enum: ['free','monthly','unlimited'], default: 'free' },
  subscriptionStatus: { type: String, enum: ['free','active_monthly','active_unlimited'], default: 'free' },
  subscriptionExpiry: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);