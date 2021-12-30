CREATE TABLE carioca_user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE carioca_round (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE carioca_game (
    id INT NOT NULL AUTO_INCREMENT,
    ongoing INT,
    PRIMARY KEY (id),
    FOREIGN KEY (ongoing) REFERENCES carioca_round(id)
);

CREATE TABLE carioca_score (
    game_id INT,
    user_id INT,
    round_id INT,
    points INT,
    PRIMARY KEY (game_id, user_id, round_id),
    FOREIGN KEY (game_id) REFERENCES carioca_game(id),
    FOREIGN KEY (user_id) REFERENCES carioca_user(id),
    FOREIGN KEY (round_id) REFERENCES carioca_round(id)
);

INSERT INTO `carioca_user` (`name`) VALUES ('Christian');
INSERT INTO `carioca_user` (`name`) VALUES ('Jhoselynne');
INSERT INTO `carioca_user` (`name`) VALUES ('Yasemin');
INSERT INTO `carioca_user` (`name`) VALUES ('Marta');
INSERT INTO `carioca_user` (`name`) VALUES ('Alex');
INSERT INTO `carioca_user` (`name`) VALUES ('Guest1');
INSERT INTO `carioca_user` (`name`) VALUES ('Guest2');
INSERT INTO `carioca_user` (`name`) VALUES ('Guest3');
INSERT INTO `carioca_user` (`name`) VALUES ('Guest4');
INSERT INTO `carioca_user` (`name`) VALUES ('Guest5');

INSERT INTO `carioca_round` (`name`) VALUES ('2 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('1 trio 1 scale');
INSERT INTO `carioca_round` (`name`) VALUES ('2 scales');
INSERT INTO `carioca_round` (`name`) VALUES ('3 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('2 trios 1 scale');
INSERT INTO `carioca_round` (`name`) VALUES ('1 trio 2 scales');
INSERT INTO `carioca_round` (`name`) VALUES ('4 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('3 scales');

INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
INSERT INTO `carioca_game` (`ongoing`) VALUES (1);
