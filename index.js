const express = require("express");
const path = require("path");
const Config = require("./config");
const bodyParser = require("body-parser");
const monggose = require("mongoose");
const staticAsset = require("static-asset");
const Create = require("./router/create");
const Index = require("./router/index");

const app = express();

// Express settings
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

// Routes
app.use("/", Index);
app.use("/create", Create);
app.use((req, res, next) => {
  const err = new Error("Not found 404 df");
  err.status = 404;
  next(err);
});

// Start server
async function Start() {
  try {
    await monggose.connect(Config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connect");
    app.listen(Config.port, () =>
      console.log(`Example app listening at http://localhost:${Config.port}`)
    );
  } catch (err) {
    console.log(err);
  }
}

Start();
