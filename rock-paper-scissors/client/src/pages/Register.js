import React, { useState } from 'react';
import api from '../axiosConfig';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/auth/register', {
        username,
        email,
        password,
      });

      console.log('Registration successful:', res.data);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message || 'User already exists');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Register
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
