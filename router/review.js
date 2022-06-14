const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/user");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Store = require("../models/store");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
var router = express.Router();
const { verifyToken } = require("./middleware");

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

console.log(process.env.S3_ACCESS_KEY);
const uploadReviewImage = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "baeminback",
    key(req, file, cb) {
      console.log(file);
      cb(null, `reviewImage/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post(
  "/reviewImages",
  verifyToken,
  uploadReviewImage.single("image"),
  (req, res, next) => {
    // POST /post/images

    console.log("location:", req.file.location);
    console.log(req.body.historyId);
  }
);

router.get("/getReview/:storeId", async (req, res, next) => {
  try {
    const exStore = await Store.findOne({
      where: { id: parseInt(req.params.storeId, 10) },
    });

    if (!exStore) {
      return res.status(403).send("존재하지 않는 가게입니다");
    }

    const exReviewes = await exStore.getReviews();

    if (!exReviewes) {
      return res.status(403).send("존재하지 않는 리뷰입니다");
    }

    return res.status(200).send(exReviewes);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/writeReview", async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
