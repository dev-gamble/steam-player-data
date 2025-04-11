import { Game } from './Game.model';
import { GameDetails } from './GameDetails.model';

export interface OwnedGames {
    allGameDetails: (GameDetails | null)[];
    game_count: number;
    games: Game[];
    top3: (GameDetails | null | undefined)[];
    totalHoursPlayed: string;
    value: string;
}