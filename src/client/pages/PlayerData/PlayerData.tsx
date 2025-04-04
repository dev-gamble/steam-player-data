import { 
    Achievements, 
    FavoriteGames, 
    Friends, 
    Location, 
    Summary, 
    RecentGameplay, 
    RecommendedGames, 
    TopGenres 
} from '../../components';
import './PlayerData.css';

const PlayerData = () => {
    return (
        <div className="flex-col">
            {/* Row 1 */}
            <div className="flex-row justify-between">
                <Summary />
                <FavoriteGames />
                <Location />
            </div>

            {/* Row 2 */}
            <div className="flex-row flex-fill justify-between">
                <Achievements />
                <TopGenres />
                <RecentGameplay />
                <Friends />
            </div>

            {/* Row 3 */}
            <div className="flex-row flex-fill justify-center">
                <RecommendedGames />
            </div>
        </div>
    )
}

export default PlayerData;