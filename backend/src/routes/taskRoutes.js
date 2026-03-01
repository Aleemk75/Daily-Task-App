const express = require('express');
const router = express.Router();
const { getTasks, saveTasks } = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', saveTasks);

module.exports = router;
