const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//
const app = express();
//
app.set("View engine", "ejs");
app.set("Views", "Views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//
app.get("/", (req, res, next) => {
  res.render("index.ejs");
});
app.post("/results", (req, res, next) => {
  const weight = req.body.weight;
  const height = req.body.height;
  const BMI = Math.round((weight / Math.pow(height, 2)) * 100) / 100;
  let message;
  if (BMI < 18.5) message = "Underweight";
  if (BMI < 25 && BMI > 18.5) message = "Normal weight";
  if (BMI < 30 && BMI > 25) message = "Overweight";
  if (BMI > 30) message = "Obesity";

  res.render("results.ejs", { bmi: BMI, message: message });
});

app.listen(5000);
