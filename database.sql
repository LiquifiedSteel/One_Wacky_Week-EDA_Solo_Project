CREATE TABLE "Payments"  (
	"id" SERIAL PRIMARY KEY,
	"user_email" VARCHAR(40) UNIQUE,
	"date_purchased" DATE DEFAULT NOW(),
	"amount" MONEY
);

INSERT INTO "Payments" ("user_email", "amount") VALUES ('testEmail@gmail.com', '9.99');

DROP TABLE "Payments";



CREATE TABLE "Patches"  (
	"id" SERIAL PRIMARY KEY,
	"notes" VARCHAR(2000),
	"date_posted" DATE DEFAULT NOW(),
	"number" VARCHAR(10)
);

INSERT INTO "Patches" ("notes", "number") VALUES ('The game is currently just an idea, have not even figured out which engine to use yet, however the One Wacky Week website is currently under development', '0.0.0');

DROP TABLE "Patches";


CREATE TABLE "user"  (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"image_url" VARCHAR(100),
	"user_email" VARCHAR(30) UNIQUE NOT NULL,
	"isAdmin" BOOLEAN DEFAULT FALSE,
	"flagged" BOOLEAN DEFAULT FALSE,
	"purchased" BOOLEAN DEFAULT FALSE
);

DROP TABLE "user";



CREATE TABLE "users_questions"  (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER,
	"question_id" INTEGER,
	"answer" VARCHAR(255)
);

INSERT INTO "users_questions" ("user_id", "question_id") VALUES ('1', '4');

DROP TABLE "users_questions";



CREATE TABLE "Recovery_Questions"  (
	"id" SERIAL PRIMARY KEY,
	"Questions" VARCHAR(100)
);

INSERT INTO "Recovery_Questions" ("Questions") VALUES
('What was the name of your first stuffed toy?'),
('What was the name of your first school?'),
('What was the name of your first car?'),
('What was the name of your favorite childhood pet?'),
('What was the destination of your most memorable school field trip?'),
('What was the first name of your driving instructor?'),
('What city were you born in?'),
('What is the middle name of your oldest sibling?'),
('What is the maiden name of your mother?');

DROP TABLE "Recovery_Questions";
