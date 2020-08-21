-- Auth_user Table create
CREATE TABLE studentdb.auth_users (
    `users_id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `csrf_key` VARCHAR(256) NOT NULL,
    PRIMARY KEY (users_id),
    UNIQUE INDEX users_id_UNIQUE (`users_id` ASC) VISIBLE,
    UNIQUE INDEX user_name_UNIQUE (`user_name` ASC) VISIBLE,
    UNIQUE INDEX csrf_key_UNIQUE (`csrf_key` ASC) VISIBLE
);