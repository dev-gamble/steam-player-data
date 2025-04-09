import { Request, Response, Router } from 'express';

import { 
  getFriends, 
  getGameAchievements, 
  getGameDetails, 
  getGameStats, 
  getOwnedGames, 
  getPlayerSummary, 
  getRecentlyPlayedGames, 
  getSteamId 
} from '../services/steam.service';

const router = Router();

router.get('/friends', async (req: Request, res: Response) => {
  const { steamid } = req.query;

  try {
    if (!steamid || typeof steamid !== 'string')
      throw new Error(`invalid steamid: ${steamid}`);

    const data = await getFriends(steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/game-achievements', async (req: Request, res: Response) => {
    const { appid, steamid } = req.query;
  
    try {
      if (isNaN(Number(appid)))
        throw new Error(`Invalid appid: ${appid}`);

      if (!steamid || typeof steamid !== 'string')
        throw new Error(`invalid steamid: ${steamid}`);

      const data = await getGameAchievements(Number(appid), steamid);
      res.json(data);
      } catch (error) {
        console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/game-details', async (req: Request, res: Response) => {
  const { appid } = req.query;

  try {
    if (isNaN(Number(appid)))
      throw new Error(`Invalid appid: ${appid}`);

    const data = await getGameDetails(Number(appid));
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: error });
  }
});

router.get('/game-stats', async (req: Request, res: Response) => {
  const { appid, steamid } = req.query;

  try {
    if (isNaN(Number(appid)))
      throw new Error(`invalid appid: ${appid}`);

    if (!steamid || typeof steamid !== 'string')
      throw new Error(`invalid steamid: ${steamid}`);
    
    const data = await getGameStats(Number(appid), steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/owned-games', async (req: Request, res: Response) => {
  const { steamid } = req.query;

  try {
    if (!steamid || typeof steamid !== 'string')
      throw new Error(`Steam ID '${steamid}' is invalid.`);

    const data = await getOwnedGames(steamid);
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: message });
  }
});

router.get('/player-summary', async (req: Request, res: Response) => {
  const { steamid } = req.query;

  try {
    if (!steamid || typeof steamid !== 'string')
      throw new Error(`Steam ID '${steamid}' is invalid.`);

    const data = await getPlayerSummary(steamid);
    res.json(data);
  } catch (error) {
    console.error('Steam API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recently-played-games', async (req: Request, res: Response) => {
    const { steamid } = req.query;
  
    try {
      if (!steamid || typeof steamid !== 'string')
        throw new Error(`Steam ID '${steamid}' is invalid.`);

      const data = await getRecentlyPlayedGames(steamid);
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/steamid', async (req: Request, res: Response) => {
    const { vanityurl } = req.query;
  
    try {
      if (!vanityurl || typeof vanityurl !== 'string')
        throw new Error(`Vanity URL '${vanityurl}' is invalid.`);

      const data = await getSteamId(vanityurl);
      res.json(data);
    } catch (error) {
      console.error('Steam API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;