const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    "signin",
    new LocalStrategy(
      {
        usernameField: "email", //req
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          //await 구문엔 try를 써주자
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 유저입니다" }); //서버에러없음, 로그인실패, 클라이언트에러있음
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user); //서버에러없음, 로그인성공
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다" }); //서버에러없음, 로그인실패, 클라이언트에러있음
        } catch (error) {
          console.error(error);
          return done(error); //서버에러
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: "jwt-secret-key",
      },
      async (jwtPayload, done) => {
        try {
          console.log("here2");
          console.log(jwtPayload);
          const user = await User.findOne({
            where: { email: jwtPayload.email },
          });
          // 유저 데이터가 있다면 유저 데이터 객체 전송
          if (user) {
            done(null, user);
          }
          // done(null, false); 이거 없어도 에러 보내진다 왜 인지 모르겟어
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
