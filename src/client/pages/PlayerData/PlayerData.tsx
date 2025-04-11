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
import '../../styles/Common.css';

const PlayerData = () => {
    return (
        <div className="flex-col vh-90 pad-50">
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