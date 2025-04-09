import '../styles/Summary.css';
import { useData } from '../context/DataContext';
import { useMemo } from 'react';

const Summary = () => {
    const { state } = useData();

    const totalHoursPlayed = useMemo(() => {
        let minutes = 0;
        state.ownedGames?.games?.forEach(g => {
            minutes += g.playtime_forever;
        });
        return Math.ceil(minutes / 60).toLocaleString();
    }, [state.ownedGames]);

    const libraryValue = useMemo(() => {
        const value = state.ownedGames?.libraryValue ?? 0;
        return '$' + (value / 100).toFixed(2);
    }, [state.ownedGames]);

    return (
        <div>
            {state.player?.avatarfull && <img src={state.player?.avatarfull} alt="Player Avatar" />}
            <p>{state.player?.personaname ?? 'Unknown player'}</p>
            <p>Friends: {state.friends?.length ?? 0}</p>
            <p>Games: {state.ownedGames?.game_count}</p>
            <p>Hours played: {totalHoursPlayed ?? 0}</p>
            <p>Library value: {libraryValue}</p>
        </div>
    )
}

export default Summary;