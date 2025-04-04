import express from 'express';
import { 
  getFriends, 
  getGameAchievements, 
  getGameDetails, 
  getGameStats, 
  getOwnedGames, 
  getPlayerSummary, 
  getRecentlyPlayedGames, 
  getSteamId 
} from '../services/steam.service.js';

const router = express.Router();

router.get('/friends', async (req, res) => {
  const { steamid } = req.query;

  try {
    const data = await getFriends(steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/game-achievements', async (req, res) => {
    const { appid, steamid } = req.query;
  
    try {
      const data = await getGameAchievements(appid, steamid);
      res.json(data);
      } catch (error) {
        console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/game-details', async (req, res) => {
  const { appid } = req.query;

  try {
    const data = await getGameDetails(appid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/game-stats', async (req, res) => {
  const { appid, steamid } = req.query;

  try {
    const data = await getGameStats(appid, steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/owned-games', async (req, res) => {
  const { steamid } = req.query;

  try {
    const data = await getOwnedGames(steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/player-summary', async (req, res) => {
  const { steamid } = req.query;

  try {
    const data = await getPlayerSummary(steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recently-played-games', async (req, res) => {
    const { steamid } = req.query;
  
    try {
      const data = await getRecentlyPlayedGames(steamid);
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/steamid', async (req, res) => {
    const { vanityurl } = req.query;
  
    try {
      const data = await getSteamId(vanityurl);
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;