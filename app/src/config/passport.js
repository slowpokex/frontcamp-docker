import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../modules/users/repository';
import UserFacade from '../modules/users/facade';

const checkUser = (password, userFromDb) => new Promise((resolve, reject) => {
    const wrappedUser = new User(userFromDb);
    wrappedUser.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
            return reject(err, isMatch);
        }
        return resolve(userFromDb);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    session: false,
}, (id, password, done) => {
    UserFacade.findOne({ id })
        .then(user => checkUser(password, user))
        .then((user) => {
            done(null, user);
        })
        .catch(done);
}));

export default function(app) {
    if (!app) {
        return app;
    }

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));
    
    app.get('/login', (req, res) => {
        res.json({ message: 'Must auth!' });
    });
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return app;
}


