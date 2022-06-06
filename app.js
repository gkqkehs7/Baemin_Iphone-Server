const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const userRouter = require("./router/user");
const menuRouter = require("./router/menu");
const reviewRouter = require("./router/review");
const storeRouter = require("./router/store");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);

app.use("/api/user", userRouter);
app.use("/api/menu", menuRouter);
app.use("/api/review", reviewRouter);
app.use("/api/store", storeRouter);

app.get("/", (req, res) => {
  console.log("connected");
  return res.send("helloworld");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});