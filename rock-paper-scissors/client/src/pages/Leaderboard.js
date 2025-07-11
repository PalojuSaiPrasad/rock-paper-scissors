import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../axiosConfig';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from '@mui/material';
import Navbar from '../components/Navbar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/api/game/leaderboard');
        setLeaders(res.data);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <EmojiEventsIcon sx={{ fontSize: 36, color: 'gold', mr: 1 }} />
          <Typography variant="h4" align="center">
            Leaderboard
          </Typography>
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell align="center"><strong>Games Played</strong></TableCell>
                <TableCell align="center"><strong>Wins</strong></TableCell>
                <TableCell align="center"><strong>Win %</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaders.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell align="center">{user.gamesPlayed}</TableCell>
                  <TableCell align="center">{user.wins}</TableCell>
                  <TableCell align="center">{user.winPercent}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}

export default Leaderboard;
