const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("REQ.BODY in REGISTER:", req.body);

  try {
    // Step 1: Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Step 2: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Step 3: Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    console.log("User created:", newUser);

    res.status(201).json({ msg: 'Registered successfully', user: newUser });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in', err });
  }
};
