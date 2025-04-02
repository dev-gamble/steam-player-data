import { 
    Achievements, 
    FavoriteGames, 
    Friends, 
    PlayerLocation, 
    ProfileSummary, 
    RecentGameplay, 
    RecommendedGames, 
    TopGenres 
} from "../components"

const PlayerData = () => {
    return (
        <div className="flex-col">
            {/* Row 1 */}
            <div className="flex justify-between gap-4">
                <ProfileSummary />
                <FavoriteGames />
                <PlayerLocation />
            </div>

            {/* Row 2 */}
            <div className="flex justify-between gap-4">
                <Achievements />
                <TopGenres />
                <RecentGameplay />
                <Friends />
            </div>

            {/* Row 3 */}
            <div className="flex justify-center gap-4">
                <RecommendedGames />
            </div>
        </div>
    )
}

export default PlayerData;