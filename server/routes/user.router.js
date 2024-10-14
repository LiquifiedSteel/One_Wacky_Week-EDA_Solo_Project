const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, answers, user_email)
    VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool
    .query(queryText, [username, password, req.body.answers, req.body.email])
    .then((response) => {
      pool.query(`INSERT INTO "users_questions" ("user_id", "question_id") VALUES ($1, $2), ($1, $3), ($1, $4);`, [response.rows[0].id, req.body.question1, req.body.question2, req.body.question3])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed at user questions: ', err);
        res.sendStatus(500);
      })
    })
    .catch((err) => {
      console.log('User registration failed at username, password, and answers: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

router.put('/profile/:url', rejectUnauthenticated, (req, res) => {
  const url = req.params.url;

  const query = `UPDATE "user" SET "image_url" = $1 WHERE "id"=$2;`;

  pool.query(query, [url, req.user.id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Failed to update user profile picture: ', err);
      res.sendStatus(500);
    })
})

router.put('/deleteAccount', rejectUnauthenticated, (req, res) => {
  pool.query(`UPDATE "user" SET "flagged" = TRUE WHERE "id"=$1;`, [req.user.id])
  .then(() => res.sendStatus(200))
  .catch((err) => {
    console.log('Failed to "delete" user: ', err);
    res.sendStatus(500);
  })
})

module.exports = router;
