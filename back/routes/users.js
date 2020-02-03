const express = require("express");
const parser = require("body-parser");
const bcrypt = require("bcryptjs");
const router = express.Router();
const connection = require("../conf");
const salt = "$2a$10$.xS1.szbGAYY7YxaO22Mu.";
const jwt = require("jsonwebtoken");
const jwtsecret = 'wildcircus';
// const verifyToken = require("./VerifyToken");

router.use(parser.json());
router.use(parser.urlencoded({
    extended: true
}));






router.post('/users/login', (req, res) => {

    // on récupère les données de connexion de notre utilisateur 	
    const user = req.body;
    const crypted = bcrypt.hashSync(user.password, salt);


    // on va essayer de trouver dans la base de données un utilisateur 	
    // dont les noms et mots de passe correspondent	

    connection.query(
        "SELECT * FROM users WHERE user=? AND password=?",
        [user.user, crypted],
        (error, results, fields) => {
            if (error || results.length === 0) {
                res.status(401).send("Unable to login");
            }
            else {
                // token creation	
                jwt.sign(
                    // results[0],	
                    { user },
                    jwtsecret,
                    (err, token) => {
                        if (err) {
                            res.status(501).send("JWT error");
                        }
                        else {
                            res.status(200).json({ token });
                        }
                    })
            }
        }
    )

})


router.post(
    "/users",
    // verifyToken,
    (req, res) => {

        const data = req.body;


        connection.query(
            "INSERT INTO users (user, password) VALUES (?, ?)",
            [data.user, bcrypt.hashSync(data.password, salt)],
            (error, results, fields) => {
                if (error) {
                    res.status(500).send(error);
                }
                else {
                    data.id = results.insertId;
                    res.status(201).json(req.body);
                }
            }
        )
    }
)

router.put(
    "/users/:id",
    // verifyToken,
    (req, res) => {

        const data = req.body;

        connection.query(
            "UPDATE users SET user=?, password=? WHERE id=?",
            [
                data.user, 
                bcrypt.hashSync(data.password, salt),
                req.params.id,
            ],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {

                    connection.query(
                        "SELECT * FROM users WHERE id=?",
                        [
                            req.params.id
                        ],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).json(error);
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
);

router.get(
    "/users",
    // verifyToken,
    (req, res) => {
        connection.query(
            "SELECT * FROM users",
            (error, results, fields) => {
                if (error) {
                    res.status(500).json(error);
                }
                else if (results.length === 0) {
                    res.status(404).json("invalid id");
                }
                else {
                    res.status(200).json(results); const express = require("express");
                    const parser = require("body-parser");
                    const router = express();

                }
            }
        )
    }
);

router.get(
    "/users/:id",
    // verifyToken,
    (req, res) => {
        connection.query(
            "SELECT * FROM users WHERE id=?",
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
                    const express = require("express");
                    const parser = require("body-parser");
                    const router = express();

                }
            }
        )
    }
);


router.delete(
    "/users/:id",
    // verifyToken,
    (req, res) => {
        connection.query(
            "SELECT * FROM users WHERE id=?",
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
                        "DELETE FROM users WHERE id=?",
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