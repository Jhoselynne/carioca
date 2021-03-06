CREATE TABLE carioca_user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE carioca_round (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE carioca_game (
    id INT NOT NULL AUTO_INCREMENT,
    round_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (round_id) REFERENCES carioca_round(id)
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

INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Christian', '$2y$10$ZfSo1/OLs.marpMTq1bECOwKyaFVUsKgvRTLo5whctXrybdK6m45G');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Jhoselynne', '$2y$10$tFPVdKiKFXwyxUCf23oloemQk6pLpgfZ.JhKA0eNq33Ysww8ayCNq');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Yasemin', '$2y$10$YvvuptgS0K48TB609AYVbu6rAZTDglHZ90R1dbVzHmz4pC/0FGfRu');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Marta', '$2y$10$YR/Pwn9MxVvP5Y1lLGNcvOP5TYGpUOtk6vIb.dlC3dFYG2htXGnbm');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Alex', '$2y$10$sKKsBFMvzh6rEWSh72GsCugKpALh2JxmvMr0HR9NSnyh1lnNocVCi');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Guest1', '$2y$10$h92o/tsy8.QbkY9y9nYvoued9hKamo3YMAmyVJInJq8qTGpVI/hm.');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Guest2', '$2y$10$8fhHVWWrIWP0f8zXyIEcS.Lf/bLuIJLdQspEzpqy8wc3yupY2UDFW');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Guest3', '$2y$10$3c8q7X7dgGkaMvjv38vP2OV3o7ATYBwG24vEiIWmL5AthYIDhaoK.');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Guest4', '$2y$10$ePizgsYbtibgeXvvNU3uoerMK/IV8v6Bn92D/bynXXknWwVkd8Opq');
INSERT INTO `carioca_user` (`name`, `password`) VALUES ('Guest5', '$2y$10$G1vRAK9jbzz3MhDy1kTwe.DR82L2cvSF4V0HiN1GQczvXUPtDGqQW');

INSERT INTO `carioca_round` (`name`) VALUES ('2 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('1 trio 1 scale');
INSERT INTO `carioca_round` (`name`) VALUES ('2 scales');
INSERT INTO `carioca_round` (`name`) VALUES ('3 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('2 trios 1 scale');
INSERT INTO `carioca_round` (`name`) VALUES ('1 trio 2 scales');
INSERT INTO `carioca_round` (`name`) VALUES ('4 trios');
INSERT INTO `carioca_round` (`name`) VALUES ('3 scales');

INSERT INTO `carioca_game` (`round_id`) VALUES (8);
INSERT INTO `carioca_game` (`round_id`) VALUES (5);
INSERT INTO `carioca_game` (`round_id`) VALUES (1);

INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 1, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 2, 10);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 3, 130);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 4, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 5, 80);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 6, 80);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 7, 85);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 1, 8, 100);

INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 1, 15);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 2, 10);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 3, 25);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 4, 75);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 5, 10);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 6, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 7, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 2, 8, 105);

INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 1, 5);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 2, 25);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 3, 20);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 4, 20);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 5, 5);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 6, 120);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 7, 100);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 3, 8, 0);

INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 1, 105);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 2, 10);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 3, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 4, 20);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 5, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 6, 155);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 7, 105);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 4, 8, 110);

INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 1, 15);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 2, 0);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 3, 95);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 4, 20);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 5, 15);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 6, 90);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 7, 120);
INSERT INTO `carioca_score` (`game_id`, `user_id`, `round_id`, `points`) VALUES (1, 5, 8, 120);
