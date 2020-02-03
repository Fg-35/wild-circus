const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../conf");
// const verifyToken = require("./VerifyToken");
const fs = require('fs');

router.use(parser.json());

router.post(
    "/images",
    // verifyToken,
    (req, res) => {

        connection.query(
            "INSERT INTO images (title, alt, url) VALUES (?, ?, ?)",
            [
                req.body.title,
                req.body.alt,
                req.body.url
            ],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                } else {
                    connection.query(
                        "SELECT * FROM images WHERE id=?",
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
    "/images",
    (req, res) => {
        connection.query(
            "SELECT * FROM images",
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
    "/images/:id",
    // verifyToken,
    (req, res) => {

        const imgId = req.params.id;
        const body = req.body;

        connection.query(
            "SELECT * FROM images WHERE id=?",
            [imgId],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {

                    connection.query(
                        "UPDATE images SET ? WHERE id=?",
                        [body, imgId],
                        (error2, results2, fields) => {
                            if (error) {
                                res.status(500).json(error2);
                            }
                            else {
                                res.status(200).json(results2.imgId + { msg: "nothing left" });
                            }
                        }
                    )
                }


            }
        );
    }
)



router.get(
    "/images/:id",
    (req, res) => {
        connection.query(
            "SELECT * FROM images WHERE id=?",
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
    "/images/:id",
    // verifyToken,
    (req, res) => {
        connection.query(
            "SELECT * FROM images WHERE id=?",
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
                        "DELETE FROM images WHERE id=?",
                        [req.params.id],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).json(error);
                            }
                            else {
                                const file = output.url;
                                if (fs.existsSync("public/content/" + file)) {
                                    fs.unlinkSync(
                                        "public/content/" + file,
                                        (err) => {
                                            if (err) {
                                                res.status(501).json(err)
                                                console.log(err);
                                            }
                                            else {
                                                res.status(200).json(results);
                                            }
                                        }
                                    );
                                }
                                else {
                                    res.status(200).json(output);
                                }
                            }
                        }
                    )
                }

            }
        )
    }
);


module.exports = router;