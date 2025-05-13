const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('../utils/mailer');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, role: 'client' });

  const verifyLink = `${process.env.BASE_URL}/auth/verify/${user._id}`;
  sendVerificationEmail(user.email, verifyLink);

  res.json({ message: 'Verification email sent', verifyLink });
};

exports.verifyEmail = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { verified: true });
  res.send('Email verified');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send('Invalid credentials');

  if (!user.verified) return res.status(403).send('Email not verified');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
