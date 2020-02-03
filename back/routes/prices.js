const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../conf");
// const verifyToken = require("./VerifyToken");
const fs = require('fs');

router.use(parser.json());

router.post(
    "/prices",
    // verifyToken,
    (req, res) => {

        connection.query(
            "INSERT INTO prices (child, adult) VALUES (?, ?)",
            [
                req.body.child,
                req.body.adult
            ],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                } else {
                    connection.query(
                        "SELECT * FROM prices WHERE id=?",
                        [results.insertId],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).json(error)
                            }
                            else {
                                res.status(200).json(results[0]);
                            }
                        }
                    )
                }
            }
        )
    }
)

router.get(
    "/prices",
    (req, res) => {
        connection.query(
            "SELECT * FROM prices",
            [req.params.id],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else if (results.length === 0) {
                    res.status(404).json("invalid id");
                }
                else {
                    res.status(200).json(results[0]);
                }
            }
        );
    }
);

router.put(
    "/prices/:id",
    // verifyToken,
    (req, res) => {

        const priceId = req.params.id;
        const body = req.body;

        connection.query(
            "SELECT * FROM prices WHERE id=?",
            [priceId],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {

                    connection.query(
                        "UPDATE prices SET ? WHERE id=?",
                        [body, priceId],
                        (error2, results2, fields) => {
                            if (error) {
                                res.status(500).json(error2);
                            }
                            else {
                                res.status(200).json(results2.priceId + { msg: "nothing left" });
                            }
                        }
                    )
                }


            }
        );
    }
)



router.get(
    "/prices/:id",
    (req, res) => {
        connection.query(
            "SELECT * FROM prices WHERE id=?",
            [req.params.id],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else if (results.length === 0) {
                    res.status(404).json("invalid id");
                }
                else {
                    res.status(200).json(results[0]);
                }
            }
        );
    }
);


router.delete(
    "/prices/:id",
    // verifyToken,
    (req, res) => {
        connection.query(
            "SELECT * FROM prices WHERE id=?",
            [req.params.id],
            (error, results, fields) => {

                if (error) {
                    res.status(500).json(error);
                }
                else if (results.length === 0) {
                    res.status(404).json("invalid id");
                }
                else {
                    const output = results[0];
                    connection.query(
                        "DELETE FROM prices WHERE id=?",
                        [req.params.id],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).json(error);
                            }
                            else {
                                res.status(200).json(output);
                            }
                        }
                    )
                }

            }
        )
    }
);


module.exports = router;