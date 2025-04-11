import { GamePriceOverview, Genre, Screenshot } from '../models';

export interface GameDetails {
    background: string;
    background_raw: string;
    genres: Genre[];
    header_image: string;
    name: string;
    price_overview: GamePriceOverview;
    screenshots: Screenshot[];
    short_description: string;
    steam_appid: number;
    total_achievements: number;
}