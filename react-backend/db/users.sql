DROP DATABASE IF EXISTS userlist;
CREATE DATABASE userlist;

\c userlist;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR
);

INSERT INTO users (username)
  VALUES ('Tyler'), ('Shannon'), ('Richard');
