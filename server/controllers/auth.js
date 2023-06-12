const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/api/login',
});

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = async (req, res) => {
  const { name,email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hash(password, 10,(err,hash)=>{
      return hash;
    });
    await User.create({ name,email, password: hashedPassword });
    res.redirect('/api/login');
  } catch (err) {
    console.error(err);
    res.redirect('/api/signup');
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/api/login');
};
