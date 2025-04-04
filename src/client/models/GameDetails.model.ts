import { GamePriceOverview, Genre, Screenshot } from '../models';

export interface GameDetails {
    background: string;
    background_raw: string;
    genres: Genre[];
    name: string;
    price_overview: GamePriceOverview;
    screenshots: Screenshot[];
    short_description: string;
    total_achievements: number;
}