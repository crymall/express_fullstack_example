var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist';
var db = pgp(connectionString);
const bcrypt = require('bcrypt');

const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    db.one('SELECT username, password_digest FROM users WHERE username=$1', [username])
    .then((data) => {
      bcrypt.compare(password, data.password_digest,
        (err, res) => {
          if (res) {
            resolve(data);
          } else {
            reject(new Error("Invalid password"));
          }
      })
    })
    .catch((err) => {
      reject(new Error("Invalid username"));
    })
  })
}

const createPassword = (password) => {
  return bcrypt.hash(password, 10, (err, hash) => {
    return hash;
  });
};
