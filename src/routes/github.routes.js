const express = require('express');
const GitHubController = require('../controllers/GitHubController');

const router = express.Router();

router.get('/users/:username/repos/github', GitHubController.getUserRepos);

module.exports = router;