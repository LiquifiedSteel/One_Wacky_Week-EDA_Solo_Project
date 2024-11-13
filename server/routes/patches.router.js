const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * This GET request will grab all of the patch notes from the Patches table, will be sent straight to the Home page to be displayed
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "Patches" ORDER BY "id" DESC;`)
        .then((response) => res.send(response.rows).status(200))
        .catch((err) => {
            console.error("Failed to retrieve Patch Notes: ", err);
            res.sendStatus(500);
        })
});

/**
 * This POST request will add a new patch note to the Patches table, this is sent from the admin saga.
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


// This DELETE request will delete a patch note from the Patches table, this is sent from the admin saga.
router.delete('/:remove', rejectUnauthenticated, (req, res) => {
    if(req.user.isAdmin) {
        console.log(req.params.remove)
        pool.query(`DELETE FROM "Patches" WHERE "number"=$1;`, [req.params.remove])
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