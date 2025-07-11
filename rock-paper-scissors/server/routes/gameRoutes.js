const express = require('express');
const router = express.Router();
const { playGame, getHistory, getLeaderboard } = require('../controllers/gameController');
const auth=require('../middleware/auth.js')
router.post('/play',auth, playGame);
router.get('/history',auth,getHistory);
router.get('/leaderboard', getLeaderboard); // no auth needed, public
module.exports = router;



