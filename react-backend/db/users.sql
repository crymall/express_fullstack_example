DROP DATABASE IF EXISTS userlist;
CREATE DATABASE userlist;

\c userlist;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);

INSERT INTO users (username, password_digest)
  VALUES ('Tyler', 'password'), ('Shannon', 'password1'), ('Richard', 'password2');
