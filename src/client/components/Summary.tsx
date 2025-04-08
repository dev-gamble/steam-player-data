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
        let value = 0;
        state.ownedGames?.games
    }, [state.ownedGames])
    
    return (
        <div style={{ background: "#ccc", padding: "8px" }}>
            {state.player?.avatarfull && <img src={state.player?.avatarfull} alt="Player Avatar" />}
            <p>{state.player?.personaname ?? 'Unknown player'}</p>
            <p>Friends: {state.friends?.length ?? 0}</p>
            <p>Total Hours Played: {totalHoursPlayed ?? 0}</p>
            <p>Library Value: {}</p>
        </div>
    )
}

export default Summary;