import '../styles/Summary.css';
import { useData } from '../context/DataContext';

const Summary = () => {
    const { state } = useData();

    return (
        <div>
            { state.player?.avatarfull && <img src={ state.player?.avatarfull } alt="Player avatar" /> }
            <p>{ state.player?.personaname ?? 'Unknown player' }</p>
            <p>Friends: { state.friends?.length ?? 0 }</p>
            <p>Games: { state.ownedGames?.game_count }</p>
            <p>Hours played: { state.ownedGames?.totalHoursPlayed ?? 0 }</p>
            <p>Library value: { state.ownedGames?.value }</p>
        </div>
    );
}

export default Summary;