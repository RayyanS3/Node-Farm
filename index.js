const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const data = fs.readFileSync(__dirname + "/dev-data/data.json", "utf-8");
const parsedData = JSON.parse(data);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started on port 8000");
});

app.get("/", (req, res) => {
  res.render("overview", {
    productCards: "CARDS",
    products: parsedData,
  });
});

app.get("/product/id=:idNo", (req, res) => {
  const id = req.params.idNo;
  res.render("product", {
    product: parsedData[id],
  });
});

// app.get("/api", (req, res) => {
//   res.writeHead(200, { "Content-type": "application/json" });
//   res.end(data);
// });
