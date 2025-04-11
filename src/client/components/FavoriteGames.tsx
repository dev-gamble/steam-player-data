import '../styles/FavoriteGames.css';
import '../styles/Common.css';
import { useData } from '../context/DataContext';
import gold from '../../assets/gold-medal.svg';
import silver from '../../assets/silver-medal.svg';
import bronze from '../../assets/bronze-medal.svg'

const FavoriteGames = () => {
    const { state } = useData();
    const [fav1, fav2, fav3] = state.ownedGames?.top3 ?? [];
    const totalHours = parseInt(state.ownedGames?.totalHoursPlayed?.replace(/[^\d]/g, ''), 10);
    
    const getPlaytime = (appid: number | undefined): number => {
        return state.ownedGames?.games?.find(g => g.appid === appid)?.playtime_forever ?? 0;
    };

    const fav1hrs = Math.ceil(getPlaytime(fav1?.steam_appid) / 60);
    const fav2hrs = Math.ceil(getPlaytime(fav2?.steam_appid) / 60);
    const fav3hrs = Math.ceil(getPlaytime(fav3?.steam_appid) / 60);

    return (
        <div className='flex-col pad-left'>
            <strong>Most played</strong>
            <div className='flex-row justify-evenly'>
                
                <div className='game-box'>
                    <p><i>{ fav2?.name }</i></p>
                    <div className='wrapper'>
                        <img src={ fav2?.header_image } className='game-img-2' />
                        <img src={ silver } alt="silver" className='medal-icon width-50' />
                        <span className='hours'>{ fav2hrs?.toLocaleString() } h</span>
                    </div>
                    <strong>2nd</strong>
                    <span className='pct'>Plays <i>{((fav2hrs / totalHours) * 100).toFixed(1).replace(/\.0$/, '')}</i>% of the time.</span>
                </div>

                <div className='game-box'>
                    <p><i>{ fav1?.name }</i></p>
                    <div className='wrapper'>
                        <img src={ fav1?.header_image } className='game-img-1' />
                        <img src={ gold } alt="gold" className='medal-icon width-60' />
                        <span className='hours'>{ fav1hrs?.toLocaleString() } h</span>
                    </div>
                    <strong>1st</strong>
                    <span className='pct'>Plays <i>{((fav1hrs / totalHours) * 100).toFixed(1).replace(/\.0$/, '')}</i>% of the time.</span>
                </div>

                <div className='game-box'>
                    <p><i>{ fav3?.name }</i></p>
                    <div className='wrapper'>
                        <img src={ fav3?.header_image } className='game-img-3' />
                        <img src={ bronze } alt="bronze" className='medal-icon width-40' />
                        <span className='hours'>{ fav3hrs?.toLocaleString() } h</span>
                    </div>
                    <strong>3rd</strong>
                    <span className='pct'>Plays <i>{((fav3hrs / totalHours) * 100).toFixed(1).replace(/\.0$/, '')}</i>% of the time.</span>
                </div>

            </div>
        </div>
    )
}

export default FavoriteGames;