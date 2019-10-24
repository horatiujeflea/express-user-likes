CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
 );

CREATE TABLE user_like (
    from_user INTEGER REFERENCES app_user (id),
    to_user INTEGER REFERENCES app_user (id),
    PRIMARY KEY (from_user, to_user)
);

ALTER TABLE user_like
  ADD CONSTRAINT from_user_cannot_be_equal_to_to_user_CHK
    CHECK (from_user <> to_user);