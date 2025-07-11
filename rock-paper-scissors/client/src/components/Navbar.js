import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          RPS Game
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/game">Game</Button>
          <Button color="inherit" component={Link} to="/history">History</Button>
          <Button color="inherit" component={Link} to="/leaderboard">Leaderboard</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
