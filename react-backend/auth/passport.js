const passport = require('passport');
var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    db.one('SELECT username, password_digest FROM users WHERE username=$1', [username])
      .then((user) => { done(null, user); })
      .catch((err) => { done(err,null); });
  });

};
