DROP DATABASE IF EXISTS bb_team_tracker_db;
CREATE DATABASE bb_team_tracker_db;
USE bb_team_tracker_db;

/* enabled to throw errors for invalid enum inserts: */
SET GLOBAL sql_mode = 'STRICT_ALL_TABLES';
SET SESSION sql_mode = 'STRICT_ALL_TABLES';


/*----------------------------------------------------*/
/* leagues being played */

/*DROP TABLE IF EXISTS leagues; */

CREATE TABLE leagues (
	leagueID INT NOT NULL AUTO_INCREMENT,
	turn INT DEFAULT 0,
	is_active BOOLEAN DEFAULT TRUE,
	created DATETIME,
	PRIMARY KEY (leagueID)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*----------------------------------------------------*/
/* users */

CREATE TABLE users (
	userID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(64) DEFAULT NULL,
	password VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (userID),
	UNIQUE (name), /* prevent duplicate inserts */
	UNIQUE (password) /* prevent duplicate inserts */
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/* insert user to db */
DELIMITER $$
CREATE PROCEDURE insert_user (IN user_name VARCHAR(64), IN password_string VARCHAR(64), OUT user_ID INT)
BEGIN
	DECLARE userID_check INT DEFAULT 0; 
	
	/* check if user_name is already in db: */
	SELECT users.userID INTO userID_check FROM users 
	WHERE users.name = user_name;
	
	/* if so, set user_ID as 0: */
	IF userID_check > 0 THEN SET user_ID = 0; 
	ELSE 
		/* else check if password_string is already in db: */
		SELECT users.userID INTO userID_check FROM users 
		WHERE users.password = SHA2(password_string, 512);
		
		/* if so, set user_ID as 0: */
		IF userID_check > 0 THEN SET user_ID = 0; 
		ELSE
			/* else insert new user into db: */
			INSERT INTO users (name, password) VALUES (user_name, SHA2(password_string, 512));
			/* set user_ID as user's id: */
			SELECT users.userID INTO user_ID FROM users 
			WHERE users.name = user_name;
		END IF;
	END IF;
END $$
DELIMITER ;

/* return userID of user matching user_name & decrypted password_string */
DELIMITER $$
CREATE PROCEDURE select_userID (IN user_name VARCHAR(64), IN password_string VARCHAR(64), OUT user_ID INT)
BEGIN
	SELECT users.userID INTO user_ID FROM users 
	WHERE users.name = user_name
	AND users.password = SHA2(password_string, 512);
END $$
DELIMITER ;

/*----------------------------------------------------*/
/* players involded in leagues*/

/*DROP TABLE IF EXISTS players; */

CREATE TABLE players (
	playerID INT NOT NULL AUTO_INCREMENT,
	leagueID INT,
	userID INT,
	/*score INT DEFAULT 0,  ???????????*/ 
	is_active BOOLEAN DEFAULT TRUE,
	created DATETIME,
	PRIMARY KEY (playerID),
	FOREIGN KEY (leagueID) REFERENCES leagues(leagueID),
	FOREIGN KEY (userID) REFERENCES users(userID),
	CONSTRAINT leagueID_userID UNIQUE (leagueID, userID) /* make combined columns unique */
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DELIMITER $$
CREATE PROCEDURE insert_player (IN league_ID INT, IN user_ID INT, IN date_time DATETIME)
BEGIN
	/* add player to players: */
	INSERT INTO players (leagueID, userID, created) VALUES (
		league_ID, user_ID, date_time);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE select_player_names (IN league_ID INT)
BEGIN
	SELECT users.name FROM users
		INNER JOIN players ON users.userID = players.userID
	WHERE players.leagueID = league_ID;
END $$
DELIMITER ;

/*----------------------------------------------------*/
/* commissioners*/

CREATE TABLE commissioners (
	commissionerID INT NOT NULL AUTO_INCREMENT,
	playerID INT,
	/*userID INT, */
	PRIMARY KEY (commissionerID),
	UNIQUE (playerID)
	/*UNIQUE (userID) /* prevent duplicate inserts */
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;





/*===============================================================*/
/* ++++++++++++++ TESTING HERE +++++++++++++++++++++ */
INSERT INTO users (name, password) VALUES ("jay", SHA2(333, 512));
INSERT INTO users (name, password) VALUES ("jo", SHA2(123, 512));
INSERT INTO users (name, password) VALUES ("dan", SHA2(111, 512));
INSERT INTO users (name, password) VALUES ("laura", SHA2(321, 512));