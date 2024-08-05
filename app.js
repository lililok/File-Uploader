const express = require('express');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const passport = require('./utils/passport');
const routes = require('./routes/router');

const prisma = new PrismaClient();
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes); 

app.listen(3000, () => {
  console.log('start');
});