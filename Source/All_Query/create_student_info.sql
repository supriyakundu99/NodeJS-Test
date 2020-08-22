CREATE TABLE `studentdb`.`student_info` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NULL,
    `class` VARCHAR(45) NULL,
    `stream` VARCHAR(60) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
    CONSTRAINT `username`
    FOREIGN KEY (`user_name`)
    REFERENCES `studentdb`.`auth_users` (`user_name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
