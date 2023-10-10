const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
    });

    user.password = undefined;
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const { nameOrEmail, password } = req.body;
    const user = await getUserByNameOrEmail(nameOrEmail);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
      if (err) {
        throw err;
      }
      req.currentUser = user;
      
      res.json({
        token
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByNameOrEmail = async (nameOrEmail) => {
  let users = await User.findAll({});
  const user = users.find(
    (u) => u.name === nameOrEmail || u.email === nameOrEmail
  );
  return user || null;
};

module.exports = {
  signUp,
  login
};
