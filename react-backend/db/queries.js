var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);
var pass = require('./validation');

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

function createUser(req, res, next) {
  pass.createPassword(req.body.password)
    .then((hashed) => {
      let user = {
                   username: req.body.username,
                   password_digest: hashed
                 }

      db.none('insert into users(username, password_digest) values(${username}, ${password_digest})', user)
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one user'
            });
        })
        .catch(function (err) {
          return next(err);
        });
    })
}

function login(req, res, next) {
  pass.authenticate(req.body.username, req.body.password)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'logged in user'
        })
    })
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateSingleUser: updateSingleUser,
  login: login
};
