const db = require("../data/db-config");

function getAll() {
  db("potlucks");
}

async function getByUser(user_id) {
  const potluck = await db("potlucks")
    .leftJoin("users", "potlucks.potluck_id", "users.user_id")
    .where("users.user_id", user_id);

  // depending on how we intend to make it look on the front end we could add a .select() where we maybe just return a filed like the name of the title that, for ex, would be rendered ina list.

  return potluck;
}

const add = async (potluck) => {
  const [newPotluckObject] = await db("potlucks").insert(potluck, [
    "potluck_id",
    "title",
    "date",
    "time",
    "location",
  ]);
  return newPotluckObject;
};

module.exports = {
  getByUser,
  add,
};
