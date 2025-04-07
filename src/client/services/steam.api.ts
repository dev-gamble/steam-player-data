import axios from 'axios';
import { GameAchievement, Friend, PlayerSummary } from '../../shared/models';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/steam',
});

// Friends
export const getFriends = async (steamid: string): Promise<Friend[]> => {
    const res = await api.get('/friends', { params: { steamid } });
    return res.data;
}

// Game Achievements
export const getGameAchievements = async (appid: number, steamid: string): Promise<GameAchievement[]> => {
    const res = await api.get('/game-achievements', { params: { appid, steamid } });
    return res.data;
}

// Game Details
export const getGameDetails = async (appid: number) => {
    const res = await api.get('/game-details', { params: { appid } });
    return res.data;
}

// Game Stats
export const getGameStats = async (appid: number, steamid: string) => {
    const res = await api.get('/game-stats', { params: { appid, steamid } });
    return res.data;
}

// Owned Games
export const getOwnedGames = async (steamid: string) => {
    const res = await api.get('/owned-games', { params: { steamid } });
    return res.data;
}

// Player Summary
export const getPlayerSummary = async (steamid: string): Promise<PlayerSummary> => {
    const res = await api.get('/player-summary', { params: { steamid } });
    return res.data;
}

// Recently Played Games
export const getRecentlyPlayedGames = async (steamid: string) => {
    const res = await api.get('/recently-played-games', { params: { steamid } });
    return res.data;
}

// Steam ID
export const getSteamId = async (vanityurl: string) => {
    const res = await api.get('/steamid', { params: { vanityurl } });
    return res.data;
}