import app from '..';
import { 
    Friend,
    GameAchievement, 
    GameDetails, 
    OwnedGames, 
    PlayerSummary, 
    RecentlyPlayedGames, 
    StatsAchievement
} from '../../shared/models';
import pLimit from 'p-limit';

const key = process.env.STEAM_API_KEY;
const limit = pLimit(1); // Max concurrent requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // To prevent Steam API throttling


// Friends
export const getFriends = async (steamid: string): Promise<Friend[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${steamid}&relationship=friend`);
    const data = await response.json();
    return data.friendslist?.friends;
}

// Game Achievements
export const getGameAchievements = async (appid: number, steamid: string): Promise<GameAchievement[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${steamid}`);
    const data = await response.json();
    return data;
}

// Game Details
export const getGameDetails = async (appid: number): Promise<GameDetails | null> => {
    try {
        const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);

        const contentType = res.headers.get('content-type');
        
        // Log specific status codes
        if (res.status === 429) {
            console.warn(`Rate limited for appid ${appid} (HTTP 429)`);
            // Optionally: implement retry with backoff here
            return null;
        }

        if (res.status === 403) {
            console.warn(`Access forbidden for appid ${appid} (HTTP 403)`);
            return null;
        }

        if (!res.ok) {
            console.warn(`HTTP error ${res.status} for appid ${appid}`);
            return null;
        }

        if (!contentType?.includes('application/json')) {
            console.warn(`Non-JSON response for appid ${appid}: ${contentType}`);
            return null;
        }

        const data = await res.json();
        const appData = data[appid];

        if (!appData?.success) {
            console.warn(`Steam API returned unsuccessful for appid ${appid}`);
            return null;
        }

        return appData.data;
    } catch (err) {
        console.error(`Failed to fetch appid ${appid}:`, err);
        return null;
    }
};
  

// Game Stats
export const getGameStats = async (appid: number, steamid: string): Promise<StatsAchievement[]> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${key}&steamid=${steamid}`);
    const data = await response.json();
    return data;
}

// Owned Games
export const getOwnedGames = async (steamid: string): Promise<OwnedGames> => {
    const res = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`);
    const { response } = await res.json();

    if (!response || Object.keys(response).length === 0)
        throw new Error('This account has restrictions.');

    const ownedGames = response as OwnedGames;
    ownedGames.allGameDetails = await getAllGameDetails(ownedGames);
    ownedGames.top3 = getTop3Games(ownedGames);
    ownedGames.totalHoursPlayed = getTotalHoursPlayed(ownedGames);
    ownedGames.value = getLibraryValue(ownedGames);
    return ownedGames;
}

const getAllGameDetails = async (ownedGames: OwnedGames): Promise<(GameDetails | null)[]> => {
    const allDetails = await Promise.all(
        ownedGames?.games?.map(g => {
            return limit(async () => { 
                await delay(100);
                return await getGameDetails(g.appid);
            });
        })
    );

    return allDetails;
}

const getLibraryValue = (ownedGames: OwnedGames): string => {
    //const exchangeRates = app.locals.cache.get('exchangeRates');
    return ownedGames?.games?.map(g=> {
        const details = ownedGames.allGameDetails.find(d => d?.steam_appid === g.appid);
        const priceData = details?.price_overview;
        if (!priceData) return 0;

        const currency = priceData.currency;
        const finalPrice = priceData.final;
        //const rate = exchangeRates[currency] ?? 1; // Use USD if unknown
        const rate = 1; // temporary as to not use the Exchange API for now

        const usdPrice = currency === 'USD' ? finalPrice / 100 : (finalPrice / rate) / 100;
        return usdPrice;
    })
    .reduce((sum, price) => sum + price, 0)
    .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

const getTop3Games = (ownedGames: OwnedGames): (GameDetails | null | undefined)[] => {
    const top3 = ownedGames.games
        .sort((a, b) => b.playtime_forever - a.playtime_forever)
        .slice(0, 3);

    return top3.map(g => ownedGames.allGameDetails.find(d => d?.steam_appid === g.appid));
}

const getTotalHoursPlayed = (ownedGames: OwnedGames): string => {
    let minutes = 0;
    ownedGames?.games?.forEach(g => {
        minutes += g.playtime_forever;
    }); 
    return Math.ceil(minutes / 60).toLocaleString();
}

// Player Summary
export const getPlayerSummary = async (steamid: string): Promise<PlayerSummary> => {
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`);
    const data = await response.json();
    return data.response?.players[0];
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