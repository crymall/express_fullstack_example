var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);
const authHelpers = require('../auth/helpers');
const passport = require('../auth/local');

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  db.any('select * from users where username = ${username}',
    req.params)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateSingleUser(req, res, next) {
  db.none('update users set username = ${newName} where username = ${username}',
    req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Changed one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function registerUser(req, res, next) {
  return authHelpers.createUser(req)
    .then((response) => {
      passport.authenticate('local', (err, user, info) => {
        if (user) {
          res.status(200)
             .json({
               status: 'success',
               data: user,
               message: 'Registered one user'
             });
        }
      })(req, res, next);
    })
    .catch((err) => {
      res.status(500)
         .json({
           status: 'error',
           error: err
         })
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  registerUser: registerUser,
  updateSingleUser: updateSingleUser
};
