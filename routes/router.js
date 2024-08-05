const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('index', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false 
}));

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;