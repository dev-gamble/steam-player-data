import { createContext, useContext, useEffect, useState } from 'react';
import { getFriends, getOwnedGames, getPlayerSummary, getRecentlyPlayedGames } from '../services/steam.api';
import { Friend, OwnedGames, PlayerSummary, RecentlyPlayedGames } from '../models';


interface DataProviderProps {
    steamid: string;
    children: React.ReactNode;
}

interface DataContextType {
    friends: Friend[] | null;
    loading: boolean;
    player: PlayerSummary | null;
    ownedGames: OwnedGames | null;
    recentlyPlayedGames: RecentlyPlayedGames | null;
}

const DataContext = createContext<DataContextType>({
    friends: null,
    loading: true,
    ownedGames: null,
    player: null,
    recentlyPlayedGames: null
});

export const DataProvider = ({ steamid, children }: DataProviderProps) => {
    const [friends, setFriends] = useState<Friend[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [ownedGames, setOwnedGames] = useState<OwnedGames | null>(null);
    const [player, setPlayer] = useState<PlayerSummary | null>(null);
    const [recentlyPlayedGames, setRecentlyPlayedGames] = useState<RecentlyPlayedGames | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const f = await getFriends(steamid);
            setFriends(f);

            const og = await getOwnedGames(steamid);
            setOwnedGames(og);

            const p = await getPlayerSummary(steamid);
            setPlayer(p);

            const rpg = await getRecentlyPlayedGames(steamid);
            setRecentlyPlayedGames(rpg);

        };
        fetchData();
        setLoading(false);
    }, [steamid]);

    return (
        <DataContext.Provider value={{ 
            friends,
            loading,
            ownedGames,
            player,
            recentlyPlayedGames
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);