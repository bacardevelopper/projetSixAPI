const express = require("express");
const mongoose = mongoose();
const bodyParser = require("body-parser");

/* connection à mongodb */
mongoose
  .connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifieldTopology: true,
  })
  .then(() => {
    console.log("connection reussit à mongodb");
  })
  .catch(() => {
    console.log("connection echoué à mongodb");
  });


const app = express();
app.use((req, res) => {
  res.status(200).json({ msg: "serveur connecté" });
});

module.exports = app;
