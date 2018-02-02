const bcrypt = require('bcryptjs');
var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.none('INSERT INTO users (username, password_digest) VALUES (${username}, ${password})', {username: req.body.username, password: hash});
}

module.exports = {
  comparePass,
  createUser
};
