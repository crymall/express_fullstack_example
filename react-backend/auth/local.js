const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);
const authHelpers = require('./helpers');

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  db.one('SELECT username, password_digest FROM users WHERE username=$1', [username])
    .then((user) => {
      if (!user) {
        return done(null, false);
      } if (!authHelpers.comparePass(password, user.password_digest)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => {
      return done(err);
    })
}))

module.exports = passport;
