require('dotenv').config();

const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const app = express();

const images = require("./routes/images");
const users = require("./routes/users");
const prices = require("./routes/prices");


app.use(parser.json({
    extended: true
}));
app.use(cors());
app.use("/content", express.static ("public/content"));
app.use(parser.urlencoded({
    extended: true
}));

app.use("/",images);
app.use("/",users);
app.use("/",prices);


// home page
app.get("/",
    (req, res) => {
        res.send("hello world");

    });



const server = app.listen(
    process.env.PORT,
    () => {

        console.log("server is listening on port " + process.env.PORT);
    }
);

module.exports = server;