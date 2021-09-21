const router = require('express').Router()
const Users = require('./user-model')

router.get('/', async (req, res) => {
    res.status(200).json(await Users.getAllUsers())
  })

  //get by some kind of filter. Ex use case, filter people that would go to a certain potluck.

  module.exports = router