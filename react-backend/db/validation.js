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
  return new Promise((resolve, reject) => {
    let hashed = bcrypt.hashSync(password, 10);
    if (hashed) {
      resolve(hashed)
    } else {
      reject(new Error("Invalid password"))
    }
  });
};

module.exports = {
  authenticate: authenticate,
  createPassword: createPassword
}
