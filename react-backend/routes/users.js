let db = require('../db/queries');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', db.getAllUsers);
router.post('/new', db.createUser);
router.patch('/:username/edit', db.updateSingleUser);
router.get('/:username/edit', db.getSingleUser);

module.exports = router;
