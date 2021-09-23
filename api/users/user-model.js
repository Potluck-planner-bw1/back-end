const db = require("../data/db-config");

function getAllUsers() {
  return db("users");
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  try {
    const [newUserObject] = await db("users").insert(user, [
      "user_id",
      "username",
      "password",
    ]);
    return newUserObject;
  } catch (err) {
    console.log(err);
  }
}

function findById(user_id) {
  return db("users").where("users", user_id);
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = {
  getAllUsers,
  insertUser,
  findBy,
  findById,
};
