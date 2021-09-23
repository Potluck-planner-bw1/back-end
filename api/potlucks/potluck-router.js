const router = require("express").Router();
const Potlucks = require("./potluck-model");

router.get("/", async (req, res, next) => {
  try {
    const potlucks = await Potlucks.getAll();
    res.json(potlucks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newPotluck = await Potlucks.add(req.body);
    res.status(201).json(newPotluck);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
