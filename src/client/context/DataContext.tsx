import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getFriends, getOwnedGames, getPlayerSummary, getRecentlyPlayedGames } from '../services/steam.api';
import { Friend, OwnedGames, PlayerSummary, RecentlyPlayedGames } from '../../shared/models';

interface AppState {
    friends: Friend[],
    loading: boolean,
    ownedGames: OwnedGames,
    player: PlayerSummary,
    recentlyPlayedGames: RecentlyPlayedGames
}

interface Context {
    state: AppState;
    dispatch: any;
}

interface DataProviderProps {
    steamid: string;
    children: React.ReactNode;
}

const DataContext = createContext<Context>({
    state: {} as AppState,
    dispatch: null
});

const initialState: AppState = { 
    friends: [] as Friend[], 
    loading: true,
    ownedGames: {} as OwnedGames,
    player: {} as PlayerSummary, 
    recentlyPlayedGames: {} as RecentlyPlayedGames
};

const reducer = (state: AppState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case 'SET_FRIENDS':
            return { ...state, friends: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_OWNED_GAMES':
            return { ...state, ownedGames: action.payload };
        case 'SET_PLAYER':
            return { ...state, player: action.payload };
        case 'SET_RECENTLY_PLAYED_GAMES':
            return { ...state, recentlyPlayedGames: action.payload };
      default:
        return state;
    }
}

export const DataProvider = ({ steamid, children }: DataProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchData();
    }, [steamid]);

    const fetchData = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const [friends, ownedGames, player, recentGames] = await Promise.all([
              getFriends(steamid),
              getOwnedGames(steamid),
              getPlayerSummary(steamid),
              getRecentlyPlayedGames(steamid),
            ]);
      
            dispatch({ type: 'SET_FRIENDS', payload: friends });
            dispatch({ type: 'SET_OWNED_GAMES', payload: ownedGames });
            dispatch({ type: 'SET_PLAYER', payload: player });
            dispatch({ type: 'SET_RECENTLY_PLAYED_GAMES', payload: recentGames });

          } catch (err) {
            console.error('Error fetching data:', err);

          } finally {
            dispatch({ type: 'SET_LOADING', payload: false });

          }
    };

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);