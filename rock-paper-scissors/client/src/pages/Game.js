import React, { useState } from 'react';
import api from '../axiosConfig';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { getToken } from '../utils/auth'; // make sure this returns the token string like "Bearer <token>"
import Navbar from '../components/Navbar';

const choices = ['rock', 'paper', 'scissors'];

function Game() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChoice = async (choice) => {
    try {
      // Send choice to backend — backend will calculate computer move and result
      const res = await api.post(
        '/api/game/play',
        { choice }, // { choice: 'rock' | 'paper' | 'scissors' }
        {
          headers: {
            Authorization: getToken()
          }
        }
      );

      const { playerMove, computerMove, result } = res.data;
      setPlayerChoice(playerMove);
      setComputerChoice(computerMove);
      setResult(result);
    } catch (err) {
      console.error('Error playing game:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setError('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Rock Paper Scissors
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {!result ? (
          <>
            <Typography variant="h6" gutterBottom>
              Make your move!
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              {choices.map((choice) => (
  <Button
    key={choice}
    variant="contained"
    onClick={() => handleChoice(choice)} // ✅ lowercase sent
  >
    {choice.charAt(0).toUpperCase() + choice.slice(1)} {/* Just UI */}
  </Button>
))}

            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              You chose: {playerChoice}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Computer chose: {computerChoice}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                color:
                  result === 'You Win!'
                    ? 'green'
                    : result === 'Draw'
                    ? 'orange'
                    : 'red',
              }}
            >
              {result}
            </Typography>
            <Button variant="outlined" sx={{ mt: 3 }} onClick={handleReset}>
              Play Again
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Game;
