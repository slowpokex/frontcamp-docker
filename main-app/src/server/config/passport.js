import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import { Strategy as LocalStrategy } from 'passport-local';
import config from './env';

import User from '../modules/api/users/repository';
import UserFacade from '../modules/api/users/facade';

const checkUser = (password, userFromDb) => new Promise((resolve, reject) => {
  if (!userFromDb) {
    return reject({ noUser: true });
  }
  const wrappedUser = new User(userFromDb);
  wrappedUser.comparePassword(password, (err, isMatch) => {
    if (!isMatch) {
      return reject({ notMatch: true });
    }
    if (err) {
      return reject(err);
    }
    return resolve(userFromDb);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, login, password, done) => {
  UserFacade.findOne({ login })
    .then(user => checkUser(password, user))
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      if (err.noUser) {
        return done(null, false, { message: 'Invalid user ID' });
      }
      if (err.notMatch) {
        return done(null, false, { message: 'Oops! Wrong password.' });
      }
      done(err);
    });
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

export default function (app) {
  if (!app) {
    return app;
  }

  app.use(session({
    secret: config.secret,
    saveUninitialized: true, // saved new sessions
    resave: false, // do not automatically write to the session store
    cookie: { httpOnly: true, maxAge: 2419200000 },
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.json({ success: false, message: info.message });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.json({ success: false, message: loginErr });
        }
        return res.json({ success: true, message: 'authentication succeeded' });
      });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    return res.json({ success: true });
  });

  app.post('/register', (req, res) => {
    UserFacade.findOne({ login: req.body.login })
      .then((user) => {
        if (user) {
          return res.json({ success: false, message: 'Login already in use' });
        }
        return UserFacade.create(req.body);
      })
      .then(() => res.json({ success: true }))
      .catch((err) => {
        console.error(err);
        return res.json({ success: false });
      });
  });

  return app;
}
