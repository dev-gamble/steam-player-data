import axios from 'axios';
import { Achievement, Friend, PlayerSummary } from '../models';

const api = "http://localhost:3001/api/steam";

// Friends
export const getFriends = async (steamid: string): Promise<Friend[]> => {
    const res = await axios.get(`${api}/friends`, { params: steamid });
    return res.data;
}

// Game Achievements
export const getGameAchievements = async (appid: number, steamid: string): Promise<Achievement[]> => {
    const res = await axios.get(`${api}/game-achievements`, { params: { appid, steamid } });
    return res.data;
}

// Game Details
export const getGameDetails = async (appid: number) => {
    const res = await axios.get(`${api}/game-details`, { params: appid });
    return res.data;
}

// Game Stats
export const getGameStats = async (appid: number, steamid: string) => {
    const res = await axios.get(`${api}/game-stats`, { params: { appid, steamid } });
    return res.data;
}

// Owned Games
export const getOwnedGames = async (steamid: string) => {
    const res = await axios.get(`${api}/owned-games`, { params: { steamid } });
    return res.data;
}

// Player Summary
export const getPlayerSummary = async (steamid: string): Promise<PlayerSummary> => {
    const res = await axios.get(`${api}/player-summary`, { params: steamid });
    return res.data.players[0];
}

// Recently Played Games
export const getRecentlyPlayedGames = async (steamid: string) => {
    const res = await axios.get(`${api}/recently-played-games`, { params: steamid });
    return res.data;
}

// Steam ID
export const getSteamId = async (vanityurl: string) => {
    const res = await axios.get(`${api}/steamid`, { params: { vanityurl } });
    return res.data;
}