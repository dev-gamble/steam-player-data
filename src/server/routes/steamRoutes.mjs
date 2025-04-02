import express from 'express';

const router = express.Router();
const key = process.env.STEAM_API_KEY;

router.get('/player-summary', async (req, res) => {
  const { steamid } = req.query;

  try {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}}&steamids=${steamid}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/game-achievements', async (req, res) => {
    const { appid, steamid } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${steamid}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/owned-games', async (req, res) => {
    const { steamid } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/recently-played-games', async (req, res) => {
    const { steamid } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamid}&format=json`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/game-stats', async (req, res) => {
    const { appid, steamid } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${key}&steamid=${steamid}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/friend-list', async (req, res) => {
    const { steamid } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${steamid}&relationship=friend`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/steamid', async (req, res) => {
    const { vanityurl } = req.query;
  
    try {
      const response = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${key}&vanityurl=${vanityurl}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  router.get('/game-details', async (req, res) => {
    const { appid } = req.query;
  
    try {
      const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  

export default router;