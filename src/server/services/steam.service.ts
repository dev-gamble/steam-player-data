import { 
    Friend, 
    GameAchievement, 
    GameDetails, 
    OwnedGames, 
    PlayerSummary, 
    RecentlyPlayedGames, 
    StatsAchievement
} from '../../shared/models';

const key = process.env.STEAM_API_KEY;

// Friends
export const getFriends = async (steamid: string): Promise<Friend[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${steamid}&relationship=friend`);
    const data = await response.json();
    return data;
}

// Game Achievements
export const getGameAchievements = async (appid: number, steamid: string): Promise<GameAchievement[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${steamid}`);
    const data = await response.json();
    return data;
}

// Game Details
export const getGameDetails = async (appid: number): Promise<GameDetails> => {
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
    const data = await response.json();
    return data;
}

// Game Stats
export const getGameStats = async (appid: number, steamid: string): Promise<StatsAchievement[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${key}&steamid=${steamid}`);
    const data = await response.json();
    return data;
}

// Owned Games
export const getOwnedGames = async (steamid: string): Promise<OwnedGames> => {
    const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`);
    const data = await response.json();
    return data;
}

// Player Summary
export const getPlayerSummary = async (steamid: string): Promise<PlayerSummary> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`);
    return await response.json();
}

// Recently Played Games
export const getRecentlyPlayedGames = async (steamid: string): Promise<RecentlyPlayedGames> => {
    const response = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamid}&format=json`);
    const data = await response.json();
    return data;
}

// Steam ID
export const getSteamId = async (vanityurl: string): Promise<string> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${key}&vanityurl=${vanityurl}`);
    return await response.json();
}