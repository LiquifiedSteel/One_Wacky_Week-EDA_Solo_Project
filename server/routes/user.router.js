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

router.get('/answers', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT "user_id", json_agg("question_id")AS "questionsIDs", json_agg("answer")AS "answer" FROM "users_questions" GROUP BY "user_id";`)
  .then((response) => res.send(response.rows).status(200))
  .catch((err) => {
    console.log('Failed to retrieve payments: ', err);
    res.sendStatus(500);
  })
})

router.get('/payments', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "Payments";`)
  .then((response) => res.send(response.rows).status(200))
  .catch((err) => {
    console.log('Failed to retrieve payments: ', err);
    res.sendStatus(500);
  })
})

router.get('/all', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "user";`)
  .then((response) => res.send(response.rows).status(200))
  .catch((err) => {
    console.log('Failed to retrieve users: ', err);
    res.sendStatus(500);
  })
})

router.get('/questions', (req, res) => {
    pool.query(`SELECT * FROM "Recovery_Questions";`)
      .then((response) => res.send(response.rows).status(200))
      .catch((err) => {
        console.log('Failed to retrieve recovery questions: ', err);
        res.sendStatus(500);
      })
})


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (username, password, user_email)
        VALUES ($1, $2, $3) RETURNING id;`;
    pool
        .query(queryText, [username, password, req.body.email])
        .then((response) => {
            pool.query(`INSERT INTO "users_questions" ("user_id", "question_id", "answer") VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7);`, [response.rows[0].id, req.body.question1, req.body.answer1, req.body.question2, req.body.answer2, req.body.question3, req.body.answer3])
                .then(() => res.sendStatus(201))
                .catch((err) => {
                    console.log('User registration failed at user recovery questions questions: ', err);
                    res.sendStatus(500);
            })
        })
        .catch((err) => {
          console.log('User registration failed at username, password, and email: ', err);
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

// This PUT route is used to update the user's profile picture
router.post('/profile/:user', rejectUnauthenticated, (req, res) => {
  const url = req.body.url;
  
  const query = `UPDATE "user" SET "image_url" = $1 WHERE "id"=$2;`;

  pool.query(query, [url, req.params.user])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Failed to update user profile picture: ', err);
      res.sendStatus(500);
    })
})

// This PUT route flags the logged in account for deletion
router.put('/deleteAccount', rejectUnauthenticated, (req, res) => {
  pool.query(`UPDATE "user" SET "flagged" = TRUE WHERE "id"=$1;`, [req.user.id])
  .then(() => res.sendStatus(200))
  .catch((err) => {
    console.log('Failed to "delete" user: ', err);
    res.sendStatus(500);
  })
})

// This DELETE request can only be activated by the Admin, it will delete the desired account from the database
router.delete('/hardDelete/:id', rejectUnauthenticated, (req, res) => {
  if(req.user.isAdmin) {
    pool.query(`DELETE FROM "user" WHERE "id"=$1;`, [req.params.id])
    .then(() => {
      pool.query(`DELETE FROM "users_questions" WHERE "user_id"=$1;`, [req.params.id])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log('Failed to clear the user\'s questions from the users_questions table: ', err);
        res.sendStatus(500);
      })
    })
    .catch((err) => {
      console.log('Failed to delete user: ', err);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
  
})

module.exports = router;
