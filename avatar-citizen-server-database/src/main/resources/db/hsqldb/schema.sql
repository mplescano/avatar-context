DROP TABLE citizens IF EXISTS;
CREATE TABLE citizens (
  id         	INTEGER IDENTITY PRIMARY KEY,
  name			VARCHAR(180) NOT NULL,
  height 		INTEGER NOT NULL,
  mass 			INTEGER NOT NULL,
  hair_color 	VARCHAR(100) NOT NULL,
  gender 		VARCHAR(100) NOT NULL,
  planet 		VARCHAR(100) NOT NULL,
  UNIQUE(name, gender)
);