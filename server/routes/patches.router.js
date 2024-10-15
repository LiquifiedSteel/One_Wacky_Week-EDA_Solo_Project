const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "Patches" ORDER BY "date_posted" DESC;`)
        .then((response) => res.send(response.rows).status(200))
        .catch((err) => {
            console.error("Failed to retrieve Patch Notes: ", err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    if(req.user.isAdmin) {
        pool.query(`INSERT INTO "Patches" ("notes", "number") VALUES ($1, $2);`, [req.body.notes, req.body.number])
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.error("Failed to create new Patch Note: ", err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/', rejectUnauthenticated, (req, res) => {
    if(req.user.isAdmin) {
        pool.query(`DELETE FROM "Patches" WHERE "number"=$1;`, [req.body.number])
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.error("Failed to delete Patch Note: ", err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;