## User table
Field | Type | Description
------|------|---------------
user_id | SERIAL PRIMARY KEY | Unique number to identify user
first_name | VARCHAR(255) NOT NULL | The users's first name
surname | VARCHAR(255) NOT NULL | The users's last name
email | VARCHAR(255) NOT NULL UNIQUE | A unique email address
password | VARCHAR(255) NOT NULL | Password that will be hashed by bcrypt


## Movie Rating Table
Field | Type | Description
------|------|---------------
id | SERIAL PRIMARY KEY | The rating's unique ID
user_id | INTEGER REFERENCES users (user_id) | the user's unique id number accessed from the user table
movie_id | INT NOT NULL | The movie's unique ID (corresponding to the TMDB ID)
rating | NOT NULL CHECK (rating >= 1 and rating <=10) | The movie's rating