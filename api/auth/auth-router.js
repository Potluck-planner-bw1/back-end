const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../users/user-model");

const { newUserAvailable, validateUser } = require("../auth/middleware");
const { JWT_SECRET } = require("../secrets");

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

router.post("/register", newUserAvailable, (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  try {
    if (user) {
      Users.insertUser(user);
      next({ status: 201, message: `${user.username} created!` });
    } else {
      next({ status: 401, message: "Error" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateUser, (req, res, next) => {
  try {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      const token = buildToken(req.user);
      res.status(200).json({
        message: `welcome back ${req.user.username}`,
        token,
      });
    } else {
      next({ status: 401, message: "Niet Breh" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
