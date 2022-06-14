const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./passport/local");
const dotenv = require("dotenv");

const userRouter = require("./router/user");
const menuRouter = require("./router/menu");
const reviewRouter = require("./router/review");
const storeRouter = require("./router/store");
const historyRouter = require("./router/history");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);
app.use(passport.initialize());
passportConfig();
app.use("/api/user", userRouter);
app.use("/api/menu", menuRouter);
app.use("/api/review", reviewRouter);
app.use("/api/store", storeRouter);
app.use("/api/history", historyRouter);

app.get("/", (req, res) => {
  console.log("connected");
  return res.send("helloworld");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
