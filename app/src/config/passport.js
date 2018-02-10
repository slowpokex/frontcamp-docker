import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../modules/users/repository';
import UserFacade from '../modules/users/facade';

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
    usernameField: 'id',
    passwordField: 'password',
    session: false,
    passReqToCallback : true
}, (req, id, password, done) => {
    UserFacade.findById(id)
        .then(user => checkUser(password, user))
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            if (err.noUser) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (err.notMatch) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            done(err);
        });
}));

passport.serializeUser((user, done) => {
    return done(null, user._id)
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

export default function(app) {
    if (!app) {
        return app;
    }
    
    app.use(session({ secret: 'frontcamp' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    app.post('/login',  passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));
    
    app.get('/login', (req, res) => {
        return res.render('login', { loginMessage: req.flash('loginMessage') });
    });
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return app;
}


