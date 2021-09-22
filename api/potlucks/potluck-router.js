const router = require("express").Router();
const Potlucks = require("./potluck-model");

router.post("/", async (req, res, next) => {
  try {
    const newPotluck = await Potlucks.add(req.body);
    res.json(newPotluck);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
