const router = require("express").Router();
const Users = require("./user-model");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Users.getAllUsers());
  } catch (err) {
    next(err);
  }
});

//get by some kind of filter. Ex use case, filter people that would go to a certain potluck.

module.exports = router;
