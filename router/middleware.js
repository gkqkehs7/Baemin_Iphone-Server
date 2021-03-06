const passport = require("passport");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(419).send({ error: "noTokenError" });
  }
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    try {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        if (info?.name === "TokenExpiredError") {
          return res.status(403).send({ error: info.name });
        }
        if (info?.name === "JsonWebTokenError") {
          return res.status(419).send({ error: info.name });
        }
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  })(req, res, next);
};
