CREATE TABLE `studentdb`.`session` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `session_value` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `session_value_UNIQUE` (`session_value` ASC) VISIBLE,
    INDEX `user_name_idx` (`user_name` ASC) VISIBLE,
    CONSTRAINT `user_name` FOREIGN KEY (`user_name`) REFERENCES `studentdb`.`auth_users` (`user_name`) ON DELETE NO ACTION ON UPDATE NO ACTION
);