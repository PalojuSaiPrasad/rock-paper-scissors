const Game = require('../models/game');
const User = require('../models/User');

exports.playGame = async (req, res) => {
  const { choice } = req.body;
  const choices = ['rock', 'paper', 'scissors'];
  const computer = choices[Math.floor(Math.random() * 3)];
  let result = '';

  if (choice === computer) result = 'Draw';
  else if (
    (choice === 'rock' && computer === 'scissors') ||
    (choice === 'paper' && computer === 'rock') ||
    (choice === 'scissors' && computer === 'paper')
  ) result = 'You Win!';
  else result = 'You Lose!';

  try {
    const newGame = new Game({
      playerMove: choice,
      computerMove: computer,
      result,
      user: req.user.id // comes from auth middleware
    });
    await newGame.save();

    res.json({ playerMove: choice, computerMove: computer, result });
  } catch (err) {
    res.status(500).json({ msg: 'Error saving game', err });
  }
};
exports.getHistory = async (req, res) => {
  console.log("📥 /history hit by:", req.user.id);
  try {
    const games = await Game.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching history", err });
  }
};



exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find(); // get all users
    const leaderboard = [];

    for (const user of users) {
      const games = await Game.find({ user: user._id });
      const totalGames = games.length;
      const wins = games.filter(g => g.result === 'You Win!').length;
      const winPercent = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;

      leaderboard.push({
        username: user.username,
        gamesPlayed: totalGames,
        wins,
        winPercent
      });
    }

    leaderboard.sort((a, b) => b.winPercent - a.winPercent); // highest % first
    res.json(leaderboard);
  } catch (err) {
    console.error("Error in leaderboard:", err);
    res.status(500).json({ msg: "Server error", err });
  }
};
