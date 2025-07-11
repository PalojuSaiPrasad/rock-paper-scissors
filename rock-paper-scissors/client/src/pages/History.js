import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import axios from 'axios';
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
import HistoryIcon from '@mui/icons-material/History';
import { getToken } from '../utils/auth';

function History() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/game/history', {
          headers: { Authorization: getToken() },
        });
        setGames(res.data);
      } catch (error) {
        console.error('Failed to fetch game history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <HistoryIcon sx={{ fontSize: 36, color: 'primary.main', mr: 1 }} />
          <Typography variant="h4" align="center">
            Game History
          </Typography>
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : games.length === 0 ? (
          <Typography align="center" color="textSecondary" sx={{ mt: 2 }}>
            No game history found.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Player</strong></TableCell>
                <TableCell align="center"><strong>Computer</strong></TableCell>
                <TableCell align="center"><strong>Result</strong></TableCell>
                <TableCell align="center"><strong>Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((g, i) => (
                <TableRow key={i}>
                  <TableCell>{g.playerMove}</TableCell>
                  <TableCell align="center">{g.computerMove}</TableCell>
                  <TableCell align="center">
                    <Typography
                      color={
                        g.result === 'Win'
                          ? 'green'
                          : g.result === 'Lose'
                          ? 'red'
                          : 'orange'
                      }
                    >
                      {g.result}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {new Date(g.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}

export default History;
