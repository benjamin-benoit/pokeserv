var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var fs = require("fs");
var obj = require("./pokedex.json");
const fileContents = fs.readFileSync("./pokedex.json", "utf8");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/liste", (req, res, next) => {
  try {
    const data = JSON.parse(fileContents);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ "": "" });
  }
});

app.get("/pokemon/:id", function(req, res) {
  const idSelected = req.params.id;
  const data = JSON.parse(fileContents);

  let found = data.find(function(element) {
    return req.params.id === element.ndex;
  });
  console.log(found);
  res.send(found);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
