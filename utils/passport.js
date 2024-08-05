const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

passport.use(new LocalStrategy({ usernameField: 'name' }, async (name, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { name: name } });
    if (!user) {
      return done(null, false, { message: 'wrong name' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'wrong password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  module.exports = passport;